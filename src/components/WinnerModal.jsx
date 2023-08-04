import { Square } from "./Square"
export function WinnerModal({ winner, resetGame }) {
    if(winner === null) return null
    const winnerText = winner ? 'Ganó' : 'Empate'
    const text = winner ? '!Ha ganado el juego¡' : '¿Mentes maestras?'
    return (
        <section className='winner'>
            <div className='text'>
                <h2>{winnerText}</h2>
                <header className='win'>
                    {winner && <Square>{winner}</Square>}
                </header>
                <p>
                    {text}
                </p>
                <footer>
                    <button onClick={resetGame}>
                        Empezar de nuevo
                    </button>
                </footer>

            </div>
        </section>
    )
}