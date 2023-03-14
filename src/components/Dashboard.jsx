import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Oval } from "react-loader-spinner"
import { useNavigate } from "react-router-dom"

import { userSelector, clearState } from "../slices/UserSlice"

const Dashboard = () => {
  const navigate = useNavigate()
  const { isFetching, isError } = useSelector(userSelector)

  //   useEffect(() => {
  //     dispatch(fetchUserBytoken({ token: localStorage.getItem("token") }))
  //   }, [])
  const { username, email } = useSelector(userSelector)

  useEffect(() => {
    if (isError) {
      dispatch(clearState())
      navigate("/login")
    }
  }, [isError])

  const onLogOut = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div className="container mx-auto">
      {isFetching ? (
        <Oval color="#00BFFF" height={100} width={100} />
      ) : (
        <>
          <div className="container mx-auto">
            Welcome back <h3>{username}</h3>
          </div>
          <button
            onClick={onLogOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Log Out
          </button>
        </>
      )}
    </div>
  )
}
export default Dashboard
