require('dotenv').config();

const storage = require('nft.storage')
const mime = require('mime')
const fs = require('fs')
const path = require('path')

const minter = require('./mint.js')

const API_KEY = process.env.NFT_STORAGE_API_KEY

/**
  * A helper to read a file from a location on disk and return a File object.
  * Note that this reads the entire file into memory and should not be used for
  * very large files. 
  * @param {string} filePath the path to a file to store
  * @returns {File} a File object containing the file content
  */
 async function fileFromPath(filePath) {
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)
    return new storage.File([content], path.basename(filePath), { type })
}

async function main(argv)
{
    const folder = argv.folder
    const files = fs.readdirSync(folder)
    const store = new storage.NFTStorage({ token: API_KEY })

    for (let i in files) {
        const image = await fileFromPath(path.join(folder, files[i]))
        const metadata = await store.store({
            image: image,
            name: "CrazyPee",
            description: "CrazyPee is a promising collection with low budget",
            properties: {
                authors: [{ name: "Camille Hoarau" }],
            }
        })

        console.log('NFT data stored!')
        console.log('Metadata URI: ', metadata.url)
        minter.mintNFT(process.env.PUBLIC_API, metadata.url)
    }
}

const yargs = require('yargs');

// Create add command
yargs.command({
    command: 'mint',
    describe: 'Mint the given folder content',
    builder: {
        folder: {
            describe: 'The folder that contains the images and potential metadata',
            demandOption: true,  // Required
            type: 'string'  
        },
    },
    // Function for your command
    handler(argv) {
        main(argv)
    }
})
.help()

yargs.parse()