import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer'
import toast from './middleware/toast'

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(toast)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
