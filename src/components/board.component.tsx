import React from 'react'
import { Board } from '../models/board'
import { Cell } from '../models/cell'
import { Player } from '../models/player'
import CellComponent from './cell.component'


interface BoardProps{
    board: Board
    setBoard: (board: Board) => void
    currentPlayer: Player | null
    swapPlayer: () => void
}

const BoardComponent : React.FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {    

    const [selectedCell, setSelectedCell] = React.useState<Cell | null>(null)

    function click(cell: Cell){
        if(selectedCell && selectedCell !== cell && selectedCell.figure?.canShot(cell)){
            selectedCell.moveFigure(cell)
            swapPlayer()
            setSelectedCell(null)
        }else if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)){
            selectedCell.moveFigure(cell)
            swapPlayer()
            setSelectedCell(null)
        }else{
            if(cell.figure?.color === currentPlayer?.color){
                setSelectedCell(cell)
            }
        }
    }

    React.useEffect(() => {
        highlightCell()// eslint-disable-next-line
    }, [selectedCell])

    function highlightCell(){
        board.highlightCell(selectedCell)
        updateBoard()
    }

    function updateBoard(){
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    return(
        <div>
            <h3>Current player: {currentPlayer?.color}</h3>
            <div className='board'>
                {board.cells.map((elem, index) => 
                    <React.Fragment key={index}>
                        {elem.map((cell) =>
                            <CellComponent 
                                click = {click}
                                cell={cell} 
                                key= {cell.id}
                                selected = {cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            />
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    )
}

export default BoardComponent