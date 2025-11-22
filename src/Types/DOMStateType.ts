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
  selectedItemId?: number | null
}

type PageInfo = {
  FrontPage: FrontPage
  DashboardPage: DashboardPage
}

type DomStateType = {
  selectedStyleMode: 'dark' | 'light'
  overlayVisible: boolean
  AuthInfo: AuthInfo
  PageInfo: PageInfo
}

export default DomStateType
