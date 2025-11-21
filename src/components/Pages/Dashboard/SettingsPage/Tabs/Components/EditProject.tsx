import RandomImageContainer from 'components/RandomImage'
import { RootState } from 'Providers/Redux/Store'
import { useSelector } from 'react-redux'

export default function EditTabContainer() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const selecionado = useSelector(
    (state: RootState) => state.dom.PageInfo.DashboardPage.selectedItemId
  )
  return (
    <div className="relative flex h-full w-1/2 flex-col overflow-hidden border-r border-slate-800 shadow-2xl">
      <div className="absolute inset-0 z-0 size-full">
        <RandomImageContainer sizeFull={true} />
        {/* Overlay escuro para garantir leitura em qualquer imagem */}
        <div className="absolute inset-0 size-full bg-slate-950/60 mix-blend-multiply" />
      </div>

      <div className="relative z-10 flex size-full items-center justify-center p-4 sm:p-6">
        <div
          id="sdsajkdjhsd"
          className="flex h-[65vh] w-4/5 flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/20 shadow-2xl ring-1 ring-black/50 backdrop-blur-xl transition-all"
        ></div>
      </div>
    </div>
  )
}
