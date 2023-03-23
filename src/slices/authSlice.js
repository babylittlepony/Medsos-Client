import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"
import api from "../services/api"

const initialState = {
  currentUser: null,
  isLoggedIn: false,
  error: null,
  token: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
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
      Object.assign(state, initialState)
    },
    registerFailure(state, action) {
      state.currentUser = null
      state.error = action.payload
    },
  },
})

export const loginUser = (credentials) => async (dispatch) => {
  try {
    toast.loading("Logged in...")
    const response = await api.post("/auth/login", credentials)
    const { data } = response.data
    const token = data.accessToken

    dispatch(loginSuccess({ data, token }))
    toast.remove()
    toast.success("Login sukses")
    return Promise.resolve(response.data)
  } catch (error) {
    console.log(error)
    const errMessage = error.response?.data?.data?.message
    toast.remove()

    if (
      errMessage === "Sesi akun sedang aktif, silahkan keluar terlebih dahulu"
    ) {
      return toast.error(errMessage)
    }

    dispatch(loginFailure(error.response?.data?.error))
    toast.error(errMessage || "Login gagal")
    return Promise.reject(errMessage)
  }
}

export const logoutUser = (token) => async (dispatch) => {
  try {
    toast.loading("Logged out...")
    const response = await api.get("/auth/logout", {
      headers: { Authorization: `Bearer ${token}` },
    })

    dispatch(logout())
    toast.remove()

    toast.success("Logout sukses")
    return response
  } catch (error) {
    toast.remove()
    console.log(error)
    return Promise.reject(error.response)
  }
}

export const registerUser = (userData) => async (dispatch) => {
  try {
    toast.loading("Register...")

    const response = await api.post("/auth/register", userData)
    toast.remove()
    toast.success(response.data?.data?.message)
    return response.data
  } catch (error) {
    toast.remove()
    dispatch(registerFailure(error.response))
    console.log(error)
    toast.error(error.response || "Registrasi gagal, silahkan coba lagi")
    throw error.response.data?.data?.message
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
