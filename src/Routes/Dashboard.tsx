import { useSelector } from 'react-redux'
import { RootState } from 'Providers/ReduxProvider/Store'

// Dashboard Pages/Components
import AnalyticsPage from 'Components/Pages/Dashboard/AnalyticsPage'
import PreviewPage from 'Components/Pages/Dashboard/PreviewPage'
import DashboardMenu from 'Components/Pages/Dashboard/SettingsPage'
import Header from 'Components/Pages/Dashboard/Header'

//type -> 'preview' | 'settings' | 'analytics'

// Plan
// Create full preview page with button to toggle state and change everything

function DashboardContainer() {
  // const dispatch = useDispatch<AppDispatch>()
  const state = useSelector(
    (state: RootState) => state.dom.PageInfo.DashboardPage.state
  )

  return (
    <div className="h-screen w-screen overflow-hidden bg-green-50 p-0">
      <Header />
      {state === 'preview' && <PreviewPage />}
      {state === 'settings' && <DashboardMenu />}
      {state === 'analytics' && <AnalyticsPage />}
    </div>
  )
}

export default DashboardContainer
