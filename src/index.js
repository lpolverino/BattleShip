import  uiRender  from "./uiRender"
import  createGame  from "./game"
import mocks from "./mocks"


(async function createApp(){

    let game
    let ui = uiRender()

    const replyHandler = () =>{
        game = createGame(mocks.createGamboardMock(), mocks.createGamboardMock() )
        ui.intialize(game.iterateMap, attackHandler)
    }

    const evaluateIfGameOver = () =>{
        if(game.hasWinner()){
            console.log(game.winner());
            ui.renderGameOver(game.winner() === 0 ? "Player" : "Computer", replyHandler)
            return true
        }
        
        return false
    }
    

    const attackHandler = (column, row) =>{

        try{
            game.playTurn(column,row)
        } catch(e){
            console.log(e);
        }

        if (!evaluateIfGameOver() ) {

            ui.render()

            const computerPlay = game.getComputerPlay()

            game.playTurn(computerPlay.column, computerPlay.row)
        
            if(!evaluateIfGameOver()) ui.render()
        }
        
    }

    game = createGame(mocks.createGamboardMock(), mocks.createGamboardMock() )

    ui.intialize(game.iterateMap, attackHandler)

})();


