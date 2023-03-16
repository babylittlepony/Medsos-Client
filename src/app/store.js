import { configureStore } from "@reduxjs/toolkit"
import { loadState, saveState } from "../helper/manageState"
import authReducer from "../slices/authSlice"

const store = configureStore({
  reducer: { auth: authReducer },
  preloadedState: { auth: loadState() },
})

store.subscribe(() => {
  saveState(store.getState().auth)
})

export default store
