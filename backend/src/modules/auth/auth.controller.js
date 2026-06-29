const { login, registerEmployee } = require('./auth.service')

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' })
    }
    const data = await login(email, password)
    res.json({ success: true, message: 'Login successful', data })
  } catch (err) {
    res.status(401).json({ success: false, message: err.message })
  }
}

const registerHandler = async (req, res) => {
  try {
    const data = await registerEmployee({
      ...req.body,
      managerId: req.user.userId
    })
    res.status(201).json({ success: true, message: 'Employee registered', data })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

module.exports = { loginHandler, registerHandler }