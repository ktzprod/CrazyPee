async function main() {
    const CrazyPee = await ethers.getContractFactory("CrazyPee")
  
    // Start deployment, returning a promise that resolves to a contract object
    const crazyPeeContract = await CrazyPee.deploy()
    await crazyPeeContract.deployed()
    console.log("Contract deployed to address:", crazyPeeContract.address)
    const txHash = crazyPeeContract.deployTransaction.hash
    const txReceipt = await ethers.provider.waitForTransaction(txHash)
    const contractAddress = txReceipt.contractAddress
    console.log("Contract deployed to address:", contractAddress)
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})