const { io } = require('socket.io-client');
const Block = require('./Block')
const ProofOfWork = require('./ProofOfWork')

class Blockchain{
    constructor(io){
        this.chain = [this.startGenesisBlock()];
        this.difficulty = 5;
        this.nodes= [];
        this.io = io;
    }

    startGenesisBlock(){
        let block = new Block("Initial Block in the Chain")
        block.timestamp = 123456789123
        return block
    }
    
    getLatestBlock(){        
        return this.chain[this.chain.length - 1]        
    }

    blockMined(block){
        this.chain.push(block)
        this.io.emit('blockmined', this.chain)
    }

    async addNewBlock(newblock){
        console.log(newblock)
        newblock.precedinghash = this.getLatestBlock().hash;
        newblock.index = this.getLatestBlock().index + 1
        console.log(newblock)
        process.env.BREAK = false;
        const {block, StopMine} = await ProofOfWork(newblock, this.difficulty)
        console.log(block)
        if( StopMine !== 'true'){
            this.blockMined(block)
        }        
    }

    editHash(indice,newhash){
        this.chain[indice].hash = newhash
    }

    checkChainValidity(){        
        for(let i = 1; i < this.chain.length ;i++){     
            const currentBlock = this.chain[i]
            const precedingBlock = this.chain[i-1] 

            if(currentBlock.precedinghash != precedingBlock.hash){
                console.log("CheckChainValidity ERROR !");
                this.reBuildAllHashs(i-1);
                return
            }
        }
        console.log("CheckChainValidity OK !")
    }

    reBuildAllHashs(indice){
       console.log("toz au block n°" + indice)
    }

    addNewNode(node){
        this.nodes.push(node)
    }

}

module.exports = Blockchain