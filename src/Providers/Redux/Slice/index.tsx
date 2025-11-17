import { createSlice } from '@reduxjs/toolkit'

type ButtonsText = {
  label: string
  action: string
  shownOnlyWhen: 'beforeStart' | 'afterEnd' | 'always'
  link: string | null
}

// Até onde vai mostrar os dígitos do contador
// Ex: 'years', 'months', 'days', 'hours', 'minutes', 'seconds', ''
type digitsShown = 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds'

type initialStateType = {
  currentData: {
    Timing: {
      startDate: number
      endDate: number
    }
    Texts: {
      title: string
      description: string
      calltoAction: string
      buttons: ButtonsText[]
      footer: string
    }
    Styles: {
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
    Settings: {
      showTimezone: boolean
      timezone: string
      digitSeparator: string
      digitsShowLeadingZeros: boolean
      digitsShown: digitsShown
      showSeconds: boolean
      animationDuration: number
      backgroundImageUrl?: string
    }
  }
  overlayVisible: boolean
  ErrorContainer: {
    shown: boolean
    title: string
    message: string
    close: string
  }
}

// Default initial state
const initialState: initialStateType = {
  currentData: {
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
  overlayVisible: false,
  ErrorContainer: {
    shown: false,
    title: '',
    message: '',
    close: ''
  }
}

export const reduxSlice = createSlice({
  name: 'redux',
  initialState,
  reducers: {
    // Definir os reducers aqui
    updateTiming(state, action) {
      state.currentData.Timing = action.payload
    },
    updateTexts(state, action) {
      state.currentData.Texts = action.payload
    },
    updateStyles(state, action) {
      state.currentData.Styles = action.payload
    },
    updateSettings(state, action) {
      state.currentData.Settings = action.payload
    },
    updateOverlayVisible(state) {
      state.overlayVisible = !state.overlayVisible
    },
    updateErrorContainer(state, action) {
      state.ErrorContainer = action.payload
    }
  }
})

export const {
  updateTiming,
  updateTexts,
  updateStyles,
  updateSettings,
  updateOverlayVisible,
  updateErrorContainer
} = reduxSlice.actions
export default reduxSlice.reducer

export type ReduxState = typeof initialState
