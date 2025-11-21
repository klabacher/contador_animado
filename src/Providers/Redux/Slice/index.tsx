import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type initialStateType from 'types/reduxStore'
import { UserProfile } from 'types/reduxStore'

// Default initial state
const initialState: initialStateType = {
  CounterData: {
    Timing: {
      startDate: new Date('2020-01-01').getTime(),
      endDate: new Date('2026-01-01 00:00:00').getTime()
    },
    Texts: {
      title: 'Final do Ano 2025',
      description: 'Contagem regressiva para o final do ano de 2025!',
      calltoAction: 'Vamos comemorar juntos quando chegar a hora!',
      buttons: [
        {
          label: 'Vamos até lá!',
          shownOnlyWhen: 'beforeStart',
          action: 'link',
          link: null
        }
      ],
      footer: 'Feito com ❤️ por Klabacher - github.com/klabacher'
    },
    Styles: {
      dark: {
        backgroundColor: '#121212',
        textColor: '#FFFFFF',
        accentColor: '#BB86FC'
      },
      light: {
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
        accentColor: '#6200EE'
      }
    },
    Settings: {
      showTimezone: false,
      timezone: 'America/Sao_Paulo',
      digitSeparator: ':',
      digitsShowLeadingZeros: true,
      digitsShown: 'years',
      showSeconds: true,
      animationDuration: 0
    }
  },
  selectedStyleMode: 'dark',
  overlayVisible: false,
  AuthInfo: {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: false,
    error: null
  },
  PageInfo: {
    FrontPage: {
      state: 'home'
    },
    DashboardPage: {
      state: 'settings',
      SettingsTab: 'TabExplorerMenu',
      selectedItemId: null
    }
  }
}

export const reduxSlice = createSlice({
  name: 'redux',
  initialState,
  reducers: {
    // Definir os reducers aqui
    updateTiming(state, action) {
      state.CounterData.Timing = action.payload
    },
    updateTexts(state, action) {
      state.CounterData.Texts = action.payload
    },
    updateStyles(state, action) {
      state.CounterData.Styles = action.payload
    },
    updateSettings(state, action) {
      state.CounterData.Settings = action.payload
    },
    updateOverlayVisible(state) {
      state.overlayVisible = !state.overlayVisible
    },
    updateFrontPageState(state, action) {
      state.PageInfo.FrontPage = action.payload
    },
    updateDashboardPageState(state, action) {
      state.PageInfo.DashboardPage.state = action.payload.state
    },
    updateSettingsTabState(state, action) {
      state.PageInfo.DashboardPage.SettingsTab = action.payload
    },
    // Settings - TabExplorer selected item ID
    updateSelectedItemId(state, action) {
      state.PageInfo.DashboardPage.selectedItemId = action.payload
    },
    // Auth reducers
    authStart(state) {
      state.AuthInfo.loading = true
      state.AuthInfo.error = null
    },
    authSuccess(
      state,
      action: PayloadAction<{ user: UserProfile; token: string }>
    ) {
      state.AuthInfo.isAuthenticated = true
      state.AuthInfo.user = action.payload.user
      state.AuthInfo.token = action.payload.token
      state.AuthInfo.loading = false
      state.AuthInfo.error = null
    },
    authFail(state, action: PayloadAction<string>) {
      state.AuthInfo.loading = false
      state.AuthInfo.error = action.payload
    },
    logout(state) {
      state.AuthInfo = initialState.AuthInfo
    }
  }
})

export const {
  updateTiming,
  updateTexts,
  updateStyles,
  updateSettings,
  updateOverlayVisible,
  updateFrontPageState,
  authStart,
  authSuccess,
  authFail,
  logout,
  updateDashboardPageState,
  updateSettingsTabState,
  updateSelectedItemId
} = reduxSlice.actions
export default reduxSlice.reducer

export type ReduxState = typeof initialState
