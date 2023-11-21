import contents from './contents'


export default function uiRender () {

    let playerDiv = document.getElementById("player");
    let enemyDiv = document.getElementById("enemy")

    const intialize = (gameIteareFunction, gameboards, attackHandler) =>{
        
        const playerGameboard = contents.createComputerGameboard(gameIteareFunction, gameboards.player, attackHandler)
        const enemyGameboard = contents.createPlayeGameboard( gameIteareFunction , gameboards.computer)
        
        playerDiv.appendChild(playerGameboard)
        enemyDiv.appendChild(enemyGameboard)

    }

    const render = () =>{

    }

    const renderGameOver = () =>{

    }
    
    return{
        intialize,
        render,
        renderGameOver,
    }
}