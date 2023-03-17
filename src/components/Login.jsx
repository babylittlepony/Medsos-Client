import React from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import loginRules from "../helper/validationRules"

import { loginUser } from "../slices/authSlice"

const Login = ({}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  /*/ 
  Username: Egarpramana
  Password: egar123
  /*/

  const onSubmit = async (data) => {
    try {
      console.log(data)
      await dispatch(loginUser(data))
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mx-auto my-10 w-1/2 max-w-sm rounded-md bg-gray-200 shadow-md">
      <div className="p-6">
        {/* FORM */}
        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label className="font-medium" htmlFor="username">
              Username
            </label>
            <input
              className={`rounded-md border border-gray-300 bg-gray-50 p-1 outline-none  ${
                errors?.username && "border-red-300"
              }  text-gray-900`}
              type="text"
              name="username"
              {...register("username", loginRules.username)}
            />
            {errors?.username && (
              <span className="mt-2 text-sm">{errors.username.message}</span>
            )}
          </div>
          <div className="my-4 flex flex-col">
            <label className="font-medium" htmlFor="password">
              Password
            </label>
            <input
              className={`rounded-md border border-gray-300 bg-gray-50 p-1 outline-none  ${
                errors?.password && "border-red-300"
              }  text-gray-900`}
              type="password"
              name="password"
              {...register("password", loginRules.password)}
            />
            {errors?.password && (
              <span className="mt-2 text-sm">{errors.password.message}</span>
            )}
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
