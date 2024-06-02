import React from 'react'
import './leftpannel.css'
import { useDispatch, useSelector } from 'react-redux'
import {setValue} from '../redux/viewComponent'

const LeftPannel = () => {
  const dispatch = useDispatch()
  const { selected } = useSelector((state) => state.selectedOption)

  return (
    <div className='leftpannel'>
      <div className='logo-area'>
        <span className='logo-text'>FilP2P</span>
      </div>
      <div className='options-section'>
        <div className={`pannelbutton ${selected === 1 ? 'selected' : ''}`} onClick={() => dispatch(setValue(1))}>
          <span className='pannel-text'>Files</span>
        </div>
        <div className={`pannelbutton ${selected === 2 ? 'selected' : ''}`} onClick={() => dispatch(setValue(2))}>
          <span className='pannel-text'>Staging</span>
        </div>
        <div className={`pannelbutton ${selected === 3 ? 'selected' : ''}`} onClick={() => dispatch(setValue(3))}>
          <span className='pannel-text'>Active Deals</span>
        </div>
        <div className={`pannelbutton ${selected === 4 ? 'selected' : ''}`} onClick={() => dispatch(setValue(4))}>
          <span className='pannel-text'>Expired Deals</span>
        </div>
      </div>
      <div className={`wiki`} onClick={() => dispatch(setValue(5))}>
        <span className='pannel-text'>wiki</span>
      </div>
    </div>
  )
}

export default LeftPannel
