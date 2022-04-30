require('dotenv').config();

const { ethers } = require('hardhat');
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(process.env.DAPP_API_URL)
const contract = require("../artifacts/contracts/CrazyPee.sol/CrazyPee.json")
const crazyPee = new web3.eth.Contract(contract.abi, process.env.CONTRACT_ADDRESS)
var currentNonce = null;

async function sendTransaction(data) {
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
        data: data,
    }

    tx.gas = await web3.eth.estimateGas(tx)

    var signedTx = await web3.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY, function(err, signedTx) {
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

    const receipt = await ethers.provider.waitForTransaction(signedTx.transactionHash)
    console.log(receipt)
}

async function mintNFT(owner, tokenURI) {
    await sendTransaction(crazyPee.methods.mintNFT(owner, tokenURI).encodeABI())
}

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
    mintNFT,
    burnNFT
}