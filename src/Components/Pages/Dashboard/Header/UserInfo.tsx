import { Icon } from '@iconify/react'
import AuthProvider from 'Providers/AuthProvider'
import { RootState } from 'Providers/ReduxProvider/Store'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// TODO: Add profile options menu
export default function UserInfo() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const userName = useSelector(
    (state: RootState) => state.dom.AuthInfo.user?.name
  )

  return (
    <div className="flex flex-row border border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mr-4 flex items-center gap-2 text-slate-200">
        <Icon icon="mdi:account-circle" className="text-3xl" />
        <span className="text-2xl font-medium">
          {t('hud.HomePage.hello')}, {userName}
        </span>
      </div>
      <button
        onClick={async () => {
          await AuthProvider.LogoutLogic()
          navigate('/')
        }}
        className="flex items-center gap-2 rounded-md bg-red-500/10 px-2 py-1 text-lg font-medium text-red-400 transition-colors hover:bg-red-500/20 hover:text-red-300"
      >
        <Icon icon="mdi:logout" />
        {t('hud.HomePage.logout')}
      </button>
    </div>
  )
}
