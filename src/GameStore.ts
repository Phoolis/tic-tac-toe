import { create } from "zustand";
//import { combine } from "zustand/middleware";

export type Squares = (string | null)[];

interface GameStore {
  squares: Squares;
  xIsNext: boolean;
  setSquares: (nextSquares: Squares | ((prev: Squares) => Squares)) => void;
  setXIsNext: (nextXIsNext: boolean | ((prev: boolean) => boolean)) => void;
}

// Here we define the state and actions inline
export const useGameStore = create<GameStore>((set) => ({
  // set initial states
  squares: Array(9).fill(null),
  xIsNext: true,

  // define actions
  setSquares: (nextSquares) => {
    set((state) => ({
      squares:
        typeof nextSquares === "function"
          ? nextSquares(state.squares)
          : nextSquares,
    }));
  },

  setXIsNext: (nextXIsNext) => {
    set((state) => ({
      xIsNext:
        typeof nextXIsNext === "function"
          ? nextXIsNext(state.xIsNext)
          : nextXIsNext,
    }));
  },
}));

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
