import React from 'react'
import { useTranslation } from 'react-i18next'

function Greetings() {
  const { t } = useTranslation()
  return (
    <div className="mb-4 text-center text-3xl font-bold text-white">
      {t('homepage.greetings')}
    </div>
  )
}

function Logo() {
  return (
    <div className="mb-8 flex justify-center">
      <img
        src="/contador_animado_logo.png"
        alt="Contador Animado Logo"
        className="size-32"
      />
    </div>
  )
}

function HomePage() {
  const { t } = useTranslation()
  return (
    <div className="flex h-full w-1/2 flex-col bg-slate-800 p-2">
      <Greetings></Greetings>
      <Logo></Logo>
      <footer className="mt-auto text-center text-xl text-gray-400">
        <div>{t('hud.texts.footer')}</div>
        <div className="mt-1 flex items-center justify-center space-x-3">
          <a
            href="https://github.com/klabacher"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white"
          >
            GitHub
          </a>
          <span className="text-gray-500">|</span>
          <a
            href="https://klabacher.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white"
          >
            klabacher.github.io
          </a>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
