import { updateFrontPageState } from 'Providers/Redux/Slice'
import { RootState } from 'Providers/Redux/Store'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
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
  // Logic for showing selected menu and switching between login and register + GoBack button
  return (
    <div className="flex w-full items-center justify-between border-b border-slate-200 p-4">
      <div onClick={() => setSelectedDiv('home')}>
        <Logo size="sm" />
      </div>
      <div className="font-mono text-lg font-bold text-slate-950 hover:text-slate-800">
        {FrontPageState === 'auth:login'
          ? `${t('hud.AuthPage.Header.loginTitle')}`
          : FrontPageState === 'auth:register'
            ? `${t('hud.AuthPage.Header.registerTitle')}`
            : 'Menu'}
      </div>
      <div>
        {FrontPageState !== 'home' ? (
          <button
            onClick={() => setSelectedDiv('home')}
            className="font-mono text-sm font-bold text-slate-950 hover:text-slate-800"
          >
            &larr; {t('hud.AuthPage.Header.gobackButton')}
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default function Auth() {
  const FrontPageState = useSelector(
    (state: RootState) => state.counter.PageInfo.FrontPage.state
  )
  return (
    <div className="flex flex-1 flex-col bg-slate-500">
      <HeaderMenu />
      {FrontPageState === 'auth:login' ? (
        <LoginPage />
      ) : FrontPageState === 'auth:register' ? (
        <RegisterPage />
      ) : null}
    </div>
  )
}
