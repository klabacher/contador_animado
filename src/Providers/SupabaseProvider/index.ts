import { createClient } from '@supabase/supabase-js'

const supabaseUrl: string | undefined = process.env.REACT_APP_SUPABASE_URL
const supabaseKey: string | undefined = process.env.REACT_APP_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or Key is not defined in environment variables')
}

// Authentication
function supabaseAuth() {
  return supabase.auth
}
//Database
//Storage

const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase
export { supabase, supabaseAuth }
