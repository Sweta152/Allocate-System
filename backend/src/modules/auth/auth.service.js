const supabase = require('../../config/db')

const login = async (email, password) => {

     console.log('Login attempt:', email, password) // ← ye add karo
  // Supabase handles authentication
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw new Error('Invalid email or password')

  // Get user details from our users table
  const { data: userData } = await supabase
    .from('users')
    .select('*, profiles(*)')
    .eq('id', data.user.id)
    .single()

  return {
    accessToken: data.session.access_token,
    refreshToken: data.session.refresh_token,
    user: {
      id: data.user.id,
      email: data.user.email,
      role: userData?.role || 'EMPLOYEE',
      firstName: userData?.profiles?.first_name || '',
      lastName: userData?.profiles?.last_name || '',
      department: userData?.profiles?.department || '',
      position: userData?.profiles?.position || '',
    }
  }
}

const registerEmployee = async ({ email, password, firstName, lastName, department, position, managerId }) => {
  // Create auth user in Supabase
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  })

  if (error) throw new Error(error.message)

  const userId = data.user.id

  // Add to our users table
  await supabase.from('users').insert({
    id: userId,
    email,
    role: 'EMPLOYEE',
    manager_id: managerId,
    is_active: true
  })

  // Add profile
  await supabase.from('profiles').insert({
    user_id: userId,
    first_name: firstName,
    last_name: lastName,
    department,
    position
  })

  return { userId, email }
}

module.exports = { login, registerEmployee }