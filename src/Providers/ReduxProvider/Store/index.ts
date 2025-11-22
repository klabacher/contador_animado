import { configureStore } from '@reduxjs/toolkit'
import domReducer from '../DOMState'
import logicReducer from '../LogicStore'

const store = configureStore({
  reducer: {
    dom: domReducer,
    counter: logicReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
