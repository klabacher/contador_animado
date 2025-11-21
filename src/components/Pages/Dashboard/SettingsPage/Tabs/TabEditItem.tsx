import EditProject from './Components/EditProject'
import PreviewResults from './Components/PreviewResults'

export default function TabMenuContainer() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-black p-0">
      <div className="flex h-screen w-screen overflow-hidden rounded-xl bg-transparent shadow-inner">
        Edit Foadase
        <PreviewResults />
        <EditProject />
      </div>
    </div>
  )
}
