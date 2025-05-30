import Board from "./Board"
import { useGameStore, type Squares } from "./GameStore"

export default function Game() {
  const history = useGameStore((state) => state.history)
  const setHistory = useGameStore((state) => state.setHistory)
  const currentMove = useGameStore((state) => state.currentMove)
  const setCurrentMove = useGameStore((state) => state.setCurrentMove)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares: Squares) {
    const nextHistory = history.slice(0, currentMove + 1).concat([nextSquares])
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove)
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        fontFamily: "monospace",
      }}
    >
      <div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div style={{ marginLeft: "1rem", height: "300px" }}>
        <ol>
          {history.map((_, historyIndex) => {
            const description =
              historyIndex > 0 ? `Go to move #${historyIndex}` : `Go to game start`

            return (
              <li key={historyIndex}>
                <button onClick={() => jumpTo(historyIndex)}>{description}</button>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
