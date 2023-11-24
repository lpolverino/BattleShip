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
        
        const messageBoard = contents.createMessegeBoard()
        const ships = contents.createShips(dragHandler,clickHandler, boatList);
        const buttonConteiner = contents.createButtonConteiner();

        playerDiv.appendChild(playerGameboard);
        enemyDiv.appendChild(enemyGameboard);
        sideScreen.appendChild(messageBoard);
        sideScreen.appendChild(ships);
        sideScreen.appendChild(buttonConteiner)
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
        renderMessage("Game Over: " + gameWinner + " Wins!")
        const id = "btn-reply"
        
        const button = contents.createButton(replyHandler, id, "Reply")
        
        const buttonConteiner = document.getElementById("btn-con")
        buttonConteiner.appendChild(button)
    }

    const renderStart = (startHandler) =>{
        const id = "btn-start"
        const button = contents.createButton(startHandler, id, "Go!")
        //patched
        const buttonConteiner = document.getElementById("btn-con")
        buttonConteiner.appendChild(button)
    }

    const renderMessage = (messege) =>{
        const messgeBoard = document.getElementById("msg-board");
        messgeBoard.innerText = messege
    }
    
    return{
        intialize,
        renderEnemy,
        renderPlayer,
        renderGameOver,
        renderStart,
        renderMessage
    }
}