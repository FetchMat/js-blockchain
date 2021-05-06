const proofOfWork = (block, difficulty) => new Promise((resolve) => {
    setImmediate(async () => {
        block.hash = block.computeHash();
        const StopMine = process.env.BREAK
        if(block.hash.substring(0, difficulty) == Array(difficulty + 1).join("0") || StopMine === 'true'){
            resolve({block, StopMine})
        } else{
            block.nonce++;
            resolve(await proofOfWork(block, difficulty))
        }
    })
})

module.exports = proofOfWork