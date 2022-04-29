require('dotenv').config();

const trx = require('./transaction.js')
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const contract = require("../artifacts/contracts/CrazyPee.sol/CrazyPee.json")

const web3 = createAlchemyWeb3(process.env.DAPP_API_URL)
const crazyPee = new web3.eth.Contract(contract.abi, process.env.CONTRACT_ADDRESS)

async function mintNFT(owner, tokenURI) {
    await trx.sendTransaction(crazyPee.methods.mintNFT(owner, tokenURI).encodeABI())
}

module.exports = {
    mintNFT,
}