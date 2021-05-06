const { io } = require('socket.io-client')
const Block = require('./Block')
const Blockchain = require('./Blockchain')

const socketListener = (socket, blockchain) => {

    socket.on('mine', async (sender, receiver, qty) => {
        console.log('ALLO2')
        let block = new Block({sender,receiver,qty})
        console.log('ALLO3')
        await blockchain.addNewBlock(block)
        console.log('ALLOAPRESADDBLOCK')
        console.info(`Block number ${block.index} just mined`)
    })

    socket.on('blockmined', (newChain) => {                
        process.env.BREAK = true;
        blockchain.chain = newChain
        console.info(`BLockchain synchronized`)
    })

    return socket   
}

module.exports = socketListener