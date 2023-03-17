import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { loginUser } from "../slices/authSlice"

const Login = ({}) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  /*/ 
  Username: Egarpramana
  Password: egar123
  /*/

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      await dispatch(loginUser({ username, password }))
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mx-auto my-10 w-1/2 max-w-sm bg-gray-200 shadow-md">
      <div className="p-6">
        {/* FORM */}
        <form method="POST" onSubmit={handleLogin}>
          <div className="flex flex-col">
            <label className="font-medium" htmlFor="username">
              Username
            </label>
            <input
              className="rounded-md border border-gray-300 bg-gray-50 p-1 text-gray-900 outline-none"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder
            />
          </div>
          <div className="my-4 flex flex-col">
            <label className="font-medium" htmlFor="password">
              Password
            </label>
            <input
              className="rounded-md border border-gray-300 bg-gray-50 p-1 text-gray-900 outline-none"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-gray-300 py-2 text-center font-bold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
