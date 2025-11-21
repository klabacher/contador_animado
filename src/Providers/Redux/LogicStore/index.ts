// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import LogicStoreType from 'types/LogicStoreType'

const initialState: LogicStoreType = {
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
}

export const reduxSlice = createSlice({
  name: 'redux',
  initialState,
  reducers: {
    // Definir os reducers aqui
    updateTiming(state, action) {
      state.Timing = action.payload
    },
    updateTexts(state, action) {
      state.Texts = action.payload
    },
    updateStyles(state, action) {
      state.Styles = action.payload
    },
    updateSettings(state, action) {
      state.Settings = action.payload
    }
  }
})

export const { updateTiming, updateTexts, updateStyles, updateSettings } =
  reduxSlice.actions
export default reduxSlice.reducer

export type ReduxState = typeof initialState
