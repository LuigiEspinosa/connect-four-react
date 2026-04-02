import { create } from "zustand";
import {
  Board,
  Difficulty,
  GameMode,
  GamePhase,
  Player,
  COLS,
  ROWS,
} from "../types/game";
import { dropToken, checkWinner, isBoardFull } from "../utils/board";

// Creates a fresh board each call
// Avoids reusing the same reference across rematch/newGame,
// which would fool Zustand's shallow equality check.
const makeBoard = (): Board =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(0)) as Board;

interface Scores {
  player1: number;
  player2: number;
}

interface GameStore {
  board: Board;
  phase: GamePhase;
  currentPlayer: Player;
  winner: Player | null;
  mode: GameMode | null;
  difficulty: Difficulty;
  scores: Scores;

  goToSetup: () => void;
  startGame: (mode: GameMode) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  applyMove: (col: number) => void;
  rematch: () => void;
  newGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  board: makeBoard(),
  phase: "MENU",
  currentPlayer: 1,
  winner: null,
  mode: null,
  difficulty: "medium",
  scores: { player1: 0, player2: 0 },

  goToSetup() {
    // Guard: calling from PLAYING would silently abandon the active game.
    if (get().phase !== "MENU") return;
    set({ phase: "SETUP" });
  },

  startGame(mode) {
    set({
      mode,
      board: makeBoard(),
      phase: "PLAYING",
      currentPlayer: 1,
      winner: null,
    });
  },

  setDifficulty(difficulty) {
    set({ difficulty });
  },

  // ALL moves, (local, AI, and online), go through here.
  // Never mutate the board directly from a component.
  applyMove(col) {
    const { board, currentPlayer, scores, phase } = get();

    // Guard: stale AI response after game ends, or malformed online message.
    if (phase !== "PLAYING") return;

    // Guard: non-integer col (e.g. fractional from JSON) acts like a full column in dropToken
    if (!Number.isInteger(col) || col < 0 || col >= COLS) return;

    const next = dropToken(board, col, currentPlayer);
    if (!next) return; // column full - Board component triggers shake animation

    const winner = checkWinner(next);
    if (winner) {
      const key = winner === 1 ? "player1" : "player2";
      set({
        board: next,
        phase: "GAME_OVER",
        winner,
        scores: { ...scores, [key]: scores[key] + 1 },
      });
      return;
    }

    if (isBoardFull(next)) {
      set({ board: next, phase: "DRAW", winner: null });
      return;
    }

    set({ board: next, currentPlayer: currentPlayer === 1 ? 2 : 1 });
  },

  // Rematch: reset board, preserve mode + scores.
  rematch() {
    // Guard: mode must be set. Can't rematch before a game was started.
    if (!get().mode) return;
    set({
      board: makeBoard(),
      phase: "PLAYING",
      currentPlayer: 1,
      winner: null,
    });
  },

  newGame() {
    set({
      board: makeBoard(),
      phase: "MENU",
      currentPlayer: 1,
      winner: null,
      mode: null,
      scores: { player1: 0, player2: 0 },
    });
  },
}));
