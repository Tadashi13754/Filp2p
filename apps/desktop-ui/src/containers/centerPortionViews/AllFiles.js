import React, {useEffect} from 'react'
import axios from 'axios'
import {
  FileFilled
} from '@ant-design/icons'
import './allfiles.css'
import { Button } from 'antd'

const AllFiles = () => {
    const [files, setFiles] = React.useState([])
    const allFiles = async() => {
        const fileList = await axios.get('http://localhost:8000/list_staging_files')
        console.log(fileList)
        setFiles(fileList.data)
    }
    useEffect(() => {
        allFiles()
    }, [])

    const prepareFiles = async() => {
      const prep = await axios.get('http://localhost:8000/prepare_files')
      await allFiles()
    }

  return (
    <div>
      <div className='show-files-top'>
        <Button className='prepare-button' style={{background: 'rgb(40 72 113)'}} onClick={prepareFiles} type="primary">Prep For Deal</Button>
      </div>
      <div className='show-files'>
        {files.map((file, index) => (
            <div className='icon-box-files' key={index}>
                <FileFilled style={{fontSize: '50px', color: '#e3f6ff'}} />
                <span id='file-text'>{file}</span>
            </div>
        ))}
      </div>
    </div>
  )
}

export default AllFiles
