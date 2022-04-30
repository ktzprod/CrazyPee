/**
* @type import('hardhat/config').HardhatUserConfig
*/
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
const { DAPP_API_URL, PRIVATE_KEY } = process.env;
module.exports = {
   solidity: "0.8.1",
   defaultNetwork: "ropsten",
   networks: {
      hardhat: {},
      ropsten: {
         url: DAPP_API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      },
      matic: {
         url: "https://polygon-mainnet.g.alchemy.com/v2/jKOnQGycw5aO268DyCBZgLMuA9jJglwz",
         accounts: [`0x${PRIVATE_KEY}`],
         gasPrice: 35000000000
      },
      matic_testnet: {
         url: "https://polygon-mumbai.g.alchemy.com/v2/rAh-1vqsGZCfsfPXChYKCRW2zMGleucf",
         accounts: [`0x${PRIVATE_KEY}`],
         gasPrice: 10000000000
      }
   },
}