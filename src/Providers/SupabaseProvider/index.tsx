// import { createClient } from '@supabase/supabase-js'
// import type { SupabaseClient } from '@supabase/supabase-js'
// import type initialStateType from 'Providers/Redux/Slice'

// // type Supabase = SupabaseClient<'any, 'public', any>
// type configParameters = typeof initialStateType
// const supabaseUrl: string | undefined = process.env.REACT_APP_SUPABASE_URL
// const supabaseKey: string | undefined = process.env.REACT_APP_SUPABASE_ANON_KEY

// if (!supabaseUrl || !supabaseKey) {
//   throw new Error('Supabase URL or Key is not defined in environment variables')
// }

// // Functions for client to interact with Supabase

// //Authentication
// // function supabaseAuth() {
// //   return supabase.auth
// // }
// //Database
// //Storage
// getCounterConfiguration(id: string) {
//   return supabase.from('configurations').select('*')
// }

// setCounterConfiguration(id: string, config: initialStateType ) {
//     return supabase.from('configurations').insert([config])
//     }

// const supabase = createClient(supabaseUrl, supabaseKey)
// export default supabase
// export { supabase, supabaseAuth }
