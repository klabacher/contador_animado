import CounterContainer from 'components/Pages/Service/Counter'
import OverlayMenuContainer from 'components/Pages/Service/OverlayMenuContainer'
import OverlayButtonContainer from 'components/Pages/Service/OverlayButton/OverlayButton'
import RandomImageContainer from 'components/RandomImage'
import { AppDispatch, RootState } from 'Providers/Redux/Store'
import { updateOverlayVisible } from 'Providers/Redux/Slice'
import { useDispatch, useSelector } from 'react-redux'
// import { Navigate } from 'react-router-dom'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const overlay = useSelector(
    (state: RootState) => state.counter.overlayVisible
  )

  const handleOverlayToggle = () => {
    // Dispatch action to toggle overlay state
    dispatch(updateOverlayVisible())
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-green-50 p-1">
      {overlay ? <OverlayMenuContainer /> : null}
      <div className="flex h-screen w-screen">
        {/* TODO: add new sucess box for changes */}
        <RandomImageContainer />
        <CounterContainer />
        <OverlayButtonContainer onClick={() => handleOverlayToggle()} />
      </div>
    </div>
  )
}

export default App
