import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginFailure, loginStart, loginSuccess } from '../../redux/authSlice'
import { AiOutlineLoading } from 'react-icons/ai'
import setAuthToken from '../../utils/setAuthToken'

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const { user, loading, error } = useSelector((state) => state.auth)

  const handleInputChange = (e) => {
    setCredentials((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    dispatch(loginStart())
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        credentials
      )
      if (data.success) {
        dispatch(loginSuccess(data.user))
      }
      navigate('/')
    } catch (error) {
      dispatch(loginFailure())
      setErrorMessage(error.response.data.message)
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-r from-blue-300 to-violet-600">
      <div className="rounded-2xl bg-white p-6 shadow-2xl">
        <form className="flex flex-col gap-4 outline-none" onSubmit={handleLogin}>
          <h2 className="text-center text-4xl font-thin">Login</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            autoComplete="username"
            onChange={handleInputChange}
            className="h-[40px] rounded-2xl border border-gray-300 px-4 outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            autoComplete="current-password"
            onChange={handleInputChange}
            className="h-[40px] rounded-2xl border border-gray-300 px-4 outline-none"
          />
          <button
            className={`flex items-center justify-center gap-2 rounded-2xl bg-blue-500 py-2 px-4 text-lg text-white duration-150 ease-in hover:bg-blue-600 ${
              loading && 'cursor-not-allowed opacity-75'
            }`}
            onClick={handleLogin}
            disabled={loading}
          >
            {loading && <AiOutlineLoading className="animate-spin text-white" />}
            Log in
          </button>
          {error && <p className="text-sm font-semibold text-red-500">{errorMessage}</p>}
          <div>
            <p>
              Don't have an account?{' '}
              <Link to="/register">
                <button className="text-violet-500 hover:underline">Register</button>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
