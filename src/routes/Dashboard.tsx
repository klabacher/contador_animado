import { useSelector } from 'react-redux'
import { RootState } from 'Providers/Redux/Store'

// Dashboard Pages/Components
import AnalyticsPage from 'components/Pages/Dashboard/AnalyticsPage'
import PreviewPage from 'components/Pages/Dashboard/PreviewPage'
import DashboardMenu from 'components/Pages/Dashboard/SettingsPage'
import Header from 'components/Pages/Dashboard/Header'

//type -> 'preview' | 'settings' | 'analytics'

// Plan
// Create full preview page with button to toggle state and change everything

function DashboardContainer() {
  // const dispatch = useDispatch<AppDispatch>()
  const state = useSelector(
    (state: RootState) => state.counter.PageInfo.DashboardPage.state
  )

  return (
    <div className="h-screen w-screen overflow-hidden bg-green-50 p-1">
      <Header />
      {state === 'preview' && <PreviewPage />}
      {state === 'settings' && <DashboardMenu />}
      {state === 'analytics' && <AnalyticsPage />}
    </div>
  )
}

export default DashboardContainer
