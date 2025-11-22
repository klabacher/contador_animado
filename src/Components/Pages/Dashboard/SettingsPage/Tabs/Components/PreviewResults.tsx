import RandomImageContainer from 'Components/Utils/RandomImage'
import Store, { RootState } from 'Providers/ReduxProvider/Store'
import { updateDashboardPageState } from 'Providers/ReduxProvider/DOMState'
import { useSelector } from 'react-redux'

// TODO Insert Mini Preview of the Counter
function MinifiedPreview() {
  return (
    <div>
      <div className="m-4 rounded bg-white/10 p-4 text-center text-sm text-white">
        Mini Preview Placeholder
      </div>
    </div>
  )
}

// TODO Insert Mini Preview of the Counter
export default function PreviewResults() {
  const dispatch = Store.dispatch
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const selecionado = useSelector(
    (state: RootState) => state.dom.PageInfo.DashboardPage.selectedItemId
  )
  const gotoPreview = () => {
    dispatch(
      updateDashboardPageState({
        state: 'preview'
      })
    )
  }
  return (
    <div className="relative flex h-full w-1/2 flex-col border-r border-slate-800 shadow-2xl">
      <div className="absolute inset-0 z-0 size-full">
        <RandomImageContainer sizeFull={true} />

        <div className="absolute inset-0 size-full bg-slate-950/60 mix-blend-multiply" />
      </div>
      <div className="z-10">
        <MinifiedPreview />
        <button onClick={() => gotoPreview()} className="size-full">
          Go to Full Previw
        </button>
      </div>
    </div>
  )
}
