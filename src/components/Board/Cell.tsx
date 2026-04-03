import { Cell as CellValue } from "../../types/game";
import styles from "./Board.module.css";

interface CellProps {
  value: CellValue;
  row: number;
  col: number;
}

export function Cell({ value, row, col }: CellProps) {
  const tokenClass = [
    styles.token,
    value === 0 && styles.tokenEmpty,
    value === 1 && styles.token1,
    value === 2 && styles.token2,
  ]
    .filter(Boolean)
    .join(" ");

  const label =
    value === 0
      ? `Row ${row + 1} Column ${col + 1}, empty`
      : `Row ${row + 1} Column ${col + 1}, Player ${value}`;

  return (
    <div
      role="gridcell"
      aria-rowindex={row + 1}
      aria-colindex={col + 1}
      aria-label={label}
      className={styles.cell}
    >
      {/* aria-hidden: screen reader uses the cell label above, not token color */}
      <span aria-hidden="true" className={tokenClass}></span>
    </div>
  );
}
