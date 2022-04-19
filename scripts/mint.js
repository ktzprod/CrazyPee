require('dotenv').config();

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(process.env.DAPP_API_URL)
const contract = require("../contracts/artifacts/CrazyPee.json")
const crazyPee = new web3.eth.Contract(contract.abi, process.env.CONTRACT_ADDRESS)
var currentNonce = null;

async function mintNFT(owner, tokenURI) {
    var nonce = await web3.eth.getTransactionCount(process.env.PUBLIC_KEY, "latest") //get latest nonce

    if (!currentNonce) {
        currentNonce = nonce;
    } else if (currentNonce >= nonce) {
        currentNonce += 1;
    } else {
        currentNonce = nonce;
    }

    //the transaction
    const tx = {
        from: process.env.PUBLIC_KEY,
        to: process.env.CONTRACT_ADDRESS,
        nonce: currentNonce,
        gas: web3.utils.toWei("0.1", "ether"),
        data: crazyPee.methods.mintNFT(owner, tokenURI).encodeABI(),
    }

    tx.gas = await web3.eth.estimateGas(tx)

    web3.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY, function(err, signedTx) {q
        if (err) {
            console.log("Promise failed: ", err)
            return
        }

        web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
            function (err, hash) {

                if (err) {
                    console.log("Something went wrong when submitting your transaction:", err)
                    return
                }

                console.log(
                "The hash of your transaction is: ",
                hash,
                "\nCheck etherscan for the status of your transaction!"
                )
            }
        )
    })
}

module.exports = {
    mintNFT,
}