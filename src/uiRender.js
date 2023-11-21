import contents from './contents'


export default function uiRender () {

    let playerDiv = document.getElementById("player");
    let enemyDiv = document.getElementById("enemy")

    const intialize = (gameboards, attackHandler) =>{
        
        const playerGameboard = contents.createComputerGameboard(gameboards.player, attackHandler)
        const enemyGameboard = contents.createPlayeGameboard(gameboards.computer)
        
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