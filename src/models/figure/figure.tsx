import { Colors } from '../colors'
import { Cell } from '../cell'
import Logo from '../../photo/w1.png'

export class Figure{
    color: Colors
    logo: typeof Logo | null
    cell: Cell
    shotPossible: boolean
    id: number

    constructor(color: Colors, cell: Cell){
        this.color = color
        this.cell = cell
        this.cell.figure = this
        this.logo = null
        this.shotPossible = false
        this.id = Math.random()
    }

    canMove(target: Cell) : boolean {
        if(target.figure?.color === this.color){
            return false
        }        
        return true
    }

    canShot(target: Cell) : boolean{
        return true
    }

    moveFigure(target: Cell){}

}