import  createShip  from "./ship"

const createGameboard = () =>{

    const createEmptyRow = () =>  new Array(10).fill({ocupied:false, receivedAttack:false})          
    
    const createColumns = () => ["a","b","c","d","e","f","g","h","i","j"]

    const createEmptyBoard = () =>{
        let result = {}

        createColumns().forEach((column) =>{
            result[column] = createEmptyRow()
        });

        return result
    }

    let map = createEmptyBoard()
    let wipped = false

    const hasShip  = (column, row) =>{
        return map[column][row].ocupied
    }

    const insertShip = (length, insertHandler) =>{
        let i = 0
        while(i < length){
            insertHandler(i)
            i++
        }
    }

    const createOcupiedSpot = (ship) => {return {
            ocupied: true,
            ship: ship
        }
    }

    const assertCanPlaceShip = (length, columnToPlace, index) =>{
        checkInvalidPosition(columnToPlace, index + length -1)
    }

    const deployShip = (length, column, indexToIterate, deplotHandler) =>{

        assertCanPlaceShip(length, column, indexToIterate)
        const ship = createShip(length)
        insertShip(length, (i) => deplotHandler(i,ship))
    }

    const deployHorizontalShip = (length, column, row) =>{

        deployShip(length, column, row, (i,ship) =>{
            map[column][row+i] = createOcupiedSpot(ship)
        })
    }

    const deployVerticalShip = (length, column, row) =>{
        const colums = createColumns()
        let indexColumn = colums.indexOf(column)

        deployShip(length, column, indexColumn, (i,ship) =>{
            map[colums[indexColumn + i]][row] = createOcupiedSpot(ship)
        })
    }

    const checkInvalidPosition = (column, position) => {
        if(!map.hasOwnProperty(column) || position > 9) throw new Error('invalid cordinate')
 
    }

    const allSunked = () => {
        let result = true
        const retrieve = (position) => { 
            if(position.ocupied) {
                return position.ship.isSunked()
            } else {
                return true
            }
        }

        for(const column in map){
            result = result && map[column].every(retrieve)
        }

        return result
    }

    const receiveAttack = (column, row) => {
        checkInvalidPosition(column, row)
        if(map[column][row].ocupied){
            map[column][row].ship.hit()
            if (map[column][row].ship.isSunked() && allSunked()) wipped = true
        }
        map[column][row].receivedAttack = true
    }

    const hasBeenAtacked = (column, row) => {
        checkInvalidPosition(column, row)
        return map[column][row].receivedAttack
    }

    const wippedBoard = () =>{
        return wipped
    }

    const iterateMap = (handler) =>{
        for(const column in map){
            map[column].forEach((currentValue, rowIndex) =>{
                handler(column, rowIndex, {
                    shot: currentValue.receivedAttack ,
                    ship: currentValue.receivedAttack ? hasShip(column, rowIndex) : false
                })
            })
            
        }

    }

    const iterateShipMap = (handler) =>{
        for(const column in map){
            map[column].forEach((currentValue, rowIndex) =>{
                handler(column, rowIndex, {
                    ship: currentValue.ocupied,
                    shot: currentValue.receivedAttack
                })
            })
        }
    }

    return {
        hasShip,
        deployHorizontalShip,
        deployVerticalShip,
        receiveAttack,
        hasBeenAtacked,
        wippedBoard,
        iterateMap,
        iterateShipMap
    }
}


export default createGameboard
