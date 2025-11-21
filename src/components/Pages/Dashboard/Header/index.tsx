import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'Providers/Redux/Store'
import { updateFrontPageState } from 'Providers/Redux/Slice'
import { useTranslation } from 'react-i18next'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import Logo from 'components/ComponentUtils/Logo'
import UserInfo from './UserInfo'

export default function HeaderMenu() {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const DashboardState = useSelector(
    (state: RootState) => state.counter.PageInfo.DashboardPage.state
  )

  const setSelectedDiv = (state: 'preview' | 'settings' | 'analytics') => {
    dispatch(updateFrontPageState({ state: state }))
  }

  return (
    <div className="sticky top-0 z-50 flex w-full items-center justify-between px-6 py-4 dark:border-slate-800 dark:bg-slate-900/100">
      <div
        onClick={() => setSelectedDiv('settings')}
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
            left: DashboardState === 'preview' ? '4px' : '50%'
          }}
        />

        {/* Botão Login */}
        <button
          onClick={() => setSelectedDiv('preview')}
          className={`relative z-10 flex w-1/2 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-colors duration-200 ${
            DashboardState === 'preview'
              ? 'text-white'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Icon icon="mdi:settings" className="size-4" />
          <span>{t('hud.SettingsPage.Header.settingsTitle')}</span>
        </button>

        {/* Botão Registrar */}
        <button
          onClick={() => setSelectedDiv('settings')}
          className={`relative z-10 flex w-1/2 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-colors duration-200 ${
            DashboardState === 'settings'
              ? 'text-white'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="whitespace-nowrap">
            {t('hud.SettingsPage.Header.PreviewTitle')}
          </span>
          <Icon icon="mdi:account-plus" className="size-4" />
        </button>
      </div>

      {/* User Info Tab */}
      <UserInfo />
    </div>
  )
}
