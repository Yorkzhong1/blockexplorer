import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';



// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


const alchemy = new Alchemy(settings);

function Transactions() {
  const [transactions,setTransactions]=useState([])

  useEffect(() => {
    async function getTransactions() {
      let blockNumber= await alchemy.core.getBlockNumber();
      let block = await alchemy.core.getBlockWithTransactions(blockNumber)
      let txs = []
      block.transactions.forEach((tx)=>{
        txs.push(tx)
      })
      setTransactions(txs)
    }

    getTransactions();
  },[]);

  async function showTx(tx){
    console.log(tx.hash)
    let txDetails = document.getElementById('txDetails')
    txDetails.innerHTML=`
        <div>
        <p>Tx Hash: </p>${tx.hash}
        <p>Tx Value: </p>${tx.value}
        </div>
    `
  }

  return <div className="App">Transactions:
        <ul style={{ listStyleType: 'none', padding: 0 }}>
            {
                transactions.map((tx,index)=>{
                    return <li key={index}>
                        <button type="button" className="btn btn-primary mt-1" onClick={() => showTx(tx)}>{tx.hash.slice(0,10)}......{tx.hash.slice(-10)}}</button>
                        </li>
                })
            }
        </ul>
  </div>;

}

export default Transactions;
