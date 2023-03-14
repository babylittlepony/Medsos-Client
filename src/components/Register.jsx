import axios from "axios"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { userSelector } from "../slices/UserSlice"

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [nama, setNama] = useState("")
  const [email, setEmail] = useState("")
  const [no_selular, set_noSelular] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, errors, handleSubmit } = useForm()

  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector)

  // const onSubmit = (data) => {
  //   dispatch(registerUser(data))
  // }

  // useEffect(() => {
  //   return () => {
  //     dispatch(clearState())
  //   }
  // }, [])

  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(clearState())
  //     navigate("/")
  //   }
  //   if (isError) {
  //     toast.error(errorMessage)
  //     dispatch(clearState())
  //   }
  // }, [isSuccess, isError])

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      const { data } = await toast.promise(
        axios.post(
          `${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_PORT}/${
            import.meta.env.VITE_AUTH_URL
          }/register`,
          {
            username,
            password,
            nama,
            email,
            no_selular,
          },
          { withCredentials: true }
        ),
        {
          loading: "Please wait...",
          success: (response) => response.data.data.message,
          error: (error) => {
            console.log(error.response)
            return error.response.data.data.message
          },
        }
      )
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-1/2 mx-auto my-10 max-w-sm bg-gray-200 shadow-md">
      <div className="p-6">
        {/* FORM */}
        <form method="POST" onSubmit={handleRegister}>
          <div className="flex flex-col">
            <label className="font-medium" htmlFor="username">
              Username
            </label>
            <input
              className="outline-none border rounded-md p-1 bg-gray-50 border-gray-300 text-gray-900"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder
            />
          </div>
          <div className="flex flex-col my-4">
            <label className="font-medium" htmlFor="password">
              Password
            </label>
            <input
              className="outline-none border p-1 rounded-md bg-gray-50 border-gray-300 text-gray-900"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col my-4">
            <label className="font-medium" htmlFor="nama">
              Nama
            </label>
            <input
              className="outline-none border p-1 rounded-md bg-gray-50 border-gray-300 text-gray-900"
              type="text"
              name="nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div className="flex flex-col my-4">
            <label className="font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="outline-none border p-1 rounded-md bg-gray-50 border-gray-300 text-gray-900"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col my-4">
            <label className="font-medium" htmlFor="no_selular">
              Nomor Selular
            </label>
            <input
              className="outline-none border p-1 rounded-md bg-gray-50 border-gray-300 text-gray-900"
              type="number"
              min={0}
              name="no_selular"
              value={no_selular}
              onChange={(e) => set_noSelular(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="text-center w-full py-2 mt-4 bg-gray-300 font-bold"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
