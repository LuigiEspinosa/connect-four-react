export type Cell = 0 | 1 | 2;
export type Board = Cell[][];
export type Player = 1 | 2;

export type GamePhase =
  | "MENU"
  | "SETUP"
  | "PLAYING"
  | "GAME_OVER"
  | "DRAW"
  | "ABANDONED"
  | "WAITING_FOR_OPPONENT";

export type GameMode = "local" | "ai";
export type Difficulty = "easy" | "medium" | "hard" | "unbeatable";

export const ROWS = 6;
export const COLS = 7;

// Factory, not a constant
// Exported constants of reference types can by mutated
// by any caller in the same module session, poisoning all subsequent uses.
export function emptyBoard(): Board {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0) as Cell[]);
}
