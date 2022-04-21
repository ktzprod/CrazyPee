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
      matic_testnet: {
         url: "https://polygon-mumbai.g.alchemy.com/v2/dn_rcbqKHR2gaTtxg9cUJS27DCQEGnLW",
         accounts: [`0x${PRIVATE_KEY}`],
         gasPrice: 8000000000
      }
   },
}