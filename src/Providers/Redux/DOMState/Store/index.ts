import { configureStore } from '@reduxjs/toolkit'
import HudReducer from '../Slice'

const Store = configureStore({
  reducer: {
    hud: HudReducer
  }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch

export default Store
