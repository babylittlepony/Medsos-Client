import { configureStore } from "@reduxjs/toolkit"
import { loadState, saveState } from "../helper/manageState"
import authReducer from "../slices/authSlice"

const persistedAuthState = loadState()

const store = configureStore({
  reducer: { auth: authReducer },
  preloadedState: persistedAuthState,
})

store.subscribe(() => {
  saveState(store.getState().auth)
})

export default store
