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

  function returnToSettings() {
    // Logic to return to settings
    dispatch(
      updateDashboardPageState({
        state: 'settings'
      })
    )
  }

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
      {DashboardState === 'analytics' ? (
        <div className="relative z-10 flex w-1/2 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium text-white transition-colors duration-200">
          <Icon icon="mdi:google-analytics" className="size-4" />
          <span>Analytics</span>
        </div>
      ) : DashboardState === 'preview' ? (
        <div className="relative z-10 flex w-1/2 flex-row items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium text-white transition-colors duration-200">
          {/* TODO: Fix Styles */}
          <Icon icon="mdi:eye" className="size-4" />
          <span className="whitespace-nowrap">Preview</span>
          <div
            onClick={returnToSettings}
            className="cursor-pointer flex-row rounded border bg-white/10 p-1 hover:bg-white/20"
          >
            <Icon icon="mdi:arrow-left" className="size-4" />
            <span>{t('hud.SettingsPage.Header.goBack', 'Go Back')}</span>
          </div>
        </div>
      ) : SettingsTab === 'TabExplorerMenu' ? (
        <div className="relative z-10 flex w-1/2 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium text-white transition-colors duration-200">
          <Icon icon="mdi:view-dashboard" className="size-4" />
          <span>{t('hud.SettingsPage.Header.projectsTitle', 'Projects')}</span>
        </div>
      ) : SettingsTab === 'TabCreateItem' ? (
        <div className="relative z-10 flex w-1/2 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium text-white transition-colors duration-200">
          <Icon icon="mdi:plus-circle" className="size-4" />
          <span>
            {t('hud.SettingsPage.Header.createProjectTitle', 'Create Project')}
          </span>
        </div>
      ) : SettingsTab === 'TabEditItem' ? (
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

          {/* Preview Button */}
          <button
            onClick={() => setSelectedDiv('preview')}
            className={`relative z-10 flex w-1/2 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-colors duration-200 ${
              DashboardState === 'preview'
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon icon="mdi:eye" className="size-4" />
            <span className="whitespace-nowrap">Preview</span>
          </button>

          {/* Settings Button */}
          <button
            onClick={() => setSelectedDiv('settings')}
            className={`relative z-10 flex w-1/2 items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-colors duration-200 ${
              DashboardState === 'settings'
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon icon="mdi:pencil" className="size-4" />
            <span>Editor</span>
          </button>
        </div>
      ) : null}
      {/* User Info Tab */}
      <UserInfo />
    </div>
  )
}
