import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import Transactions from './Transactions';
// import NFTs from './NFTs.js'
import Balances from './Balances.js'
import { Wallet } from 'ethers';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });

  return <div className="container">
            <div className="App">
              <h3 className="text-center bg-dark text-white">Block Number: {blockNumber}</h3>
              <div className="row">
                <div className="col-2 bg-primary-subtle">
                <Transactions/>
                </div>
                <div className="col-4 bg-secondary-subtle" id="txDetails">

                </div>
                {/* <div className="col bg-secondary-subtle">
                <Balances/>
                </div>
                <div className="col bg-info-subtle">
                <NFTs/>
                </div> */}

              <div className="col-6 bg-secondary-subtle" id="txDetails">
                <Balances/>
              </div>
              </div>

            </div>

          
               
        </div>
}

export default App;
