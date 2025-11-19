import { updateFrontPageState } from 'Providers/Redux/Slice'
import { RootState } from 'Providers/Redux/Store'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from '@iconify/react'
import Logo from './Logo'
import LoginPage from './Auth/Login'
import RegisterPage from './Auth/Register'

function HeaderMenu() {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const FrontPageState = useSelector(
    (state: RootState) => state.counter.PageInfo.FrontPage.state
  )
  const setSelectedDiv = (value: 'home' | 'auth:login' | 'auth:register') => {
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

      <div className="hidden font-medium text-slate-600 sm:block dark:text-slate-400">
        {FrontPageState === 'auth:login'
          ? t('hud.AuthPage.Header.loginTitle')
          : FrontPageState === 'auth:register'
            ? t('hud.AuthPage.Header.registerTitle')
            : 'Menu'}
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
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <HeaderMenu />
      <div className="flex flex-1 flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md transition-all duration-500">
          {FrontPageState === 'auth:login' ? (
            <LoginPage />
          ) : FrontPageState === 'auth:register' ? (
            <RegisterPage />
          ) : null}
        </div>
      </div>
    </div>
  )
}
