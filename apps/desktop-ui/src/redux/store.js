import { configureStore } from '@reduxjs/toolkit'
import viewComponentReducer from './viewComponent'

export default configureStore({
  reducer: {
    selectedOption: viewComponentReducer
  }
})
