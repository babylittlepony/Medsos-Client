import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"

const EmailVerification = () => {
  const [isLoading, setIsLoading] = useState(true)

  const { code } = useParams()
  const navigate = useNavigate()

  const verifyEmail = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_PORT}/${
          import.meta.env.VITE_AUTH_URL
        }/verification/${code}`
      )
      if (response.status === 201) {
        setIsLoading(false)
        navigate("/")
        return toast.success(response.data?.data?.message)
      }
    } catch (error) {
      setIsLoading(false)
      console.error(error)
      return toast.error(
        error.response?.data?.data?.message ||
          "Verifikasi gagal, silahkan coba lagi"
      )
    }
  }

  useEffect(() => {
    verifyEmail()
  }, [])

  return (
    <div>
      <h1>Verifying your email...</h1>
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <div
            class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          />
        </div>
      )}
    </div>
  )
}

export default EmailVerification
