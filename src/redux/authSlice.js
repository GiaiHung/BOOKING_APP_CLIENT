import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  loading: false,
  error: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.user = null
      state.loading = true
      state.error = false
    },
    loginSuccess: (state, action) => {
      state.user = action.payload
      state.loading = false
      state.error = false
    },
    loginFailure: (state) => {
      state.user = null
      state.loading = false
      state.error = true
    },
    logout: (state) => {
      state.user = null
      state.loading = false
      state.error = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions

export default authSlice.reducer
