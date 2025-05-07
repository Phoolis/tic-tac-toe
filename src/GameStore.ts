import { create } from "zustand"
//import { combine } from "zustand/middleware";

export type Squares = (string | null)[]

interface GameStore {
  history: Squares[]
  currentMove: number
  setHistory: (nextHistory: Squares[] | ((prev: Squares[]) => Squares[])) => void
  setCurrentMove: (nextCurrentMove: number | ((prev: number) => number)) => void
}

// Here we define the state and actions inline
export const useGameStore = create<GameStore>((set) => ({
  // set initial states
  history: [Array(9).fill(null)] as Squares[],
  currentMove: 0,

  // define actions
  setHistory: (nextHistory) => {
    set((state) => ({
      history: typeof nextHistory === "function" ? nextHistory(state.history) : nextHistory,
    }))
  },
  setCurrentMove: (nextCurrentMove) => {
    set((state) => ({
      currentMove:
        typeof nextCurrentMove === "function"
          ? nextCurrentMove(state.currentMove)
          : nextCurrentMove,
    }))
  },
}))

// Original tutorial used combine() to define both state and actions in one store
// I find the above more understandable

/* 
type GameState = {
  squares: Squares;
};

type GameActions = {
  setSquares: (nextSquares: Squares | ((prev: Squares) => Squares)) => void;

}; */

/* const useGameStore = create(
  combine<GameState, GameActions>({ squares: Array(9).fill(null) }, (set) => {
    return {
      setSquares: (nextSquares) => {
        set((state) => ({
          squares:
            typeof nextSquares === "function"
              ? nextSquares(state.squares)
              : nextSquares,
        }));
      },
    };
  })
); */
