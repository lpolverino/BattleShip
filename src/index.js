import uiRender  from "./uiRender"
import createGame  from "./game"
import mocks from "./mocks"



(async function createApp(){

    let game
    let ui = uiRender(mocks.boats)
    let started = false
    let shipPlased = 0

    function drag(ev) {
        ev.dataTransfer.setData("position", ev.target.dataset.position);
        ev.dataTransfer.setData("size", ev.target.dataset.size);
    }
    
    function drop(ev) {
        ev.preventDefault();

        var data = {
            direction: ev.dataTransfer.getData("position"),
            size: Number(ev.dataTransfer.getData("size")),
            column:ev.target.dataset.column,
            row:Number(ev.target.dataset.row)
        }

        shipPlased ++
        if(shipPlased === 4) ui.renderStart(startGame)
        return data
    }

    function shipPressed(ev) {
        ev.preventDefault();
        ev.target.dataset.position = ev.target.dataset.position === "H" ? "V" : "H"
    }


    const dropHandler = (ev) => {
       if(!started) {
        const { direction, size, column, row } = drop(ev)
        //patched
        game.addShip(direction, size, column, row -1);
        ui.renderPlayer()
        }
    }

    const replyHandler = () =>{
        game = createGame(mocks.createGamboardMock(), mocks.createGamboardMock() )
        ui.intialize(game.iterateMap, attackHandler, drag, drop, shipPressed)
        startGame()
    }

    const evaluateIfGameOver = () =>{
        if(game.hasWinner()){
            endGame()
            ui.renderGameOver(game.winner() === 0 ? "Player" : "Computer", replyHandler)
            return true
        }
        
        return false
    }

    const startGame = () =>{
        started = true
    }

    const endGame = () =>{
        started = false
    }
    

    const attackHandler = (column, row) =>{

        if(!started) return
        try{
            console.log("player attack column: " + column +" row: " + row);
            game.playTurn(column,row)
        } catch(e){
            console.log(e);
        }

        if (!evaluateIfGameOver() ) {

            ui.renderPlayer()

            const computerPlay = game.getComputerPlay()

            console.log("IA attack column: " + computerPlay.column +" row: " + computerPlay.row);
            game.playTurn(computerPlay.column, computerPlay.row)
        
            if(!evaluateIfGameOver()) ui.renderEnemy()
        }
        
    }

    //game = createGame(mocks.createGamboardMock(), mocks.createGamboardMock() )

    game = createGame([], mocks.createGamboardMock())
    ui.intialize(game.iterateMap, attackHandler, drag, dropHandler, shipPressed)

})();


