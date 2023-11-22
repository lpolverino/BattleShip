import contents from './contents'


export default function uiRender (boatList) {
 
    let playerDiv = document.getElementById("player");
    let enemyDiv = document.getElementById("enemy");
    let sideScreen = document.getElementById("drag-section");
    const contentBody = document.getElementById("content");

    let attackHandler 
    let iterFunction

    const intialize = (gameIteareFunction, gameAttackHandler, dragHandler, dropHandler, clickHandler) =>{
        
        attackHandler = gameAttackHandler
        iterFunction = gameIteareFunction

        cleanScreen();

        const playerGameboard = contents.createComputerGameboard(iterFunction, attackHandler);
        const enemyGameboard = contents.createPlayeGameboard(iterFunction, dropHandler);
        const ships = contents.createShips(dragHandler,clickHandler, boatList);


        playerDiv.appendChild(playerGameboard);
        enemyDiv.appendChild(enemyGameboard);
        sideScreen.appendChild(ships);
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
        clearDiv(sideScreen)
        clearMessages()
        clearButtons()
    }

    const renderPlayer = () =>{
        contents.fillBoard("player",
            (column, row, state) =>{
                contents.fillCell("player", column, row, state)
            },
            iterFunction
        );
    }

    const renderEnemy = () =>{
        contents.fillBoard("enemy",
            (column, row, state) =>{
                contents.fillCell("enemy", column, row, state)
            },
            iterFunction
        );
    }

    const renderGameOver = (gameWinner, replyHandler) =>{       
        cleanScreen()
        const message = contents.createMessage("Game Over: " + gameWinner + " Wins!")
        const id = "btn-reply"
        const button = contents.createButton(replyHandler, id)

        contentBody.appendChild(message)
        contentBody.appendChild(button)
    }

    const renderStart = (startHandler) =>{
        const id = "btn-start"
        const button = contents.createButton(startHandler, id)

        sideScreen.appendChild(button)
    }
    
    return{
        intialize,
        renderEnemy,
        renderPlayer,
        renderGameOver,
        renderStart
    }
}