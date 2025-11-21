type Timing = {
  startDate: number
  endDate: number
}

type Texts = {
  title: string
  description: string
  calltoAction: string
  buttons: ButtonsText[]
  footer: string
}

type ButtonsText = {
  label: string
  action: string
  shownOnlyWhen: 'beforeStart' | 'afterEnd' | 'always'
  link: string | null
}

// Até onde vai mostrar os dígitos do CountSpark
// Ex: 'years', 'months', 'days', 'hours', 'minutes', 'seconds', ''
type digitsShown = 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds'

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

export type UserProfile = {
  id: string
  email: string | undefined
  name: string
  role: 'admin' | 'user' | 'guest'
}

type AuthInfo = {
  isAuthenticated: boolean
  user: UserProfile | null
  token: string | null
  loading: boolean
  error: string | null
}

type FrontPage = {
  state: 'home' | 'auth:login' | 'auth:register' | 'auth:forgot-password'
}

type DashboardPage = {
  state: 'preview' | 'settings' | 'analytics'
  SettingsTab: 'TabExplorerMenu' | 'TabCreateItem' | 'TabEditItem'
}

type PageInfo = {
  FrontPage: FrontPage
  DashboardPage: DashboardPage
}

type initialStateType = {
  CounterData: {
    Timing: Timing
    Texts: Texts
    Styles: Styles
    Settings: Settings
  }
  selectedStyleMode: 'dark' | 'light'
  overlayVisible: boolean
  AuthInfo: AuthInfo
  PageInfo: PageInfo
}

export default initialStateType
export type { Timing, Texts, Styles, Settings }
