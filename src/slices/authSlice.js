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
    registerStart(state) {
      state.loading = true
      state.error = null
    },
    registerSuccess(state, action) {
      state.currentUser = action.payload
      state.isLoggedIn = true
      state.error = null
      state.loading = false
    },
    registerFailure(state, action) {
      state.currentUser = null
      state.error = action.payload
      state.loading = false
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
    const data = response.data.data
    const token = response.data.data.accessToken
    dispatch(loginSuccess({ data, token }))

    console.log(response)
    toast.success("Login sukses")
    return Promise.resolve(response.data)
  } catch (error) {
    console.log(error)
    dispatch(loginFailure(error.response?.data?.error))
    toast.error("Login gagal")
    return Promise.reject(error.response.data.error)
  }
}

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(registerStart())
    toast.loading("Register...")

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_PORT}/${
        import.meta.env.VITE_AUTH_URL
      }/register`,
      userData
    )

    dispatch(registerSuccess(response.data))
    console.log(response)
    toast.success(response.data?.data?.message)
    return Promise.resolve(response.data)
  } catch (error) {
    dispatch(registerFailure(error.response.data.error))
    console.log(error)
    toast.error(error.response.data.data.message || "Error, please try again")
    return Promise.reject(error.response.data.error)
  }
}

export const {
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
} = authSlice.actions

export default authSlice.reducer
