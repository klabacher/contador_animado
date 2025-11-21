type Styles = {
  dark: {
    backgroundColor: string
    textColor: string
    accentColor: string
  }
  light: {
    backgroundColor: string
    textColor: string
    accentColor: string
  }
  endAnimationStyles?: {
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

type Timing = {
  startDate: number
  endDate: number
}

// Até onde vai mostrar os dígitos do CountSpark
// Ex: 'years', 'months', 'days', 'hours', 'minutes', 'seconds', ''
type digitsShown = 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds'

type Settings = {
  showTimezone: boolean
  timezone: string
  digitSeparator: string
  digitsShowLeadingZeros: boolean
  digitsShown: digitsShown
  showSeconds: boolean
  animationDuration: number
  backgroundImageUrl?: string
}

type ButtonsText = {
  label: string
  action: string
  shownOnlyWhen: 'beforeStart' | 'afterEnd' | 'always'
  link: string | null
}

type Texts = {
  title: string
  description: string
  calltoAction: string
  buttons: ButtonsText[]
  footer: string
}

type LogicStoreType = {
  Timing: Timing
  Texts: Texts
  Styles: Styles
  Settings: Settings
}

export default LogicStoreType
