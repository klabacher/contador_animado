/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: Fix any types
import supabase from 'Providers/SupabaseProvider'
import Store from 'Providers/Redux/Store' // Importamos a Store direta
import {
  authStart,
  authSuccess,
  authFail,
  logout as logoutAction
} from 'Providers/Redux/Slice'
import { UserProfile } from 'types/reduxStore'

// Tipo para os argumentos de Login
type LoginArgs = {
  email: string
  password: string
}

// Tipo para os argumentos de Registro
type RegisterArgs = {
  name: string
  email: string
  password: string
}

const AuthProvider = {
  async LoginLogic({ email, password }: LoginArgs) {
    const dispatch = Store.dispatch
    dispatch(authStart())

    try {
      // 1. Autenticar no Supabase Auth
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password
        })

      if (authError) throw authError
      if (!authData.user) throw new Error('Usuário não encontrado')

      // 2. Buscar dados extras na tabela 'profiles' (nome, role)
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single()

      if (profileError) throw profileError

      // 3. Montar o objeto do usuário robusto
      const userProfile: UserProfile = {
        id: authData.user.id,
        email: authData.user.email,
        name: profileData.name, // Vem da tabela profiles
        role: profileData.role || 'user' // Vem da tabela profiles
      }

      // 4. Salvar no Redux
      dispatch(
        authSuccess({
          user: userProfile,
          token: authData.session?.access_token || ''
        })
      )
    } catch (error: any) {
      console.error('Login error:', error)
      dispatch(authFail(error.message || 'Falha ao fazer login'))
    }
  },

  async RegisterLogic({ name, email, password }: RegisterArgs) {
    const dispatch = Store.dispatch
    dispatch(authStart())

    try {
      // 1. Criar conta no Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password
      })

      if (authError) throw authError
      if (!authData.user) throw new Error('Erro ao criar usuário')

      // 2. Criar entrada na tabela 'profiles' com o ID retornado
      const { error: profileError } = await supabase.from('profiles').insert([
        {
          id: authData.user.id, // Vínculo crucial!
          name: name,
          role: 'user' // Default role
        }
      ])

      if (profileError) {
        // Se falhar ao criar perfil, idealmente deveríamos desfazer o auth,
        // mas por agora vamos apenas lançar erro.
        throw new Error(
          'Conta criada, mas falha ao salvar perfil: ' + profileError.message
        )
      }

      // 3. Auto-login após registro (opcional, mas prático)
      // Recriamos o perfil para o Redux
      const userProfile: UserProfile = {
        id: authData.user.id,
        email: authData.user.email,
        name: name,
        role: 'user'
      }

      dispatch(
        authSuccess({
          user: userProfile,
          token: authData.session?.access_token || ''
        })
      )
    } catch (error: any) {
      console.error('Register error:', error)
      dispatch(authFail(error.message || 'Falha ao registrar'))
    }
  },

  async LogoutLogic() {
    const dispatch = Store.dispatch
    await supabase.auth.signOut()
    dispatch(logoutAction())
  }
}

export default AuthProvider
