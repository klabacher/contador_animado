// Store Info URL Parser class and Intl related utilities here
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resources from '../../assets/i18n.json'

const availableLanguages = Object.keys(resources)

// Change language accepting only available languages
export function changeLanguage(lang: string) {
  if (!availableLanguages.includes(lang)) {
    console.warn(
      `Language "${lang}" is not available. Available languages: ${availableLanguages.join(
        ', '
      )}`
    )
    i18n.changeLanguage(getDefaultLanguage())
    return getDefaultLanguage()
  } else {
    i18n.changeLanguage(lang)
    return lang
  }
}

export function getCurrentLanguage(): string {
  return i18n.language
}

export function getAvailableLanguages(): string[] {
  return availableLanguages
}

export function getDefaultLanguage(): string {
  return 'pt-BR'
}

i18n.use(initReactI18next).init({
  resources,
  lng: getDefaultLanguage(),
  fallbackLng: getDefaultLanguage(),

  interpolation: {
    escapeValue: false
  }
})

export default i18n
