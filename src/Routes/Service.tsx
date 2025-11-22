import CounterContainer from 'Components/Pages/Service/Counter'
import OverlayMenuContainer from 'Components/Utils/OverlayMenuContainer'
import OverlayButtonContainer from 'Components/Utils/OverlayButton'
import { AppDispatch, RootState } from 'Providers/ReduxProvider/Store'
import { updateOverlayVisible } from 'Providers/ReduxProvider/DOMState'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

function App() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const overlay = useSelector((state: RootState) => state.dom.overlayVisible)

  const handleOverlayToggle = () => {
    // Dispatch action to toggle overlay state
    dispatch(updateOverlayVisible())
  }

  // id not valid case
  if (!id || id.length === 0) {
    navigate(`/`)
  } else {
    return (
      <div className="h-screen w-screen overflow-hidden bg-green-50 p-1">
        {overlay ? <OverlayMenuContainer /> : null}
        <div className="flex h-screen w-screen">
          <CounterContainer />
          <OverlayButtonContainer onClick={() => handleOverlayToggle()} />
        </div>
      </div>
    )
  }
}

export default App
