import {Cell} from './cell'
import { Colors } from './colors'
import { Checker } from './figure/checker'

export class Board{
    cells: Cell[][] = []

    public initCells(){
        for(let i = 0; i < 8; i++){
            const row: Cell[] = []
            for(let j = 0; j < 8; j++){
                if ((i + j) % 2 === 0){
                    row.push(new Cell(this, j, i, Colors.WHITE, null))
                }else{
                    row.push(new Cell(this, j, i, Colors.BLACK, null))
                }
            }
        this.cells.push(row)
        }
    }

    public highlightCell(selectedCell: Cell | null) {
        for(let i = 0; i < this.cells.length; i++){
            const row = this.cells[i]
            for(let j = 0; j < row.length; j++){
                const elem = row[j]
                elem.availableShot = !!selectedCell?.figure?.canShot(elem)
                if(elem.availableShot){
                    elem.available = false
                }else if(!elem.availableShot){
                    for(let i = 0; i < this.cells.length; i++){
                        const row = this.cells[i]
                        for(let j = 0; j < row.length; j++){
                            const elem = row[j]
                            elem.available = !!selectedCell?.figure?.canMove(elem)
                        }
                    }
                }
            }
        }
    }


    public getCopyBoard(): Board{
        const newBoard = new Board()
        newBoard.cells = this.cells
        return newBoard
    }

    public getCell(x: number, y: number){
        return this.cells[y][x]
    }

    public addFigures(){
       for(let i = 1; i < 8; i+=2){
        new Checker(Colors.BLACK, this.getCell(i, 0))
        new Checker(Colors.BLACK, this.getCell(i-1, 1))
        new Checker(Colors.BLACK, this.getCell(i, 2))
        new Checker(Colors.WHITE, this.getCell(i-1, 5))
        new Checker(Colors.WHITE, this.getCell(i, 6))
        new Checker(Colors.WHITE, this.getCell(i-1, 7))
       }
    }
    
}



