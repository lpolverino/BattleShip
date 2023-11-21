import contents from './contents'


export default function uiRender () {

    let playerDiv = document.getElementById("player");
    let enemyDiv = document.getElementById("enemy");

    let attackHandler 
    let iterFunction

    const intialize = (gameIteareFunction, gameAttackHandler) =>{
        
        attackHandler = gameAttackHandler
        iterFunction = gameIteareFunction

        cleanScreen()

        const playerGameboard = contents.createComputerGameboard(iterFunction, attackHandler)
        const enemyGameboard = contents.createPlayeGameboard(iterFunction)
        
        playerDiv.appendChild(playerGameboard)
        enemyDiv.appendChild(enemyGameboard)
    }

    const clearDiv = (divEl) =>{
        while (divEl.firstChild) {
            divEl.removeChild(divEl.lastChild);
        }
    }

    const cleanScreen = () =>{
        clearDiv(playerDiv)
        clearDiv(enemyDiv)
    }

    const render = () =>{

        
        const fillHanlder = (column, row, state) =>{
            contents.fillCell(player, column, row, state)
        }

        contents.fillBoard("player", fillHanlder, iterFunction)

        contents.fillBoard("enemy", fillHanlder, iterFunction)
    }

    const renderGameOver = () =>{
        cleanScreen()
        const message = contents.createMessage("Game Over")

        const contentBody = document.getElementById("content")

        contentBody.appendChild(message)
    }
    
    return{
        intialize,
        render,
        renderGameOver,
    }
}