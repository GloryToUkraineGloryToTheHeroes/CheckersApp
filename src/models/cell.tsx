import { Colors } from './colors'
import { Figure } from './figure/figure'
import { Board } from './board'

export class Cell {
    readonly x: number
    readonly y: number
    readonly color: Colors
    figure: Figure | null
    board: Board
    available: boolean
    availableShot: boolean
    id: number

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null){
        this.x = x
        this.y = y
        this.color = color
        this.figure = figure
        this.board = board
        this.available = false
        this.availableShot = false
        this.id = Math.random()
    }

    isCellEmpty() : boolean{
        if(this.figure === null){
            return true
        }
        return false
    }

    
    setFigure(figure: Figure){
        this.figure = figure
        this.figure.cell = this
    }
    

    moveFigure(target: Cell){
        if(this.figure && this.figure.canMove(target)){
            this.figure.moveFigure(target)
            target.setFigure(this.figure)
            this.figure = null
        }else if(this.figure && this.figure.canShot(target)){
            this.figure.moveFigure(target)
            target.setFigure(this.figure)
            this.figure = null
        }
    }
}