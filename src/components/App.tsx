import CounterContainer from './Counter'
import OverlayMenuContainer from './OverlayMenuContainer'
import OverlayButtonContainer from './OverlayButton/OverlayButton'
import RandomImageContainer from './RandomImage'
import store, { AppDispatch, RootState } from 'Providers/Redux/Store'
import { updateOverlayVisible } from 'Providers/Redux/Slice'
import { Provider, useDispatch, useSelector } from 'react-redux'

import { StrictMode } from 'react'
import ErrorContainer from './ErrorContainer'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const overlay = useSelector(
    (state: RootState) => state.counter.overlayVisible
  )

  const ErrorContainerValues = useSelector(
    (state: RootState) => state.counter.ErrorContainer
  )

  const handleOverlayToggle = () => {
    // Dispatch action to toggle overlay state
    dispatch(updateOverlayVisible())
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-green-50 p-1">
      {overlay ? <OverlayMenuContainer /> : null}
      {ErrorContainerValues.shown ? <ErrorContainer /> : null}
      <div className="flex h-screen w-screen">
        {/* TODO: add new sucess box for changes */}
        <RandomImageContainer />
        <CounterContainer />
        <OverlayButtonContainer onClick={() => handleOverlayToggle()} />
      </div>
    </div>
  )
}

function AppContainer() {
  return (
    <StrictMode>
      {/* TODO: Add supabase persistence and web id for configuration */}
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  )
}

export default AppContainer
