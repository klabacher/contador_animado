import { createClient } from '@supabase/supabase-js'
import { Database } from 'types/SupabaseTypes'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or Key is not defined in .env.local')
}

// Criamos o cliente Tipado! Isso é o teu ORM.
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export default supabase
export const supabaseAuth = supabase.auth
