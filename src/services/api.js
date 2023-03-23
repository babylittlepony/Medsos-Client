import axios from "axios"
import { getFirstLocalToken, getNewLocalToken } from "../helper/getLocalToken"

const { VITE_BASE_URL, VITE_PORT, VITE_AUTH_URL, VITE_API_VER_URL } =
  import.meta.env

const api = axios.create({
  baseURL: `${VITE_BASE_URL}:${VITE_PORT}/${VITE_API_VER_URL}`,
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
        const rs = await api.get("/auth/refresh-token")
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

export default api
