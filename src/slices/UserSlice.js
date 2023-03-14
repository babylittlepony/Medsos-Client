import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async ({ username, password, nama, email, no_selular }, thunkAPI) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_PORT}/${
          import.meta.env.VITE_AUTH_URL
        }/register`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
            nama,
            email,
            no_selular,
          }),
        }
      )
      let data = await response.json()
      console.log("data", data)

      if (response.status === 201) {
        localStorage.setItem("token", data.token)
        return { ...data, username, email }
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e) {
      console.log("Error", e.response.data)
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_PORT}/${
          import.meta.env.VITE_AUTH_URL
        }/login`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      )
      let data = await response.json()
      console.log("response", data)

      if (response.status === 201) {
        localStorage.setItem("token", data.token)
        return data
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e) {
      console.log("Error", e.response.data)
      thunkAPI.rejectWithValue(e.response.data)
    }
  }
)

// export const fetchUserBytoken = createAsyncThunk(
//   "users/fetchUserByToken",
//   async ({ token }, thunkAPI) => {
//     try {
//       const response = await fetch(
//         "https://mock-user-auth-server.herokuapp.com/api/v1/users",
//         {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       )
//       let data = await response.json()
//       console.log("data", data, response.status)

//       if (response.status === 200) {
//         return { ...data }
//       } else {
//         return thunkAPI.rejectWithValue(data)
//       }
//     } catch (e) {
//       console.log("Error", e.response.data)
//       return thunkAPI.rejectWithValue(e.response.data)
//     }
//   }
// )

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false
      state.isSuccess = false
      state.isFetching = false

      return state
    },
  },
  extraReducers: {
    [registerUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false
      state.isSuccess = true
      state.email = payload.user.email
      state.username = payload.user.username
    },
    [registerUser.pending]: (state) => {
      state.isFetching = true
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isFetching = false
      state.isError = true
      state.errorMessage = payload.message
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.email = payload.email
      state.username = payload.username
      state.isFetching = false
      state.isSuccess = true
      return state
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.log("payload", payload)
      state.isFetching = false
      state.isError = true
      state.errorMessage = payload.message
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true
    },
  },
})

export const userSelector = (state) => state.user
export const { clearState } = userSlice.actions
