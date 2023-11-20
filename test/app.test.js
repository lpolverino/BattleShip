import { createShip } from "../src/ship";
import { createGameboard } from "../src/gameboard"
import { createPlayer } from "../src/player";
import { createGame } from "../src/game";


describe("ship testing", () =>{
    test("a new ship is created correctly", () =>{
        const newShip = createShip(3)
        expect(newShip.length()).toBe(3)
    })

    test("a new ship is not sunked", () =>{
        const newShip = createShip(3)
        expect(newShip.isSunked()).toBeFalsy()
    })

    test("you cannot create a ship with negative size", () =>{
        expect(() => { createShip(-4) }).toThrow(Error)
        expect(() => {createShip(-4)}).toThrow('Invalid length provided')
    })

    test("you cannot create a ship with length superior to 4", () =>{
        expect(() => { createShip(5) }).toThrow(Error)
        expect(() => {createShip(5)}).toThrow('Invalid length provided')
    })

    test("the ship is sunked when hitted maximum times", () =>{
        const newShip = createShip(1)
        newShip.hit()
        expect(newShip.isSunked()).toBeTruthy()
    })

    test("the ship is not sunked when not hitted enough times", () =>{
        const newShip = createShip(2)
        newShip.hit()
        expect(newShip.isSunked()).toBeFalsy()
    })
})

describe("gameboard testing", () =>{

    let gameboard

    beforeEach(() =>{
        gameboard = createGameboard()
    })

    test("the game board is created well", () =>{
        expect(gameboard.hasShip("a",1)).toBeFalsy()
    })

    test("the gameboard deploy correct a horizontal ship", () =>{
        
        gameboard.deployHorizontalShip(2, "a", 1)

        expect(gameboard.hasShip("a",1)).toBeTruthy()
        expect(gameboard.hasShip("a",2)).toBeTruthy()
    })

    test("the gameboard cannot place a horizontal in a invalid column space", () =>{
        expect(() => {gameboard.deployHorizontalShip(2,"z", 1)}).toThrow(Error);
        expect(() => {gameboard.deployHorizontalShip(2,"z", 1)}).toThrow('invalid cordinate');
    })

    test("the gameboard cannot place a overflowing horizontal ship" , () =>{
        expect(() => {gameboard.deployHorizontalShip(2,"a", 9)}).toThrow(Error);
        expect(() => {gameboard.deployHorizontalShip(2,"a", 9)}).toThrow('invalid cordinate');
    })

    test("the gameboard deploy correct a vertical ship" , () =>{
        gameboard.deployVerticalShip(2, "a", 1)

        expect(gameboard.hasShip("a",1)).toBeTruthy()
        expect(gameboard.hasShip("b",1)).toBeTruthy()
    })

    test("the gameboard cannot place a vertical in a ivalid column space", () =>{
        expect(() => {gameboard.deployVerticalShip(2,"z", 1)}).toThrow(Error);
        expect(() => {gameboard.deployVerticalShip(2,"z", 1)}).toThrow('invalid cordinate');
    
    })

    test("the gameboard cannot palce a overflowing vertical ship", () =>{
        expect(() => {gameboard.deployVerticalShip(2,"j", 1)}).toThrow(Error);
        expect(() => {gameboard.deployVerticalShip(2,"j", 1)}).toThrow('invalid cordinate');
    
    })

    test("the gameboard remember if an unocupated cordinate was shoted", () =>{
        gameboard.deployHorizontalShip(2, "a", 1)

        gameboard.receiveAttack("e",1)
        expect(gameboard.hasBeenAtacked("e",1)).toBeTruthy()
    })

    test("cannot attack to an invalid column", () =>{
        
        expect(() => { gameboard.receiveAttack("z",1) }).toThrow(Error)
        expect(() => { gameboard.receiveAttack("z",1) }).toThrow('invalid cordinate')
        
    })

    test("cannot attack to an invalid row", () =>{
        
        expect(() => { gameboard.receiveAttack("a",11) }).toThrow(Error)
        expect(() => { gameboard.receiveAttack("a",11) }).toThrow('invalid cordinate')
        
    })

    test("cannot check if an invalid column was attacked", () =>{
        expect(() => { gameboard.hasBeenAtacked("z",1) }).toThrow(Error)
        expect(() => { gameboard.hasBeenAtacked("z",1) }).toThrow('invalid cordinate')
        
    })

    test("cannot check if an invalid row was attacked", () =>{
        expect(() => { gameboard.hasBeenAtacked("a",11) }).toThrow(Error)
        expect(() => { gameboard.hasBeenAtacked("a",11) }).toThrow('invalid cordinate')
    })

    test("the gameboard remember if an ship was attacked", () =>{
        gameboard.deployHorizontalShip(2, "a", 1)

        gameboard.receiveAttack("a",1)
        expect(gameboard.hasBeenAtacked("a",1)).toBeTruthy()
    })

    test("not hitting a a ship should not altered the gameboard sunked state", () =>{
        
        gameboard.receiveAttack("a",1)
        expect(gameboard.wippedBoard()).toBeFalsy()

    })

    test("hitting the last boat sinkint it should altered the gameboard sunded state", () =>{
        gameboard.deployHorizontalShip(1, "a", 1)

        gameboard.receiveAttack("a",1)
        expect(gameboard.wippedBoard()).toBeTruthy()
    })

    test("hitting the first time a boat should not altered the gameboard sunked status", () =>{
        gameboard.deployHorizontalShip(3, "a", 1)

        gameboard.receiveAttack("a",1)
        expect(gameboard.wippedBoard()).toBeFalsy()

    })

    test("hitting the last time a boat but not the last should not altered the gameboard sunked status", () =>{
        gameboard.deployHorizontalShip(1, "a", 1)
        gameboard.deployHorizontalShip(3, "b", 1)


        gameboard.receiveAttack("a",1)
        expect(gameboard.wippedBoard()).toBeFalsy()

    })

    test("hitting the last time to the last boat should altered the gameboard sunked status", () =>{
        gameboard.deployHorizontalShip(1, "a", 1)
        gameboard.deployHorizontalShip(3, "b", 1)

        gameboard.receiveAttack("a",1)
        expect(gameboard.wippedBoard()).toBeFalsy()

        gameboard.receiveAttack("b",1)
        expect(gameboard.wippedBoard()).toBeFalsy()

        gameboard.receiveAttack("b",2)
        expect(gameboard.wippedBoard()).toBeFalsy()

        gameboard.receiveAttack("b",3)
        expect(gameboard.wippedBoard()).toBeTruthy()


    })
})

