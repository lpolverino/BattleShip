
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

const createEmptyBoard = (gameboard) =>{
    
    const fillHanlder = () =>{

    }
    
    const gameboardDiv = document.createElement("div")
    gameboardDiv.classList.add("gameboard")

    const gameboardEl = createBoard()
    
    gameboardDiv.appendChild(gameboardEl)
    
    return gameboardDiv 
}

const fillBoard = (gameboard, fillHandler) =>{
    gameboard.iterateMap(fillHandler)
    return
} 

const addEventToBoard = (eventHandler, board) =>{
    return
}

const createComputerGameboard = (gameboard, attackHandler) =>{

    const board = createEmptyBoard(gameboard)
    addEventToBoard(attackHandler, board)

    return board
}

const createPlayeGameboard = (gameboard) =>{
    return createEmptyBoard(gameboard)
    
}

export default {
    createComputerGameboard,
    createPlayeGameboard
}