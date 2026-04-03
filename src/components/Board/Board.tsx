/**
 * Board renders the 7x6 game grid: token circles behind the mask SVG,
 * and (when onColumnClick is provided) 7 invisible column drop buttons above it.
 *
 * Pass onColumnClick=undefined to render a decorative non-interactive board
 * (used by SplashScreen and SetupScreen).
 */
import maskSrc from "../../assets/game/mask.svg";
import { Board as BoardType, COLS, ROWS } from "../../types/game";
import { Cell } from "./Cell";
import styles from "./Board.module.css";

interface BoardProps {
  board: BoardType;
  /** Omit to render as a non-interactive decorative board. */
  onColumnClick?: (col: number) => void;
}

export function Board({ board, onColumnClick }: BoardProps) {
  return (
    <div className={styles.boardWrapper}>
      {/**
       * Flat grid - no row wrapper dics - keeps a single CSS Grid context.
       * ARIA row semantics are provided via aria-rowindex/aria-colindex on each
       * cell.
       */}
      <div
        role="grid"
        aria-label="Connect Four board"
        aria-rowcount={ROWS}
        aria-colcount={COLS}
        className={styles.boardGrid}
      >
        {board.flatMap((row, r) =>
          row.map((cell, c) => (
            <Cell key={`${r}-${c}`} value={cell} row={r} col={c} />
          )),
        )}
      </div>

      {/* Board overlay - white frame with 42 circular holes */}
      <img src={maskSrc} className={styles.mask} alt="" aria-hidden="true" />

      {/* Column drop buttons - only renderedwhen the board is interactive */}
      {onColumnClick && (
        <div className={styles.colBtns}>
          {Array.from({ length: COLS }, (_, c) => (
            <button
              key={c}
              className={styles.colBtn}
              onClick={() => onColumnClick(c)}
              aria-label={`Drop token in column ${c + 1}`}
              disabled={board[0][c] !== 0}
              aria-disabled={board[0][c] !== 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}
