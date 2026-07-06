const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const getSupabaseClient = require("../../config/db");

const login = async (email, password) => {
  const supabase = getSupabaseClient();
  console.log("=== LOGIN ATTEMPT ===");
  console.log("Email received:", JSON.stringify(email));

  // Find admin by email in admin_login table
  const { data: admin, error } = await supabase
    .from("admin_login")
    .select("*")
    .eq("Admin Email", email)
    .single();

  console.log("Supabase error:", error);
  console.log("Admin row found:", admin);

  if (error || !admin) {
    console.log("FAILED: no matching admin row for this email");
    throw new Error("Invalid email or password");
  }

  console.log("Stored password value:", JSON.stringify(admin["Admin Password"]));
  console.log("Password received:", JSON.stringify(password));

  // Check password
  const isMatch = await bcrypt.compare(password, admin["Admin Password"]);
  console.log("bcrypt.compare result:", isMatch);

  if (!isMatch) {
    console.log("FAILED: password did not match hash");
    throw new Error("Invalid email or password");
  }

  console.log("SUCCESS: login matched");

  // Generate JWT
  const accessToken = jwt.sign(
    {
      email: admin["Admin Email"],
      role: admin["Admin Role"],
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  return {
    accessToken,
    user: {
      email: admin["Admin Email"],
      role: admin["Admin Role"],
      name: admin["Admin Name"],
      team: admin["Team Name"],
    },
  };
};

const registerEmployee = async () => {
  throw new Error("Employee registration is disabled.");
};

module.exports = { login, registerEmployee };