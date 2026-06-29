const supabase = require('../config/db')

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' })
  }

  try {
    const { data, error } = await supabase.auth.getUser(token)
    if (error) throw error

    // Get user role from users table
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', data.user.id)
      .single()

    req.user = {
      userId: data.user.id,
      email: data.user.email,
      role: userData?.role || 'EMPLOYEE'
    }

    next()
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid or expired token' })
  }
}

module.exports = { authenticate }