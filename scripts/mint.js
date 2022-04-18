require('dotenv').config({path: __dirname+"/.."});
const web3 = require('web3');
const web3Provider = new web3()
const contract = require("../contracts/artifacts/CrazyPee.json")
const crazyPee = new web3Provider.eth.Contract(contract.abi, process.env.CONTRACT_ADDRESS)

async function mintNFT(owner, tokenURI) {
    const nonce = await web3Provider.eth.getTransactionCount(process.env.PUBLIC_KEY, "latest") //get latest nonce

    //the transaction
    const tx = {
        from: process.env.PUBLIC_KEY,
        to: contractAddress,
        nonce: nonce,
        gas: 500000,
        data: crazyPee.methods.mintNFT(owner, tokenURI).encodeABI(),
    }

    web3Provider.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY)
        .then((signedTx) => {
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function (err, hash) {
                if (!err) {
                    console.log(
                    "The hash of your transaction is: ",
                    hash,
                    "\nCheck etherscan for the status of your transaction!"
                    )
                } else {
                    console.log(
                    "Something went wrong when submitting your transaction:",
                    err
                    )
                }
                }
            )
        })
        .catch((err) => {
            console.log("Promise failed: ", err)
        })
}

module.exports = {
    mintNFT,
}