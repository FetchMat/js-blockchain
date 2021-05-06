const { io } = require('socket.io-client');
const Block = require('./Block')

class Blockchain{
    constructor(io){
        this.chain = [this.startGenesisBlock()];
        this.difficulty = 2;
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

    addNewBlock(newblock){
        newblock.precedinghash = this.getLatestBlock().hash;
        newblock.index = this.getLatestBlock().index + 1
        newblock.proofOfWork(this.difficulty);
        this.chain.push(newblock)
        this.io.emit('blockmined', this.chain)
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