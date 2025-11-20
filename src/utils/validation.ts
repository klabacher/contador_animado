export const sanitizeInput = (input: string): string => {
  if (!input) return ''
  return input.trim().replace(/<[^>]*>?/gm, '')
}

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidPassword = (password: string): boolean => {
  // Minimum 8 characters, at least one letter and one number
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  return passwordRegex.test(password)
}

export const isValidName = (name: string): boolean => {
  // Allow letters, spaces, accents. Disallow special chars that might be used for injection
  // This is a basic check, Supabase handles SQL injection, but we want to avoid weird characters in names
  const nameRegex = /^[a-zA-Z\u00C0-\u00FF\s]+$/
  return nameRegex.test(name)
}
