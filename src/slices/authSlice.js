import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-hot-toast"

axios.defaults.headers.common["ngrok-skip-browser-warning"] = "true"

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
      state.token = null
    },
    registerStart(state) {
      state.loading = true
      state.error = null
    },
    registerFailure(state, action) {
      state.currentUser = null
      state.error = action.payload
      state.loading = false
    },
  },
})

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_PORT}/${
    import.meta.env.VITE_AUTH_URL
  }`,
  withCredentials: true,
})

export const loginUser = (credentials) => async (dispatch) => {
  try {
    toast.loading("Logged in...")
    const response = await api.post("/login", credentials)
    const data = response.data.data
    const token = response.data.data.accessToken

    dispatch(loginSuccess({ data, token }))
    toast.remove()

    console.log(response)
    toast.success("Login sukses")
    return Promise.resolve(response.data)
  } catch (error) {
    toast.remove()
    console.log(JSON.stringify(error))
    dispatch(loginFailure(error.response?.data?.error))
    toast.error(error.response?.data?.data?.message || "Login gagal")
    return Promise.reject(error.response?.data?.data?.message)
  }
}

export const logoutUser = (token) => async (dispatch) => {
  try {
    toast.loading("Logged out...")
    const response = await api.get("/logout", {
      headers: { Authorization: `Bearer ${token}` },
    })

    dispatch(logout())
    toast.remove()

    toast.success("Logout sukses")
    return Promise.resolve(response.data)
  } catch (error) {
    console.log(error)
    toast.error("Logout gagal")
    return Promise.reject(error.response.data.data.message)
  }
}

export const registerUser = (userData) => async (dispatch) => {
  try {
    toast.loading("Register...")
    dispatch(registerStart())

    const response = await api.post("/register", userData)
    toast.remove()

    console.log(response)
    toast.success(response.data?.data?.message)
    return Promise.resolve(response.data)
  } catch (error) {
    toast.remove()
    dispatch(registerFailure(error.response))
    console.log(error)
    toast.error(
      error.response.data?.data?.message ||
        "Registrasi gagal, silahkan coba lagi"
    )
    return Promise.reject(error.response.data?.data?.message)
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
