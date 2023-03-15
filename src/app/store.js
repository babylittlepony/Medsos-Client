import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from "../slices/authSlice"

export default configureStore({
  reducer: { auth: authReducer },
})

// const rootReducer = combineReducers({
//   user: userReducer,
//   // other reducers...
// });

// export default rootReducer;
