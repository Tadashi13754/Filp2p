import React, {useEffect} from 'react'
import './wiki.css'
import image1 from '../../assets/image1.png'
import image2 from '../../assets/image2.png'
import image3 from '../../assets/image3.png'

const Wiki = () => {

return (
  <div className='wiki-container'>
    <div className='about-sec'>
      About Filecoin
    </div>
    <div className='detail-sec'>
      <span>
        <br/><span>Filecoin is a decentralized filestorage platform. Below are the steps on how files are stored:</span><br/>
        <br/><span>1-User look for storage providerin the network</span><br/><br/>
        <img src={image1} height='250px'></img>
        <br/><br/><span>2-User Initiate deal with SP</span><br/><br/>
        <img src={image2} height='200px'></img>
        <br/><br/><span>3-After deal is live, SP send proof of storage to chain. And user can download files from SP.</span><br/><br/>
        <img src={image3} height='200px'></img>
      </span>
    </div>
  </div>
)
}

export default Wiki
