

const createGamboardMock = () =>{
    return [{
        direction: 1,
        size: 2,
        column: "a",
        row: 1
    }]
}


const boats = [
    {
        name:"Destroyer",
        size:4,
        position:"H"
    },
    {
        name:"AirShip",    
        size:3,
        position:"H"
    },
    {
        name:"Submarine",    
        size:3,
        position:"H"
    },
    {
        name:"Ship",    
        size:2,
        position:"H"
    },
    {
        name:"Boat",    
        size:1,
        position:"H"
    }
]

export default {
    createGamboardMock,
    boats
}