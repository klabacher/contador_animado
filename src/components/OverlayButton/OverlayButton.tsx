/// https://icon-sets.iconify.design/material-symbols/?icon-filter=menu
import { Icon } from '@iconify/react'

export default function OverlayButtonContainer({
  onClick
}: {
  onClick: () => void
}) {
  return (
    <button
      onClick={() => onClick()}
      className="absolute bottom-4 right-4 rounded-full bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <Icon icon="material-symbols:menu-rounded" width="24" height="24" />
    </button>
  )
}
