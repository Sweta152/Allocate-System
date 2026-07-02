const jwt = require("jsonwebtoken");
const getSupabaseClient = require("../../config/db");

const login = async (email, password) => {
  const supabase = getSupabaseClient();

  console.log("Login attempt:", email);

  console.log("===== ADMIN LOGIN =====");
console.log("Email:", email);

  // Find admin by email
  const { data: admin, error } = await supabase
    .from("admin_login")
    .select("*")
    .eq("Admin Email", email)
    .single();

  if (error || !admin) {
    throw new Error("Invalid email or password");
  }

  // Check password


  const bcrypt = require("bcryptjs");

const isMatch = await bcrypt.compare(
  password,
  admin["Admin Password"]
);

if (!isMatch) {
  throw new Error("Invalid email or password");
} {


    throw new Error("Invalid email or password");
  }

  // Generate JWT
  const accessToken = jwt.sign(
    {
      email: admin["Admin Email"],
      role: admin["Admin Role"],
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "8h",
    }
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

// Keep your existing function if needed
const registerEmployee = async () => {
  throw new Error("Employee registration is disabled.");
};

module.exports = {
  login,
  registerEmployee,
};