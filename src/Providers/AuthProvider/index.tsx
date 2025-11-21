/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from 'Providers/SupabaseProvider'
import Store from 'Providers/Redux/Store'
import {
  authStart,
  authSuccess,
  authFail,
  logout as logoutAction
} from 'Providers/Redux/Slice'
import { UserProfile } from 'types/reduxStore'
import { toast } from 'react-toastify'
import {
  isValidEmail,
  isValidName,
  isValidPassword,
  sanitizeInput
} from 'utils/validation'
import i18n from 'Providers/InternationalizationProvider'

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
  async LoginLogic({ email, password }: LoginArgs): Promise<string | null> {
    const dispatch = Store.dispatch

    // 1. Validação
    const cleanEmail = sanitizeInput(email)
    if (!isValidEmail(cleanEmail)) {
      const msg = i18n.t('hud.AuthPage.Errors.emailInvalid')
      toast.error(msg)
      return msg
    }
    if (!password) {
      const msg = i18n.t('hud.AuthPage.Errors.passwordRequired')
      toast.error(msg)
      return msg
    }

    dispatch(authStart())

    try {
      // 2. Autenticar no Supabase Auth
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password
        })

      if (authError) throw authError
      if (!authData.user) throw new Error('Usuário não encontrado')

      // 3. Buscar dados extras na tabela 'profiles' (nome, role)
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single()

      if (profileError) throw profileError

      // 4. Montar o objeto do usuário robusto
      const userProfile: UserProfile = {
        id: authData.user.id,
        email: authData.user.email || '',
        name: profileData.name || '', // Vem da tabela profiles
        role: (profileData.role as 'user' | 'admin' | 'guest') || 'user' // Vem da tabela profiles
      }

      // 5. Salvar no Redux
      dispatch(
        authSuccess({
          user: userProfile,
          token: authData.session?.access_token || ''
        })
      )
      toast.success(i18n.t('hud.HomePage.welcomeBack'))
      // O redirecionamento será tratado pelo componente ou hook que observa o estado
      window.location.href = '/countspark/dashboard'
      return null
    } catch (error: any) {
      console.error('Login error:', error)

      let msg = i18n.t('hud.AuthPage.Errors.genericError')
      let isServerError = false

      // Tratamento de erros específicos
      if (error.message === 'Invalid login credentials') {
        msg = i18n.t('hud.AuthPage.Errors.invalidCredentials')
      } else if (
        error.status === 500 ||
        (error.message && error.message.toLowerCase().includes('network')) ||
        error.code === '500' ||
        error.name === 'AuthRetryableFetchError' ||
        (error.message && error.message.includes('AuthRetryableFetchError'))
      ) {
        msg = i18n.t('hud.AuthPage.Errors.systemError')
        isServerError = true
      }

      dispatch(authFail(msg))
      toast.error(msg)

      if (isServerError) {
        // Logout forçado para limpar estado inconsistente
        dispatch(logoutAction())
        await supabase.auth.signOut()
      }

      return msg
    }
  },

  async RegisterLogic({ name, email, password }: RegisterArgs) {
    const dispatch = Store.dispatch

    // 1. Validação Rigorosa
    const cleanName = sanitizeInput(name)
    const cleanEmail = sanitizeInput(email)

    if (!isValidName(cleanName)) {
      toast.error('Nome contém caracteres inválidos')
      return
    }
    if (!isValidEmail(cleanEmail)) {
      toast.error('Email inválido')
      return
    }
    if (!isValidPassword(password)) {
      toast.error(
        'Senha deve ter no mínimo 8 caracteres, uma letra e um número'
      )
      return
    }

    dispatch(authStart())

    try {
      // 2. Criar conta no Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: cleanEmail,
        password
      })

      if (authError) throw authError
      if (!authData.user) throw new Error('Erro ao criar usuário')

      // 3. Criar entrada na tabela 'profiles' com o ID retornado
      const { error: profileError } = await supabase.from('profiles').insert([
        {
          id: authData.user.id, // Vínculo crucial!
          name: cleanName,
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

      // 4. Auto-login após registro (opcional, mas prático)
      // Recriamos o perfil para o Redux
      const userProfile: UserProfile = {
        id: authData.user.id,
        email: authData.user.email,
        name: cleanName,
        role: 'user'
      }

      dispatch(
        authSuccess({
          user: userProfile,
          token: authData.session?.access_token || ''
        })
      )
      toast.success('Conta criada com sucesso!')
      window.location.href = '/countspark/dashboard'
    } catch (error: any) {
      console.error('Register error:', error)
      const msg = error.message || 'Falha ao registrar'
      dispatch(authFail(msg))
      toast.error(msg)
    }
  },

  async LogoutLogic() {
    const dispatch = Store.dispatch
    try {
      await supabase.auth.signOut()
      dispatch(logoutAction())
      localStorage.clear() // Limpa dados sensíveis se houver
      window.location.href = '/countspark/'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }
}

export default AuthProvider
