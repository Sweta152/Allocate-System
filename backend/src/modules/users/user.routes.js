const express = require("express");
const router = express.Router();
const sql = require("mssql");

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

    const pool = global.pool;

    await pool.request()
      .input("FirstName", sql.VarChar, firstName)
      .input("LastName", sql.VarChar, lastName)
      .input("Email", sql.VarChar, email)
      .input("EmployeeID", sql.VarChar, employeeId)
      .input("Designation", sql.VarChar, designation)
      .input("Department", sql.VarChar, department)
      .input("DOB", sql.Date, dob)
      .input("DOJ", sql.Date, doj)
      .input("ReportingManager", sql.VarChar, reportingManager)
      .input("Password", sql.VarChar, password)
      .input("WorkedInTeams", sql.VarChar, workedInTeams)

      .query(`
        INSERT INTO user_master
        (
            FirstName,
            LastName,
            Email,
            EmployeeID,
            Designation,
            Department,
            DOB,
            DOJ,
            ReportingManager,
            Password,
            WorkedInTeams
        )
        VALUES
        (
            @FirstName,
            @LastName,
            @Email,
            @EmployeeID,
            @Designation,
            @Department,
            @DOB,
            @DOJ,
            @ReportingManager,
            @Password,
            @WorkedInTeams
        )
      `);

    res.json({
      success: true,
      message: "User Added Successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;