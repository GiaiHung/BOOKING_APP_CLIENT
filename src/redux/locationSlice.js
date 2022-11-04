import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  destination: '',
  datePicker: [],
  options: {},
  min: 0,
  max: 100,
}

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    saveUrl: (state, action) => {
      state.destination = action.payload.destination
      state.datePicker = action.payload.datePicker
      state.options = action.payload.options
      state.min = action.payload.min
      state.max = action.payload.max
    },
  },
})

// Action creators are generated for each case reducer function
export const { saveUrl } = locationSlice.actions

export default locationSlice.reducer
