/* tailwindcss/migration-from-tailwind-2  */
import React from 'react'
import { Icon } from '@iconify/react'

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <Icon
          icon="eos-icons:loading"
          className="size-16 animate-spin text-white"
        />
        <span className="text-lg font-semibold text-white">Carregando...</span>
      </div>
    </div>
  )
}

export default Loading
