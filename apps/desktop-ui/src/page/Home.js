import React, {useState} from 'react'
import './home.css'
import { Button, Modal, Input } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [visible, setVisible] = useState(false);
    const [privateKey, setPrivateKey] = useState('');
    const [nav, setNav] = useState(false)
    const navigate = useNavigate();

    const handleCancel = () => {
        setVisible(false);
    }
    const handleOk = async () => {
      try{
        console.log(privateKey)
        const wallet = await axios.get(`http://localhost:8000/import_wallet?privateKey=${privateKey}`);
        console.log(wallet)
        localStorage.setItem('wallet', wallet.data)
        setVisible(false)
        setNav(true)
      } catch(e) {
        console.log(e)
      }
    }

    const importWallet = () => {
        setVisible(true);
    }

    const createWallet = async() => {
        const wallet = await axios.get('http://localhost:8000/create_wallet')
        localStorage.setItem('wallet', wallet.data)
        setNav(true)
    }

    React.useEffect(()=>{
      if(localStorage.getItem('wallet')) {
        navigate('/dashboard', { replace: true })
        window.location.reload()
        window.location.href = window.location.href
      }
    }, [nav])

  return (
    <div className='login-container'>
      <div className='login-box'>
        <strong><p style={{fontSize: '30px'}}>Sign In to your account</p></strong>
        <Button style={{height: '60px', width: '180px', background: 'rgb(40 72 113)'}} className='import-button' onClick={importWallet} type="primary">Import Wallet</Button>
        <Button style={{height: '60px', width: '180px', background: 'rgb(40 72 113)'}} className='create-button' onClick={createWallet} type="primary">Create Wallet</Button>
      </div>
      <Modal
            title="Enter Private Key"
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Input value={privateKey} onChange={(e) => setPrivateKey(e.target.value)} placeholder="Enter private key" />
        </Modal>
    </div>
  )
}

export default Home
// radial-gradient(circle, #222222 0%, rgba(23, 23, 23, 1) 75%);