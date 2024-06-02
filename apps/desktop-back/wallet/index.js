const { execute } = require("../utils");

exports.export_wallet = async(publicKey) =>{
  const data = await execute(`./boost wallet export ${publicKey}`)
  return data.trim()
}

const filterWallet = async() => {
  const data = await execute(`./boost wallet list`);
  const split = data.split('\n')
  let wallet = []
  for(let i=1; i<split.length-1; i++) {
    const further_split = split[i].split(' ')
    let temp = {
      address: further_split[0],
      balance: '',
      dataCap: '',
      market: '',
      default: ''
    }
    for(let j=1; j<further_split.length; j++) {
      if(further_split[j]!=='') {
        temp.balance = further_split[j]
        break
      }
    }

    let count = 0
    for(let j=further_split.length-1; j>0; j--) {
      if(further_split[j]!=='') {
        if(count===0){
          temp.dataCap = further_split[j]
          count++
        }
        if(count===1) {
          if(further_split[j]==='X') {
            temp.default = true
          }
        }
      }
    }
    wallet.push(temp)
  }
  for(let i=0; i< wallet.length; i++) {
    if(!wallet[i].default) {
      const remove = await execute(`./boost wallet delete ${wallet[i].address}`);
    }
  }
}

exports.create_wallet = async() =>{
    const wallet = (await execute(`./boost wallet new`)).trim()
    const setDefault = await execute(`./boost wallet set-default ${wallet}`)
    await filterWallet()
    return wallet
}

exports.import_wallet = async(privateKey) =>{
  try{
    const _ = await execute(`./boost init`)
    const data = await execute(`echo ${privateKey} | ./boost wallet import`)
    const dataFilter = data.trim().split(' ')
    const publicKey = dataFilter[dataFilter.length - 2].trim()
    console.log(publicKey)
    const setDefault = await execute(`./boost wallet set-default ${publicKey}`)
    await filterWallet()
    console.log(publicKey)
    return publicKey
  } catch(e) {
    console.log(e)
  }
}

exports.delete_wallet = async(address) =>{
    const data = await execute(`./boost wallet delete ${address}`)
    return data.trim()
}

exports.getWalletBalance = async() =>{
    const data = await execute(`./boost wallet list`);
    const split = data.split('\n')
    let wallet = []
    for(let i=1; i<split.length-1; i++) {
      const further_split = split[i].split(' ')
      let temp = {
        address: further_split[0],
        balance: '',
        dataCap: '',
        marketAvailable: '',
        marketLocked: '',
        default: ''
      }
      for(let j=1; j<further_split.length; j++) {
        if(further_split[j]!=='') {
          temp.balance = further_split[j]
          if(parseInt(temp.balance)>0) {
            for(let k=j+2; k<further_split.length; k++) {
              if(further_split[k]!=='') {
                temp.marketAvailable = further_split[k]
                for(let l=k+2; l<further_split.length; l++) {
                  if(further_split[l]!=='') {
                    temp.marketLocked = further_split[l]
                    break
                  }
                }
                break
              }
            }
          }
          break
        }
      }
  
      let count = 0
      for(let j=further_split.length-1; j>0; j--) {
        if(further_split[j]!=='') {
          if(count===0){
            temp.dataCap = further_split[j]
            count++
          }
          if(count===1) {
            if(further_split[j]==='X') {
              temp.default = true
            }
          }
        }
      }
      wallet.push(temp)
    }
    return(wallet)
}

