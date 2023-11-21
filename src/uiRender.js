import contents from './contents'


export default function uiRender () {

    let playerDiv = document.getElementById("player");
    let enemyDiv = document.getElementById("enemy");
    const contentBody = document.getElementById("content")


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

    const clearMessages = () =>{
        const messages = document.querySelectorAll('.message');
        messages.forEach((message) => {
            message.remove()
        })
    }

    const clearButtons= () =>{
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach((button) => {
            button.remove()
        })
    }

    const cleanScreen = () =>{
        clearDiv(playerDiv)
        clearDiv(enemyDiv)
        clearMessages()
        clearButtons()
    }

    const render = () =>{

        const fillHanlder = (column, row, state) =>{
            contents.fillCell(player, column, row, state)
        }

        contents.fillBoard("player", fillHanlder, iterFunction)

        contents.fillBoard("enemy", fillHanlder, iterFunction)
    }

    const renderGameOver = (gameWinner, replyHandler) =>{       
        cleanScreen()
        const message = contents.createMessage("Game Over: " + gameWinner + " Wins!")
        const id = "btn-reply"
        const button = contents.createButton(replyHandler, id)

        contentBody.appendChild(message)
        contentBody.appendChild(button)
    }
    
    return{
        intialize,
        render,
        renderGameOver,
    }
}