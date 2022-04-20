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
      }
   },
}