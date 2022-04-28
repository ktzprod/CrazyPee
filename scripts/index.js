require('dotenv').config();

const storage = require('nft.storage')
const mime = require('mime')
const fs = require('fs')
const path = require('path')

const minter = require('./mint.js')

const API_KEY = process.env.NFT_STORAGE_API_KEY
const store = new storage.NFTStorage({ token: API_KEY })

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

// extension should include the dot, for example '.html'
function changeExtension(file, extension) {
    const basename = path.basename(file, path.extname(file))
    return path.join(path.dirname(file), basename + extension)
}

async function mintFile(filepath, address)
{
    const metadata_filepath = changeExtension(filepath, ".json")
    const data = await fs.promises.readFile(metadata_filepath);
    const image_metadata = JSON.parse(data);

    const image = await fileFromPath(filepath)
    const metadata = await store.store({
        image: image,
        name: "CrazyPee #" + path.parse(filepath).name,
        description: "CrazyPee is all about friendship",
        attributes: image_metadata.traits,
    })

    console.log(metadata)
    console.log('Metadata URI: ', metadata.url)
    minter.mintNFT(address, metadata.url)
}

async function mintFolder(folder, address)
{
    const files = fs.readdirSync(folder)
    for (let i in files) {
        await mintFile(path.join(folder, files[i]), address)
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
            type: 'string'  
        },
        file: {
            describe: 'The file to be mint',
            type: 'string'
        },
        to: {
            describe: 'The wallet adress that receive the NFT',
            default: process.env.PUBLIC_KEY,
            type: 'string'
        }
    },
    // Function for your command
    handler(argv) {
        if (argv.folder) {
            mintFolder(argv.folder, argv.to)
        } else if (argv.file) {
            mintFile(argv.file, argv.to)
        }
    }
})
.help()

yargs.parse()