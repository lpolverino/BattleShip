import  uiRender  from "./uiRender"
import  createGame  from "./game"



(async function createApp(){

    const evaluateIfGameOver = () =>{
        if(game.hasWinner()){
            ui.renderGameOver(game.winner())
            return true
        }
        
        return false
    }
    

    const attackHandler = (column, row) =>{
        
        try{
            game.playTurn(column,row)
        } catch(e){
            //if(e.message === already played) ui.renderMessage("already Played")
            // return
        }

        if (!evaluateIfGameOver() ) {

            ui.render(game.gameboards())

            const computerPlay = game.getComputerPlay()  

            game.playTurn(computerPlay.column, computerPlay.row)
        
            if(!evaluateIfGameOver()) ui.render(game.gameboards())
        }
        
    }

    let game = createGame([], [])

    let ui = uiRender()

    ui.intialize(game.gameboards(), attackHandler)

})();


