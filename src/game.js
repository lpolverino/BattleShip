import { createPlayer } from "./player"
import { createGameboard } from "./gameboard"

const populateGameboard = (gameboardObj, gameboardPositions) =>{

    gameboardPositions.forEach((position) =>{
        if(position.direction === "Horizontal" || position.direction === 1){
            gameboardObj.deployHorizontalShip(position.size, position.column, position.row)
        }else{
            gameboardObj.deployVerticalShip(position.size, position.column, position.row)
        }
    })
}


const createGame = (gameboardPlayer, gameboardComputer) =>{
    let turns = createTurns()
    let player = {
        gameboard: createGameboard(),
        player: createPlayer()
    }
    let computer = {
        gameboard:createGameboard(),
        player: createPlayer()
    }

    populateGameboard(player.gameboard, gameboardPlayer)
    populateGameboard(computer.gameboard, gameboardComputer)
    
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
        if(isPlayerTurn()){
            player.player.attack(column,row);
            computer.gameboard.receiveAttack(column,row)
        }else{
            computer.player.attack(column,row);
            player.gameboard.receiveAttack(column,row)
        }
        turns.pass()
    }

    return{
        hasWinner,
        isPlayerTurn,
        playTurn,
        winner
    }
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

module.exports ={
    createGame
    
}