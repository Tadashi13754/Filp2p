import React, { useState } from 'react'
import './topbar.css'
import axios from 'axios'
import { Modal, Button, notification } from 'antd'
import { InputNumber } from "antd"

const TopBar = () => {
  const [marketAdd, setMarketAdd] = useState(0);
  const [visible, setVisible] = useState(false);
  const [marketVisible, setMarketVisible] = useState(false);
  const wallet = localStorage.getItem('wallet');
  const [walletDetails, setWalletDetails] = useState(null)
  const [privateKey, setPrivateKey] = useState(null)
  const truncatedWallet = wallet.length > 10 ? wallet.slice(0, 10) + '...' : wallet;
  const users = ['t017840 - USA']

  const [api, contextHolder] = notification.useNotification()
  const openNotification = (message) => {
    api.open({
      message: message,
      duration: 2,
    });
  };

  const handleCancelMarket = () => {
    setMarketVisible(false);
  }
  const handleOkMarket = async () => {
    setMarketVisible(false);
  }

  const handleCancel = () => {
    setVisible(false);
  }
  const handleOk = async () => {
    setVisible(false);
  }

  const addToMarket = async() =>{
    const fund = await axios.get(
      `http://localhost:8000/add_funds_to_market?amount=${marketAdd}`
    )
    openNotification("Added funds to market")
  }

  const exportWallet = async() =>{
    const privateK = await axios.get(
      `http://localhost:8000/export_wallet?publicKey=${walletDetails.address}`
    )
    setPrivateKey(privateK.data)
  }

  const getBalance = async() =>{
    const walletInfo = await axios.get(
      `http://localhost:8000/list_wallet`
    )
    setWalletDetails(walletInfo.data)
  }
  React.useEffect(()=>{
    getBalance()
  }, [])

  return (
    <div className='top-bar'>
      {contextHolder}
      <span onClick={()=>setMarketVisible(true)}>Market</span>&nbsp;&nbsp;&nbsp;&nbsp;
      <span onClick={()=>setVisible(true)}>{truncatedWallet}</span>&nbsp;&nbsp;&nbsp;&nbsp;
      <select style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', paddingRight: '10px' }}>
        {users.map(user => (
          <option key={user} value={user}>{user}</option>
        ))}
      </select>
      <Modal
          title="Profile"
          open={visible}
          onOk={handleOk}
          onCancel={handleCancel}
      >
        <div className='profile-modal'>
          {walletDetails?
          <>
            <span>Wallet:&nbsp;{walletDetails.address}</span><br/>
            <span>Wallet Balance:&nbsp;{walletDetails.balance}&nbsp;FIL</span>
            <br/><br/>
            {privateKey?<span>PrivateKey: {privateKey}</span>:null}
            <br/><br/>
            <Button type='primary'>Recharge using Fiat</Button>&nbsp;&nbsp;
            <Button type='primary' onClick={()=>{exportWallet()}}>Show Private Key</Button>
          </>
          :<></>
          }
        </div>
      </Modal>

      <Modal
          title="Market"
          open={marketVisible}
          onOk={handleOkMarket}
          onCancel={handleCancelMarket}
      >
        <div className='profile-modal'>
          {walletDetails?
          <>
            <span>Wallet:&nbsp;{walletDetails.address}</span><br/>
            <span>Wallet Balance:&nbsp;{walletDetails.balance}&nbsp;FIL</span><br/>
            <span>Market Available:&nbsp;{walletDetails.marketAvailable}&nbsp;FIL</span><br/>
            <span>Market Locked:&nbsp;{walletDetails.marketLocked}&nbsp;FIL</span>
            <br/><br/>
            <a href="https://faucet.calibnet.chainsafe-fil.io/" target='_'>Get testnet Tokens</a>
            <br/><br/>
            <span>Add funds to market</span>&nbsp;&nbsp;
            <InputNumber min={1} max={parseInt(walletDetails.balance)} onChange={(val)=>{setMarketAdd(val)}} />&nbsp;&nbsp;
            <Button type='primary' onClick={()=>{addToMarket()}}>Add</Button>
          </>
          :<></>
          }
        </div>
      </Modal>
    </div>
  )
}

export default TopBar
