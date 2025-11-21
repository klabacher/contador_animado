import { RootState } from 'Providers/Redux/Store'
import LoginPage from './Auth/Login'
import RegisterPage from './Auth/Register'
import ForgotPassword from './Auth/ForgotPassword'
import HeaderMenu from './Auth/Header'
import { useSelector } from 'react-redux'

// Todo: add animation when switching between login and register
// Todo: add form validation
//Todo: connect buttons to backend auth logic
//Todo: add "forgot password" link HALF
//Todo: add "show password" toggle MADE
//Todo: add social login https://supabase.com/docs/guides/auth/social-login/auth-github
//Todo: add social https://supabase.com/docs/guides/auth/social-login/auth-google

export default function Auth() {
  const FrontPageState = useSelector(
    (state: RootState) => state.dom.PageInfo.FrontPage.state
  )
  return (
    <div className="flex w-11/12 flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <HeaderMenu />
      <div className="flex flex-1 flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md transition-all duration-500">
          {FrontPageState === 'auth:login' ? (
            <LoginPage />
          ) : FrontPageState === 'auth:register' ? (
            <RegisterPage />
          ) : FrontPageState === 'auth:forgot-password' ? (
            <ForgotPassword />
          ) : null}
        </div>
      </div>
    </div>
  )
}
