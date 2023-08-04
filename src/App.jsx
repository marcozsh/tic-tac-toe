import { useState } from 'react'
import { Square } from './components/Square'
import { WinnerModal} from './components/WinnerModal'
import { TURNS } from './constants'
import { checkWinnerFrom, checkEndGameFrom } from './logic/board'
import conffeti from 'canvas-confetti'
import './App.css'


function App() {
  //initial states
  const [board, setBoard] = useState(()=>{
    const previusGame = window.localStorage.getItem('board')
    return previusGame !== null ? JSON.parse(previusGame) : Array(9).fill(null)
    }
  )
  const [turn, setTurn] = useState(()=>{
    const lastTurn = window.localStorage.getItem('turn')
    return lastTurn ?? TURNS.x
  })
  const [winner, setWinner] = useState(null)

  const resetGame = ()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }


  const updateBoard = (index) =>{
    if (board[index] || winner) return // para no sobre escribir sobre el tablero
    const newBoard = [... board] // los 3 puntos es para crear una lista nueva desde otra lista
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn == TURNS.x ? TURNS.o : TURNS.x
    setTurn(newTurn)
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner){
      //esto es asincrono
      setWinner(newWinner)
      conffeti()
      //alert(`${newWinner} ha gando el juego!`) // NO HACER
    }else if(checkEndGameFrom(newBoard)){
      setWinner(false)
    }
  }
  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <section></section>
      <section className='game'>
        {
          board.map((square, index) => {
            return(
              <Square 
                key={index} 
                index={index} 
                updateBoard={updateBoard}>
                {square}
              </Square>
            ) 
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn == TURNS.x}>
          {TURNS.x}
        </Square>
        <Square isSelected={turn == TURNS.o}>
          {TURNS.o}
        </Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame}/>
     </main> 
  )
}

export default App
