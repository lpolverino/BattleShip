
const createShip = (shipLength) =>{
    
    if(shipLength < 1 || shipLength > 4) {
        throw new Error ('Invalid length provided')
    }
    const size = shipLength
    let timesHitted = 0

    const length = () =>{
        return size
    }

    const isSunked = () => {
        return size === timesHitted
    }

    const hit = () =>{
        timesHitted ++
    }

    return{
        length,
        isSunked,
        hit
    }
}

module.exports = {
    createShip
}