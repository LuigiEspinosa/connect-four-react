// Pure functions only
// No store imports. No side effects.
// Used by both React app AND the minmax worker.
// If you add a store import here, the worker will break (no DOM in workers).

import { Board, Cell, Player, COLS } from "../types/game";

export function dropToken(
  board: Board,
  col: number,
  player: Player,
): Board | null {
  // Guard: out-of-bounds or fractional col would silently act like a full column.
  if (!Number.isInteger(col) || col < 0 || col >= COLS) return null;

  for (let row = board.length - 1; row >= 0; row--) {
    if (board[row][col] == 0) {
      const next = board.map((r) => [...r]) as Board;
      next[row][col] = player;
      return next;
    }
  }
  return null;
}

export function checkWinner(board: Board): 0 | Player {
  // Derive bound from the actual board - not ROWS/COLS constants.
  // If ROWS is ever changed, a board produced before the change won't cause an OOB access.
  const rows = board.length;
  const cols = board[0]?.length ?? 0;

  // Horizontal
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c <= cols - 4; c++) {
      const v = board[r][c] as Cell;
      if (
        v !== 0 &&
        v === board[r][c + 1] &&
        v === board[r][c + 2] &&
        v === board[r][c + 3]
      ) {
        return v as Player;
      }
    }
  }

  // Vertical
  for (let r = 0; r <= rows - 4; r++) {
    for (let c = 0; c < cols; c++) {
      const v = board[r][c] as Cell;
      if (
        v !== 0 &&
        v === board[r + 1][c] &&
        v === board[r + 2][c] &&
        v === board[r + 3][c]
      ) {
        return v as Player;
      }
    }
  }

  // Diagonal ↘
  for (let r = 0; r <= rows - 4; r++) {
    for (let c = 0; c <= cols - 4; c++) {
      const v = board[r][c] as Cell;
      if (
        v !== 0 &&
        v === board[r + 1][c + 1] &&
        v === board[r + 2][c + 2] &&
        v === board[r + 3][c + 3]
      ) {
        return v as Player;
      }
    }
  }

  // Diagonal ↗
  for (let r = 3; r <= rows; r++) {
    for (let c = 0; c <= cols - 4; c++) {
      const v = board[r][c] as Cell;
      if (
        v !== 0 &&
        v === board[r - 1][c + 1] &&
        v === board[r - 2][c + 2] &&
        v === board[r - 3][c + 3]
      ) {
        return v as Player;
      }
    }
  }

  return 0;
}

export function getValidColumns(board: Board): number[] {
  if (!board.length || !board[0]) return [];
  return Array.from({ length: board[0].length }, (_, i) => i).filter(
    (col) => board[0][col] === 0,
  );
}

export function isBoardFull(board: Board): boolean {
  if (!board.length || !board[0]) return false;
  return board[0].every((cell) => cell !== 0);
}
