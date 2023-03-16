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
    <div className="w-1/2 mx-auto my-10 max-w-sm bg-gray-200 shadow-md">
      <div className="p-6">
        {/* FORM */}
        <form method="POST" onSubmit={handleLogin}>
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
          <button
            type="submit"
            className="text-center w-full py-2 mt-4 bg-gray-300 font-bold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
