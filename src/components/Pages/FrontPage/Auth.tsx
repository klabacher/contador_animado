import { updateFrontPageState } from 'Providers/Redux/Slice'
import { RootState } from 'Providers/Redux/Store'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import Logo from './Logo'
import LoginPage from './Auth/Login'
import RegisterPage from './Auth/Register'
import ForgotPassword from './Auth/ForgotPassword'

// Todo: add animation when switching between login and register
// Todo: add form validation
//Todo: connect buttons to backend auth logic
//Todo: add "forgot password" link HALF
//Todo: add "show password" toggle MADE
//Todo: add social login https://supabase.com/docs/guides/auth/social-login/auth-github
//Todo: add social https://supabase.com/docs/guides/auth/social-login/auth-google

function HeaderMenu() {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const FrontPageState = useSelector(
    (state: RootState) => state.counter.PageInfo.FrontPage.state
  )

  const setSelectedDiv = (
    value: 'home' | 'auth:login' | 'auth:register' | 'auth:forgot-password'
  ) => {
    dispatch(updateFrontPageState({ state: value }))
  }

  return (
    <div className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
      <div
        onClick={() => setSelectedDiv('home')}
        className="cursor-pointer transition-opacity hover:opacity-80"
      >
        <Logo size="sm" theme="dark" />
      </div>

      {/* Toggle input checkbox */}
      <div className="relative flex w-1/2 rounded-xl bg-slate-950/50 p-1 ring-1 ring-white/5 backdrop-blur-sm">
        {/* Fundo Animado (A "Pílula" Branca) */}
        <motion.div
          layoutId="active-pill"
          className="absolute inset-y-1 rounded-lg bg-indigo-500 shadow-lg shadow-indigo-500/25"
          initial={false}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            width: 'calc(50% - 4px)',
            left: FrontPageState === 'auth:login' ? '4px' : '50%'
          }}
        />

        {/* Botão Login */}
        <button
          onClick={() => setSelectedDiv('auth:login')}
          className={`relative z-10 flex w-1/2 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-colors duration-200 ${
            FrontPageState === 'auth:login'
              ? 'text-white'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>{t('hud.AuthPage.Header.loginLabel')}</span>
          <Icon icon="mdi:login" className="size-4" />
        </button>

        {/* Botão Registrar */}
        <button
          onClick={() => setSelectedDiv('auth:register')}
          className={`relative z-10 flex w-1/2 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-colors duration-200 ${
            FrontPageState === 'auth:register'
              ? 'text-white'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="whitespace-nowrap">
            {t('hud.AuthPage.Header.registerLabel')}
          </span>
          <Icon icon="mdi:account-plus" className="size-4" />
        </button>
      </div>

      <div>
        {FrontPageState !== 'home' && (
          <button
            onClick={() => setSelectedDiv('home')}
            className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <Icon
              icon="mdi:arrow-left"
              className="transition-transform group-hover:-translate-x-1"
            />
            {t('hud.AuthPage.Header.gobackButton')}
          </button>
        )}
      </div>
    </div>
  )
}

export default function Auth() {
  const FrontPageState = useSelector(
    (state: RootState) => state.counter.PageInfo.FrontPage.state
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
