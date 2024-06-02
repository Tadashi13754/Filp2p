import React, {useEffect} from 'react'
import axios from 'axios'
import {
    FileFilled
  } from '@ant-design/icons'
import './activedeals.css'
import { Button } from 'antd'
import { Space, Table, Tag, notification } from 'antd';
import Icon, { CloudDownloadOutlined } from '@ant-design/icons'

const ActiveDeals = () => {
  const [files, setFiles] = React.useState([])
  const [data, setData] = React.useState(null)
  const [api, contextHolder] = notification.useNotification()
  const openNotification = (message) => {
    api.open({
      message: message,
      duration: 2,
    });
  };

  const allFiles = async() => {
      const fileList = await axios.get('http://localhost:8000/deal_data')
      // console.log(fileList.data)
      const newData = []
      let count = 1
      for(let i=0; i<fileList.data.length; i++) {
        for(let j=0; j<Object.keys(fileList.data[i].contains).length; j++) {
          if(Object.keys(fileList.data[i].contains)[j]===""){
            continue
          }
          newData.push({
            key: count,
            payloadCID: fileList.data[i].payloadCid,
            miner: fileList.data[i].dealInfo.storageProvider,
            filename: Object.keys(fileList.data[i].contains)[j]===""?'root':Object.keys(fileList.data[i].contains)[j],
            dealstatus: fileList.data[i].dealInfo.dealStatus?fileList.data[i].dealInfo.dealStatus:'initiated',
          })
          console.log("newData"+ newData)
        }
        count++
      }
      setFiles(fileList.data)
      // console.log("newData:"+newData)
      setData(newData)
  }

  const retrieveFile = async(key) => {
    if(!data[key-1].dealstatus.includes('Sealing')) {
      openNotification('Deal not published')
      return
    }
    const response = await axios.get(
      `http://localhost:8000/retrieve_file?fileName=${data[key-1].filename}&miner=${data[key-1].miner}&payloadCid=${data[key-1].payloadCID}`
    )
    console.log(response)
  }

  const refreshdeal = async() => {
    await axios.get(
      `http://localhost:8000/refresh_deal_status_all`
    )
    // allFiles()
  }

  useEffect(() => {
    const get_data = async() => {
      await allFiles()
      await refreshdeal()
      // allFiles()
    }
    get_data()
  }, [])

  return (
    <div className='active-deals-container-main'>
      {contextHolder}
      <div className='active-deals-container'>
        <div className='col-1'>
          Sn. no
        </div>
        <div className='col-2'>
          File Name
        </div>
        <div className='col-3'>
          Deal Status
        </div>
        <div className='col-4'>
          Miner
        </div>
        <div className='col-5'>
          Action
        </div>
      </div>

    {data?
      data.map((record, index) => (
          <div className='active-deals-container'>
            <div className='col-1'>
              {record.key}
            </div>
            <div className='col-2'>
              {record.filename}
            </div>
            <div className='col-3'>
              {record.dealstatus}
            </div>
            <div className='col-4'>
              {record.miner}
            </div>
            <div className='col-5'>
              <span id='downloadIcon' onClick={()=>retrieveFile(record.key)}><CloudDownloadOutlined /></span>
            </div>
          </div>
      )):null
    }
    </div>
)
}

export default ActiveDeals
