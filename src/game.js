import  createPlayer  from "./player"
import  createGameboard  from "./gameboard"

const populateGameboard = (gameboardObj, gameboardPositions) =>{

    gameboardPositions.forEach((position) =>{
        if(position.direction === "Horizontal" || position.direction === 1){
            gameboardObj.deployHorizontalShip(position.size, position.column, position.row)
        }else{
            gameboardObj.deployVerticalShip(position.size, position.column, position.row)
        }
    })
}

const createTurns = () =>{

    let current = 0

    const currentTurn = () =>{
        return current +1
    }

    const pass = () =>{
        current = (current + 1) % 2 
    }

    return {
        currentTurn,
        pass
    }
}



export default function  createGame(gameboardPlayer, gameboardComputer){
    let turns = createTurns()
    let player = {
        gameboard: createGameboard(),
        player: createPlayer()
    }
    let computer = {
        gameboard:createGameboard(),
        player: createPlayer(),
        shots:0
    }

    populateGameboard(player.gameboard, gameboardPlayer)
    populateGameboard(computer.gameboard, gameboardComputer)
    
    const addShip = (direction, size, column, row) =>{
        populateGameboard(player.gameboard, [{
            direction: direction === "H" ? 1 : 2,
            size,
            column,
            row
        }])
    }

    const hasWinner = () =>{
        return player.gameboard.wippedBoard() || computer.gameboard.wippedBoard()
    }

    const winner = () =>{
        if(!hasWinner()) return -1
        return player.gameboard.wippedBoard()? 1 : 0
    }

    const isPlayerTurn = () =>{
        return turns.currentTurn() === 1 
    }

    const playTurn = (column, row) =>{
        if(hasWinner()) throw new Error('Cant play turn if the game  is over')
        if(isPlayerTurn()){
            player.player.attack(column,row);
            computer.gameboard.receiveAttack(column,row)
        }else{
            computer.player.attack(column,row);
            player.gameboard.receiveAttack(column,row)
        }
        turns.pass()
    }

    const gameboards = () =>{
        return {
            player: player.gameboard,
            computer: computer.gameboard,
        }
    }

    const iterateMap = (isPlayer, handler) =>{
        if(isPlayer) return player.gameboard.iterateShipMap(handler)
        return computer.gameboard.iterateMap(handler)
    }

    const getComputerPlay = () =>{

        computer.shots ++
        return {
            column:"a",
            row:computer.shots
        }
    }

    return{
        hasWinner,
        isPlayerTurn,
        playTurn,
        winner,
        gameboards,
        getComputerPlay,
        iterateMap,
        addShip
    }
}
