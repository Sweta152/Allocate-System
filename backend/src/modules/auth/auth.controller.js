const { login, registerEmployee } = require("./auth.service");

//
// 🟢 LOGIN HANDLER
//
const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    // service call
    const data = await login(email, password);

    return res.json({
      success: true,
      message: "Login successful",
      data,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
};

//
// 🟢 REGISTER HANDLER
//
const registerHandler = async (req, res) => {
  try {
    // safety check (VERY IMPORTANT)
    if (!req.user?.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const data = await registerEmployee({
      ...req.body,
      managerId: req.user.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Employee registered successfully",
      data,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  loginHandler,
  registerHandler,
};