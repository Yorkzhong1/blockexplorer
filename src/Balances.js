import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { utils } from "ethers";



// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function Balances() {
  const [address, setAddress] = useState('');
  const [tokenBalances, setTokenBalances] = useState([]);

  const handleChange = (event) => {
    setAddress(event.target.value);
  };

  const search=async ()=>{
    console.log(address)
    try {
      // Fetch ERC-20 token balances
      const result = await alchemy.core.getTokenBalances(address);
      
      setTokenBalances(result.tokenBalances)
      
      console.log(tokenBalances)
    } catch (error) {
      console.error('Error fetching token balances:', error);
    }
  }
  

  return <div className="App">
    <h3>Wallet coints</h3>
    
      <div class="input-group mb-3">
        <input  type="text" value={address} placeHolder="0x..." onChange={handleChange} />
        <button className="btn btn-primary" type="button" id="button-addon2" onClick={search}>Search</button>
      </div>

      <div>
      <h2>ERC-20 Token Balances</h2>
      <ul>
        {tokenBalances.length > 0 ? (
          tokenBalances.map((token) => (
            <li key={token.contractAddress}>
              <strong>{token.tokenSymbol || 'Unknown Token'}</strong>: {(token.tokenBalance)} {token.tokenSymbol || 'Tokens'}
            </li>
          ))
        ) : (
          <li>No tokens found</li>
        )}
      </ul>
    </div>
      
    </div>;
}

export default Balances;
