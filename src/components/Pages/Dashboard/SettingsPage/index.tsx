import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'Providers/Redux/Store'
import { useSelector } from 'react-redux'

export default function DashboardMenu() {
  const dispatch = useDispatch<AppDispatch>()
  const counterData = useSelector(
    (state: RootState) => state.counter.CounterData
  )
  return (
    <>
      <div className="flex h-screen w-screen flex-row">
        {/* TODO: add new sucess box for changes */}
        <div className="size-1/2 ">Preview</div>
        <div className="size-1/2">Yeah</div>
      </div>
    </>
  )
}
