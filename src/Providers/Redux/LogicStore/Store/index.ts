import { configureStore } from '@reduxjs/toolkit'
import CounterReducer from '../Slice'

const Store = configureStore({
  reducer: {
    logic: CounterReducer
  }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch

export default Store
