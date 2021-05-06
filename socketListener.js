const { io } = require('socket.io-client')
const Block = require('./Block')
const Blockchain = require('./Blockchain')

const socketListener = (socket, chain) => {
    socket.on('mine', (sender, receiver, qty) => {
        let block = new Block({sender,receiver,qty})
        chain.addNewBlock(block)
        console.info(`Block number ${block.index} just mined`)
    })

    socket.on('blockmined', (newChain) => {                
        process.env.BREAK = true;
        Blockchain.chain = newChain
        console.info(`BLockchain synchronized`)
    })

    return socket   
}

module.exports = socketListener