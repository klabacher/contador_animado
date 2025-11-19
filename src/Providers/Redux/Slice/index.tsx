import { createSlice } from '@reduxjs/toolkit'
import type initialStateType from 'types/reduxStore'

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
  ErrorContainer: {
    shown: false,
    title: '',
    message: '',
    close: ''
  },
  AuthInfo: {
    isAuthenticated: false,
    user: null,
    token: null
  },
  PageInfo: {
    FrontPage: {
      state: 'home'
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
    updateErrorContainer(state, action) {
      state.ErrorContainer = action.payload
    },
    updateFrontPageState(state, action) {
      state.PageInfo.FrontPage = action.payload
    }
  }
})

export const {
  updateTiming,
  updateTexts,
  updateStyles,
  updateSettings,
  updateOverlayVisible,
  updateErrorContainer,
  updateFrontPageState
} = reduxSlice.actions
export default reduxSlice.reducer

export type ReduxState = typeof initialState
