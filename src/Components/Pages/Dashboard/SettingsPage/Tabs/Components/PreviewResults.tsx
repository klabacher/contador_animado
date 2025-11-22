import RandomImageContainer from 'Components/Utils/RandomImage'
import { RootState } from 'Providers/ReduxProvider/Store'
import { useSelector } from 'react-redux'

export default function PreviewResults() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const selecionado = useSelector(
    (state: RootState) => state.dom.PageInfo.DashboardPage.selectedItemId
  )
  return (
    <div className="relative flex h-full w-1/2 flex-col border-r border-slate-800 shadow-2xl">
      <div className="absolute inset-0 z-0 size-full">
        <RandomImageContainer sizeFull={true} />
      </div>
    </div>
  )
}
