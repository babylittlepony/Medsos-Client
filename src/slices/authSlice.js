import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-hot-toast"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    isLoggedIn: false,
    error: null,
    token: null,
  },
  reducers: {
    loginSuccess(state, action) {
      state.currentUser = action.payload
      state.isLoggedIn = true
      state.error = null
      state.token = action.payload.token
    },
    loginFailure(state, action) {
      state.currentUser = null
      state.isLoggedIn = false
      state.error = action.payload
    },
    logout(state) {
      state.currentUser = null
      state.isLoggedIn = false
      state.error = null
    },
    registerSuccess(state, action) {
      state.currentUser = action.payload
      state.isLoggedIn = true
      state.error = null
    },
    registerFailure(state, action) {
      state.currentUser = null
      state.error = action.payload
    },
  },
})

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_PORT}/${
        import.meta.env.VITE_AUTH_URL
      }/login`,
      credentials
    )
    dispatch(loginSuccess(response.data))
    console.log(response)
    navigate("/")
    return Promise.resolve(response.data)
  } catch (error) {
    console.log(error)
    dispatch(loginFailure(error.response?.data?.error))
    return Promise.reject(error.response.data.error)
  }
}

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_PORT}/${
        import.meta.env.VITE_AUTH_URL
      }/register`,
      userData
    )
    dispatch(registerSuccess(response.data))
    console.log(response)
    navigate("/")
    toast.success("Registration successful!")
    return Promise.resolve(response.data)
  } catch (error) {
    dispatch(registerFailure(error.response.data.error))
    console.log(error)
    toast.error("Registration failed. Please try again.")
    return Promise.reject(error.response.data.error)
  }
}

export const {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  logout,
} = authSlice.actions

export default authSlice.reducer
