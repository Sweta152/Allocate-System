
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const getSupabaseClient = require("../../config/db");
 
const login = async (email, password) => {
  const supabase = getSupabaseClient();
  console.log("Login attempt:", email);
 
  // Find admin by email in admin_login table
  const { data: admin, error } = await supabase
    .from("admin_login")
    .select("*")
    .eq("Admin Email", email)
    .single();
 
  if (error || !admin) {
    throw new Error("Invalid email or password");
  }
 
  // Check password
  const isMatch = await bcrypt.compare(password, admin["Admin Password"]);
 
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
 
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