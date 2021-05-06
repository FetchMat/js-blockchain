const sha256 = require('crypto-js/sha256');

class Block {
    constructor(data){
        this.index = 0
        this.timestamp = Date.now()
        this.data = data
        this.precedinghash = "0"
        this.hash = this.computeHash()
        this.nonce = 0
    }

    computeHash(){
        return sha256(this.index + this.precedingHash + this.timestamp + JSON.stringify(this.data)+this.nonce).toString();
    }
}

module.exports = Block