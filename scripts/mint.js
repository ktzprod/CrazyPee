require('dotenv').config({path: __dirname+"/../.env"});
const contract = require("../contracts/artifacts/CrazyPee.json")
const crazyPee = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS)

async function mintNFT(owner, tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: crazyPee.methods.mintNFT(owner, tokenURI).encodeABI(),
  }

  web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
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