require('dotenv').config();

const trx = require('./transaction.js')
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const contract = require("../artifacts/contracts/CrazyPee.sol/CrazyPee.json")

const web3 = createAlchemyWeb3(process.env.DAPP_API_URL)
const crazyPee = new web3.eth.Contract(contract.abi, process.env.CONTRACT_ADDRESS)

async function burnNFT(owner, tokenID) {
    try{
        const real_owner = await crazyPee.methods.ownerOf(tokenID).call()
        if (real_owner != owner) {
            return
        }

        await trx.sendTransaction(crazyPee.methods.safeTransferFrom(owner, "0x000000000000000000000000000000000000dEaD", tokenID).encodeABI())
    } catch {
        console.log("Failed to burn tokenID: ", tokenID)
    }

    setTimeout(function(){}, 2000)
}

module.exports = {
    burnNFT,
}