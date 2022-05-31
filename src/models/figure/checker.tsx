import { Cell } from '../cell'
import { Colors } from '../colors'
import { Figure } from './figure'
import wLogo from '../../photo/w1.png'
import bLogo from '../../photo/b1.png'


export class Checker extends Figure{
    

    constructor(color: Colors, cell: Cell){
        super(color, cell)
        this.shotPossible = false
        this.logo = color === Colors.WHITE? wLogo : bLogo
    }

    canShot(target: Cell): boolean {
        const shot = 2

        if(((target.x === this.cell.x + shot && target.y === this.cell.y + shot) ||
         (target.x === this.cell.x - shot && target.y === this.cell.y + shot) ||
         (target.x === this.cell.x - shot && target.y === this.cell.y - shot) ||
         (target.x === this.cell.x + shot && target.y === this.cell.y - shot))
        && target.isCellEmpty() &&
        !this.cell.board.getCell(((target.x + this.cell.x)/2), ((target.y + this.cell.y)/2)).isCellEmpty() && 
        this.cell.board.getCell(((target.x + this.cell.x)/2), ((target.y + this.cell.y)/2)).figure?.color !== this.cell.figure?.color){
            this.shotPossible = true
            return true
        }

        return false
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)){
            return false
        }

        const move = this.cell.figure?.color === Colors.WHITE ? -1 : 1



        if((target.y === this.cell.y + move) && (target.x === this.cell.x - 1 || target.x === this.cell.x + 1) &&
        target.isCellEmpty()){
            if(this.shotPossible){
                return false
            }else{
                return true
            }
        }

        return false
    }



    moveFigure(target: Cell): void {
        
        const dx = Math.abs(this.cell.x - target.x)
        const dy = Math.abs(this.cell.y - target.y) 
        if(dx === 2 && dy === 2){
            this.cell.board.getCell(((target.x + this.cell.x)/2), ((target.y + this.cell.y)/2)).figure = null
        }
    }
}


