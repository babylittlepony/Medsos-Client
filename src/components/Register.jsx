import React from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

import registerRules from "../helper/validationRules"
import { registerUser } from "../slices/authSlice"

const Register = () => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    dispatch(registerUser(data))
    console.log(data)
  }

  return (
    <div className="mx-auto my-10 w-1/2 max-w-sm rounded-md bg-gray-200 shadow-md">
      <div className="p-6">
        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label className="font-medium" htmlFor="username">
              Username
            </label>
            <input
              className={`rounded-md border border-gray-300 bg-gray-50 p-1 outline-none ${
                errors?.username && "border-red-300"
              } text-gray-900`}
              type="text"
              {...register("username", registerRules.username)}
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
              {...register("password", registerRules.password)}
            />
            {errors?.password && (
              <span className="mt-2 text-sm"> {errors.password.message}</span>
            )}
          </div>
          <div className="my-4 flex flex-col">
            <label className="font-medium" htmlFor="nama">
              Nama
            </label>
            <input
              className={`rounded-md border border-gray-300 bg-gray-50 p-1 outline-none  ${
                errors?.nama && "border-red-300"
              }  text-gray-900`}
              type="text"
              {...register("nama", registerRules.nama)}
            />
            {errors?.nama && (
              <span className="mt-2 text-sm">{errors.nama.message}</span>
            )}
          </div>
          <div className="my-4 flex flex-col">
            <label className="font-medium" htmlFor="email">
              Email
            </label>
            <input
              className={`rounded-md border border-gray-300 bg-gray-50 p-1 outline-none  ${
                errors?.email && "border-red-300"
              }  text-gray-900`}
              type="email"
              {...register("email", registerRules.email)}
            />
            {errors?.email && (
              <span className="mt-2 text-sm">{errors.email.message}</span>
            )}
          </div>
          <div className="my-4 flex flex-col">
            <label className="font-medium" htmlFor="no_selular">
              Nomor Selular
            </label>
            <input
              className={`rounded-md border border-gray-300 bg-gray-50 p-1 outline-none ${
                errors?.no_selular && "border-red-300"
              }  text-gray-900`}
              type="number"
              min={0}
              {...register("no_selular", registerRules.no_selular)}
            />
            {errors?.no_selular && (
              <span className="mt-2 text-sm">{errors.no_selular.message}</span>
            )}
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-gray-300 py-2 text-center font-bold"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
