import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import AuthService from "../services/auth.service"

const user = JSON.parse(localStorage.getItem("user"))

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, password, nama, email, no_selular }, thunkAPI) => {
    try {
      const response = await AuthService.register(
        username,
        password,
        nama,
        email,
        no_selular
      )
      thunkAPI.dispatch(toast.success(response.data?.data?.message))
      return response.data
    } catch (error) {
      thunkAPI.dispatch(toast.error(error.response))
      return thunkAPI.rejectWithValue()
    }
  }
)

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password)
      return { user: data }
    } catch (error) {
      thunkAPI.dispatch(toast.error(error))
      return thunkAPI.rejectWithValue()
    }
  }
)
