const createPlayer = () =>{

    const attackedPosition = []

    const attack = (column, row) =>{
        if(! hasAttacked(column, row)){
            attackedPosition.push({
                column,
                row
            })
        }else{
            throw new Error('Already shooted in that position')
        }
        
    }

    const hasAttacked = (column, row) => {
        if( attackedPosition.some( position =>
                position.column === column && position.row === row)){
                    return true
                } 
        return false
    }

    return{
        attack,
        hasAttacked
    }
}

export default createPlayer
