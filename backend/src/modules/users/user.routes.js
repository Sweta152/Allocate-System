const express = require("express");
const router = express.Router();
const supabase = require("../../config/supabaseClient");


router.post("/add-user", async (req, res) => {
  try {

    const {
      firstName,
      lastName,
      email,
      employeeId,
      designation,
      department,
      dob,
      doj,
      reportingManager,
      password,
      workedInTeams,
      role,   // NEW
    } = req.body;


    // Required validation
    if (!firstName || !lastName || !email || !role) {
      return res.status(400).json({
        success: false,
        message:
          "First name, last name, email and role are required.",
      });
    }



    // Check duplicate email + role
    const { data: existingUser, error: checkError } = await supabase
      .from("user_master")
      .select("*")
      .eq("Email", email)
      .eq("Role", role)
      .maybeSingle();



    if (checkError) {
      throw checkError;
    }



    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User already registered with this email and role.",
      });
    }



    // Insert user
    const { data, error } = await supabase
      .from("user_master")
      .insert([
        {
          "First Name": firstName,
          "Last Name": lastName,
          "Email": email,
          "Employee ID": employeeId || null,
          "Designation": designation || null,
          "Department": department || null,
          "Date of Birth": dob || null,
          "Date of Joining": doj || null,
          "Reporting Manager": reportingManager || null,
          "Password": password || null,
          "Worked In Teams": workedInTeams || null,

          // NEW
          "Role": role,
        },
      ])
      .select();



    if (error) {
      throw error;
    }



    res.status(201).json({
      success: true,
      message: "User Added Successfully",
      user: data?.[0],
    });


  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message || "Failed to add user",
    });

  }
});


module.exports = router;