import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    open: (state) => {
        state.isOpen = true
    },
    close: (state) => {
        state.isOpen = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { open, close } = sidebarSlice.actions

export default sidebarSlice.reducer
