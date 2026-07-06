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
    } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        success: false,
        message: "First name, last name and email are required.",
      });
    }

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
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    res.json({
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