describe("player testing", () =>{

    let player

    beforeEach(() =>{ player = createPlayer()})

    test("attack enemy gameboard", () =>{
        player.attack("a",1)
        expect(player.hasAttacked("a",1)).toBeTruthy()
    })

    test("it should know where has attacked correctly", () =>{
        
        expect(player.hasAttacked("a",1)).toBeFalsy()
    })

    test("dont allow doble shooting", ()=>{
        player.attack("a",1)
        expect(() => { player.attack("a",1) }).toThrow(Error)
        expect(() => { player.attack("a",1) }).toThrow('Already shooted in that position')
    })
})

describe("game loop testing", () =>{
    let game 

    beforeEach(()=>{game = createGame([], [])})
    
    const simpleDeploy = () => {
        return [{
            direction: 1,
            size:1,
            column:"a",
            row:1
        }]
    }

    test("new game is not started finished", () =>{
        expect(game.hasWinner()).toBeFalsy()
    })

    test("player start new game", () =>{
        expect(game.isPlayerTurn()).toBeTruthy()
    })

    test("player attacking passes the turn", () =>{
        game.playTurn("a",1)
        expect(game.isPlayerTurn()).toBeFalsy()
    })

    test("player wins when attacking the last ship of computer", () =>{
        game = createGame(simpleDeploy(),simpleDeploy())
        game.playTurn("a",1)
        expect(game.hasWinner()).toBeTruthy()
        expect(game.winner()).toBe(0)
    })

    test("computer wins when attacking the last ship of player", () =>{
        game = createGame(simpleDeploy(),simpleDeploy())
        game.playTurn("a",5)
        expect(game.hasWinner()).toBeFalsy()
        game.playTurn("a",1)
        expect(game.hasWinner()).toBeTruthy()
        expect(game.winner()).toBe(1)
    })

    test("Cant play turn if the game is over" , () =>{
        game = createGame(simpleDeploy(),simpleDeploy())
        game.playTurn("a",1)

        expect(() => { game.playTurn("b",1) }).toThrow(Error)
        expect(() => { game.playTurn("b",1) }).toThrow('Cant play turn if the game  is over')

    })
})