
const tableFirstRow = (letters) => {
    const row = document.createElement("tr");

    letters.forEach((letter) =>{
        const letterCell = document.createElement("td");
        letterCell.innerText = letter
        row.appendChild(letterCell)
    })

    return row
}

const createCell = (column, row) =>{
    const cell = document.createElement("td")
    cell.dataset.column = column
    cell.dataset.row = row

    cell.classList.add (column +"-"+ row)

    if(column === "#"){
        cell.innerText = row 
    } else{
        cell.innerText = "-"
    }

    return cell
}

const createTableRow = (number, letter, size) =>{

    const row = document.createElement("tr")

    for(let i = 0; i < size; i++){
        const cell = createCell(letter[i], number)
        row.appendChild(cell)
    }

    return row
}

const createBoard = () =>{
    const table = document.createElement("table")

    const letters = ["#","a","b","c","d","e","f","g","h","i","j"]

    const firstRow = tableFirstRow(letters)
    table.appendChild(firstRow)

    for(let i = 1 ; i <= 10; i++){
        const row = createTableRow(i, letters, 11)

        table.appendChild(row)
    }

    return table
}

const evaulateValor = (player, state) =>{

    if(player === "player"){
        if(state.ship){
            return state.shot ? "hit" : "ship"
        } else{
            return "water"
        }
    }else{
        if(state.ship){
            return state.shot ? "hit" : "water"
        } else{
            return "water"
        }
    }
}

 //super fragile
const fillCell = (player, column, row, state) =>{
   
    const rowIndex = row + 1

    const cellIndex = column + "-" + rowIndex
    let cell

    if(player === "player"){
        cell = document.getElementsByClassName(cellIndex)[1]
       
    }else{
        cell = document.getElementsByClassName(cellIndex)[0]
    }

    cell.classList.add( evaulateValor(player, state))

}   

const createEmptyBoard = ( player, gameIteareFunction) =>{
    
    const fillHanlder = (column, row, state) =>{
        fillCell(player, column, row, state)
    }
    
    const gameboardDiv = document.createElement("div")
    gameboardDiv.classList.add("gameboard")

    const gameboardEl = createBoard()
    
    //the dom dosent load at this point, so fill board is super fragile need to run before DOM loading
    setTimeout( () => fillBoard(player, fillHanlder, gameIteareFunction) ,0) 

    gameboardDiv.appendChild(gameboardEl)
    
    return gameboardDiv 
}

const fillBoard = (player, fillHandler, gameIteareFunction) =>{
    const isPlayer = player === "player" ? true : false
    gameIteareFunction(isPlayer, fillHandler)
    return
} 

const addEventToBoard = (eventHandler, gameIteareFunction, isPerson = false) =>{
    gameIteareFunction(isPerson, eventHandler)
    return
}

const createComputerGameboard = (gameIteareFunction , attackHandler) =>{

    const board = createEmptyBoard("enemy", gameIteareFunction)

    const addCellEvent = (column, row, state) =>{
        const rowIndex = row + 1
        const cellIndex = column + "-" + rowIndex

        let cell = document.getElementsByClassName(cellIndex)[0];

        cell.addEventListener("click", (e) =>{
            e.preventDefault()
            attackHandler(column, row );
        })
    }

    // again, you can only append the listeners when the cells are in te DOM
    setTimeout(() => { 
        addEventToBoard( addCellEvent , gameIteareFunction)
    , 0 })

    return board
}

const createPlayeGameboard = (gameIteareFunction, dropHandler) =>{
    const playerBoard = createEmptyBoard("player", gameIteareFunction)
    
    const addCellDrop = (column, row, state) =>{

        const rowIndex = row + 1
        const cellIndex = column + "-" + rowIndex

        let cell = document.getElementsByClassName(cellIndex)[1];

        cell.ondragover =  function (e) {
            e.preventDefault()
        }

        cell.addEventListener("drop",(e) =>{
            e.preventDefault()
            dropHandler(e)
        })
    }

    setTimeout(() => { 
        addEventToBoard( addCellDrop , gameIteareFunction, true)
    , 0 })


    return playerBoard
}

const createMessage = (message) =>{
    const messageConteiner = document.createElement("div")
    messageConteiner.classList.add("message");

    const messageEl = document.createElement("p");
    messageEl.innerText = message

    messageConteiner.appendChild(messageEl)

    return messageConteiner
}

const createButton = (handler, btnId, text) => {
    const buttonConteiner = document.createElement("div");
    buttonConteiner.id= btnId;

    const buttonEl = document.createElement("button");
    buttonEl.innerText = text
    buttonEl.onclick = handler

    buttonConteiner.appendChild(buttonEl);
    buttonConteiner.classList.add("btn")

    return buttonConteiner
}

const createShip = (ship, dragHandler, clickHandler ) =>{
    const shipEl = document.createElement("div");
    shipEl.dataset.position = ship.position
    shipEl.dataset.size = ship.size
    shipEl.innerText = ship.name + " " + ship.size
    shipEl.id = ship.name

    shipEl.draggable = true
    shipEl.onclick = clickHandler
    shipEl.ondragstart = dragHandler

    return shipEl
}

const createShips = (dragHandler, clickHandler, ships) =>{
    
    const shipsConteiner = document.createElement("div");
    shipsConteiner.id = "ships" 
    
    ships.forEach((ship) => {
        const shipEl = createShip(ship, dragHandler, clickHandler)
        shipsConteiner.appendChild(shipEl)
    })

    return shipsConteiner
}

const createMessegeBoard = () =>{

    const messageBoard = document.createElement("div")
    messageBoard.id= "msg-board"

    return messageBoard
}

const createButtonConteiner = () =>{
    const conteiner = document.createElement("div");
    conteiner.id = "btn-con"

    return conteiner
}

export default {
    createComputerGameboard,
    createPlayeGameboard,
    createMessage,
    createButton,
    fillBoard,
    fillCell,
    createShips,
    createMessegeBoard,
    createButtonConteiner
}