import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'Providers/ReduxProvider/Store'
import { updateDashboardPageState } from 'Providers/ReduxProvider/DOMState'
import { useTranslation } from 'react-i18next'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import Logo from 'Components/Utils/Logo'
import UserInfo from './UserInfo'

export default function HeaderMenu() {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const DashboardState = useSelector(
    (state: RootState) => state.dom.PageInfo.DashboardPage.state
  )

  const setSelectedDiv = (state: 'preview' | 'settings' | 'analytics') => {
    dispatch(updateDashboardPageState({ state: state }))
  }
  const SettingsTab = useSelector(
    (state: RootState) => state.dom.PageInfo.DashboardPage.SettingsTab
  )

  return (
    <div className="sticky top-0 z-50 flex w-full items-center justify-between px-6 py-4 dark:border-slate-800 dark:bg-slate-900/100">
      <div
        onClick={() => setSelectedDiv('settings')}
        className="cursor-pointer transition-opacity hover:opacity-80"
      >
        <Logo size="sm" theme="dark" />
      </div>

      {/* Toggle input checkbox */}
      {SettingsTab === 'TabExplorerMenu' ? (
        DashboardState === 'preview' && (
          <div className="relative flex w-1/2 rounded-xl bg-slate-950/50 p-1 ring-1 ring-white/5 backdrop-blur-sm">
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

            {/* Settings Button */}
            <button
              onClick={() => setSelectedDiv('preview')}
              className={`relative z-10 flex w-1/2 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-colors duration-200 ${
                DashboardState === 'preview'
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon icon="mdi:account-plus" className="size-4" />
              <span className="whitespace-nowrap">
                Big Preview
                {/* {t('hud.SettingsPage.Header.PreviewTitle')} */}
              </span>
            </button>

            {/* Preview Button */}
            <button
              onClick={() => setSelectedDiv('settings')}
              className={`relative z-10 flex w-1/2 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-colors duration-200 ${
                // @ts-expect-error 2367
                DashboardState === 'settings'
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon icon="mdi:settings" className="size-4" />
              <span>{t('hud.SettingsPage.Header.settingsTitle')}</span>
            </button>
          </div>
        )
      ) : (
        <div className="relative z-10 flex w-1/2 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium text-white transition-colors duration-200">
          <Icon icon="mdi:settings" className="size-4" />
          <span>{t('hud.SettingsPage.Header.settingsTitle')}</span>
        </div>
      )}

      {/* User Info Tab */}
      <UserInfo />
    </div>
  )
}
