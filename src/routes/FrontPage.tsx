import HomePage from 'components/Pages/FrontPage/HomePage'
import RandomImageContainer from 'components/Utils/RandomImage'
import Auth from 'components/Pages/FrontPage/Auth'
import ErrorContainer from 'components/Utils/ErrorContainer'
import { useSelector } from 'react-redux'
import { RootState } from 'Providers/Redux/Store'
// import { Navigate } from 'react-router-dom'

function App() {
  const FrontPageState = useSelector(
    (state: RootState) => state.counter.PageInfo.FrontPage.state
  )
  const ErrorContainerValues = useSelector(
    (state: RootState) => state.counter.ErrorContainer
  )

  return (
    <div className="h-screen w-screen overflow-hidden bg-green-50 p-1">
      {ErrorContainerValues.shown ? <ErrorContainer /> : null}
      {/* {overlay ? <OverlayMenuContainer /> : null} */}
      <div className="flex h-screen w-screen">
        {/* TODO: add new sucess box for changes */}
        {FrontPageState === 'home' ? <RandomImageContainer /> : <Auth />}
        {FrontPageState === 'home' ? <HomePage /> : <RandomImageContainer />}
      </div>
    </div>
  )
}

export default App
