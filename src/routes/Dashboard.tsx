import OverlayButtonContainer from 'components/Pages/Service/OverlayButton/OverlayButton'
import { AppDispatch, RootState } from 'Providers/Redux/Store'
import { updateOverlayVisible } from 'Providers/Redux/Slice'
import { useDispatch, useSelector } from 'react-redux'
// Dashboard Pages/Components
import AnalyticsPage from 'components/Pages/Dashboard/AnalyticsPage'
import PreviewPage from 'components/Pages/Dashboard/PreviewPage'
import DashboardMenu from 'components/Pages/Dashboard/SettingsPage'
import Header from 'components/Pages/Dashboard/Header'
// import { Navigate } from 'react-router-dom'

//type -> 'preview' | 'settings' | 'analytics'

// Plan
// Create full preview page with button to toggle state and change everything

function DashboardContainer() {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector(
    (state: RootState) => state.counter.PageInfo.DashboardPage.state
  )

  const handleOverlayToggle = () => {
    // Dispatch action to toggle overlay state
    dispatch(updateOverlayVisible())
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-green-50 p-1">
      <Header />
      {state === 'preview' && <PreviewPage />}
      {state === 'settings' && <DashboardMenu />}
      {state === 'analytics' && <AnalyticsPage />}
      {/* Default button, show change this */}
      <div className="absolute bottom-4 right-4">
        <OverlayButtonContainer onClick={handleOverlayToggle} />
      </div>
    </div>
  )
}

export default DashboardContainer
