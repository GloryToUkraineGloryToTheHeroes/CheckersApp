import React from 'react';
import './App.css';
import BoardComponent from './components/board.component'
import { Board } from './models/board'
import { Colors } from './models/colors';
import { Player } from './models/player';

function App() {
  const [board, setBoard] = React.useState(new Board())
// eslint-disable-next-line
  const [whitePlayer, setWhitePlayer] = React.useState(new Player(Colors.WHITE))// eslint-disable-next-line
  const [blackPlayer, setBlackPlayer] = React.useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = React.useState<Player | null>(null)

  React.useEffect(() => {
    restart()
    setCurrentPlayer(whitePlayer)
  }, [whitePlayer])

  const restart = () => {
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
  }

  function swapPlayer(){
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  return (
    <div className='main'>
      <BoardComponent 
        board = {board}
        setBoard = {setBoard}
        currentPlayer = {currentPlayer}
        swapPlayer = {swapPlayer}
      />
    </div>
  );
}

export default App;
