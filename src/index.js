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
            console.log(column +"-" +row);
            game.playTurn(column,row)
        } catch(e){
            console.log(e);
        }

        if (!evaluateIfGameOver() ) {


            ui.render()

            const computerPlay = game.getComputerPlay()

            //game.playTurn(computerPlay.column, computerPlay.row)
        
            if(!evaluateIfGameOver()) ui.render()
        }
        
    }

    let game = createGame([], [])

    let ui = uiRender()

    ui.intialize(game.iterateMap, attackHandler)

})();


