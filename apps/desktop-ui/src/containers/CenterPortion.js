import React from 'react'
import { useSelector } from 'react-redux'

import AllFiles from './centerPortionViews/AllFiles'
import Staging from './centerPortionViews/Staging'
import ActiveDeals from './centerPortionViews/ActiveDeals'
import Wiki from './centerPortionViews/Wiki'

const CenterPortion = () => {
    const { selected } = useSelector((state) => state.selectedOption)
  return (
    <div className='centerportion'>
      {selected === 1 ? (
                <AllFiles />
            ) : selected=== 2 ? (
                <Staging />
            ): selected=== 3 ? (
              <ActiveDeals />
          ): selected=== 5 ? (
            <Wiki />
          ):  <></>
      }
    </div>
  )
}

export default CenterPortion
