import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="mb-3 mt-auto text-center text-sm text-gray-400">
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
  )
}
