import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-hot-toast"
import { getFirstLocalToken, getNewLocalToken } from "../helper/getLocalToken"

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
    registerFailure(state, action) {
      state.currentUser = null
      state.error = action.payload
    },
  },
})

const { VITE_BASE_URL, VITE_PORT, VITE_AUTH_URL } = import.meta.env

const api = axios.create({
  baseURL: `${VITE_BASE_URL}:${VITE_PORT}/${VITE_AUTH_URL}`,
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    const newToken = getNewLocalToken()

    let token
    if (!newToken) {
      token = getFirstLocalToken()
      console.log("using first token")
    } else {
      token = getNewLocalToken()
      console.log("using new token")
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    const originalConfig = err.config

    if (
      err.response &&
      err.response.data?.data?.message === "jwt expired" &&
      !originalConfig._retry
    ) {
      originalConfig._retry = true

      try {
        const rs = await api.get("/refresh-token")
        const { token } = rs.data.data

        localStorage.setItem("new token", JSON.stringify(token))

        originalConfig.headers.Authorization = `Bearer ${token}`

        return api(originalConfig)
      } catch (err) {
        console.log("Error refreshing token", err)
        return Promise.reject(err)
      }
    }

    return Promise.reject(err)
  }
)

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
    const response = await api.get("/logout", {
      headers: { Authorization: `Bearer ${token}` },
    })

    dispatch(logout())
    toast.remove()

    toast.success("Logout sukses")
    return Promise.resolve(response)
  } catch (error) {
    toast.remove()
    console.log(error)
    return Promise.reject(error.response)
  }
}

export const registerUser = (userData) => async (dispatch) => {
  try {
    toast.loading("Register...")

    const response = await api.post("/register", userData)
    toast.remove()

    console.log(response)
    toast.success(response.data?.data?.message)
    return Promise.resolve(response.data)
  } catch (error) {
    toast.remove()
    dispatch(registerFailure(error.response))
    console.log(error)
    toast.error(error.response || "Registrasi gagal, silahkan coba lagi")
    return Promise.reject(error.response.data?.data?.message)
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
