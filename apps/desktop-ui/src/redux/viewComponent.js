import { createSlice } from '@reduxjs/toolkit'

export const viewComponentSlice = createSlice({
  name: 'selectedOption',
  initialState: {
    selected: 1
  },
  reducers: {
    setValue: (state, action) => {
      state.selected = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setValue } = viewComponentSlice.actions

export default viewComponentSlice.reducer
