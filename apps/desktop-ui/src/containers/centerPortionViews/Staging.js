import React, {useEffect} from 'react'
import axios from 'axios'
import {
    FileFilled
  } from '@ant-design/icons'
import './staging.css'
import { Button } from 'antd'
import { Tooltip } from 'antd';

const Staging = () => {
    const [text, setText] = React.useState('')
    const [files, setFiles] = React.useState([])
    const allFiles = async() => {
        const fileList = await axios.get('http://localhost:8000/deal_data')
        console.log(fileList.data)
        setFiles(fileList.data)
        if(fileList.data[0]){
          setText(`File Name: ${fileList.data[0].pieceCid + '.car'}
          File Size: ${fileList.data[0].pieceSize}\n
          Contains: ${Object.keys(fileList.data[0].contains).length + ' Files'}`);
        }
    }
    useEffect(() => {
        allFiles()
    }, [])

    const initiate_deal = async() => {
      const dealInfo = await axios.get(
        `http://localhost:8000/initiate_deal_all`
      )
      console.log(dealInfo)
      await allFiles()
      // const miner = 't017387'
      // const miner = 't017387'
      // const fileName = files[0].pieceCid + '.car'
      // const commp = files[0].pieceCid
      // const carS = files[0].carSize
      // const pieceS = files[0].pieceSize
      // const payloadCid = files[0].payloadCid
      // const dealInfo = await axios.get(
      //   `http://localhost:8000/initiate_deal?miner=${miner}&fileName=${fileName}&commp=${commp}&carS=${carS}&pieceS=${pieceS}&payloadCid=${payloadCid}`
      // )
      // console.log(dealInfo)
      // await allFiles()
    }

  return (
    <div>
      <div className='show-files-top'>
        <Button className='prepare-button' style={{background: 'rgb(40 72 113)'}} onClick={initiate_deal} type="primary">Initiate Deal</Button>
      </div>
      <div className='show-files'>
        {files.map((file, index) => (
          !file.dealInfo?(
            <Tooltip placement="bottomLeft" title={text}>
              <div className='icon-box-files' key={index}>
                  <FileFilled style={{fontSize: '50px', color: '#e3f6ff'}} />
                  <span id='file-text'>{file.pieceCid+'.car'}</span>
              </div>
            </Tooltip>
          ):<></>
        ))}
      </div>
    </div>
  )
}

export default Staging
