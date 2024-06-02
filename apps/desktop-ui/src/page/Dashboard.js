import React from 'react'
import TopBar from '../containers/TopBar'
import LeftPannel from '../containers/LeftPannel'
import CenterPortion from '../containers/CenterPortion'
import './dashboard.css'

const Dashboard = () => {
  return (
    <div className='dashboard'>
        <div className='left-pannel'>
          <LeftPannel />
        </div>
        <div className='partition'>
        </div>
        <div className='right-pannel'>
          <div className='top-bar'>
            <TopBar />
          </div>
          <div className='center-portion'>
            <CenterPortion />
          </div>
        </div>
    </div>
  )
}

export default Dashboard
