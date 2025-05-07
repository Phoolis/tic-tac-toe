import { useGameStore, type Squares } from "./GameStore";

import Square from "./Square";

export default function Board() {
  // The board component subscribes to these two parts of the store
  // Any time either of them changes, the Board component is re-run (rendered)
  const squares = useGameStore((state) => state.squares);
  const xIsNext = useGameStore((state) => state.xIsNext);

  const setSquares = useGameStore((state) => state.setSquares);
  const setXIsNext = useGameStore((state) => state.setXIsNext);

  // And on render, these constants are also re-evaluated:
  const player = xIsNext ? "X" : "O";
  const winner = calculateWinner(squares);
  const turns = calculateTurns(squares);
  const status = calculateStatus(winner, turns, player);

  function handleClick(i: number) {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = player;
    setSquares(nextSquares);
    setXIsNext(!xIsNext); // Flip the boolean state
  }

  return (
    <>
      <div style={{ marginBottom: "0.5rem" }}>{status}</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          width: "calc(3 * 2.5rem)",
          height: "calc(3 * 2.5rem)",
          border: "1px solid #999",
        }}
      >
        {squares.map((square, squareIndex) => (
          <Square
            key={squareIndex}
            value={square}
            onSquareClick={() => handleClick(squareIndex)}
          />
        ))}
      </div>
    </>
  );
}

function calculateWinner(squares: Squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

function calculateTurns(squares: Squares) {
  return squares.filter((square) => !square).length;
}

function calculateStatus(winner: string | null, turns: number, player: string) {
  if (!winner && !turns) return "Draw";
  if (winner) return `Winner ${winner}`;
  return `Next player: ${player}`;
}
