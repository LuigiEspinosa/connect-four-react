import { Chip } from "../types";

export const generateBoard = () => {
  const board = [];
  const rows = 6;
  const columns = 7;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const index = y * columns + x;
      board.push({ value: null, position: { x, y }, index });
    }
  }

  return board;
};

export const checkForPlayerWin = (board: Chip[]) => {
  let playerWon: string | null = null;

  for (let i = 0; i < 6; i++) {
    const row = board.filter((chip) => chip.position.y === i);
    const isMatch = checkForFourInARow(row);

    if (isMatch) {
      playerWon = isMatch;
    }
  }

  for (let i = 0; i < 7; i++) {
    const column = board.filter((chip) => chip.position.x === i);
    const isMatch = checkForFourInARow(column);

    if (isMatch) {
      playerWon = isMatch;
    }
  }

  // Diagonals validation
  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 7; x++) {
      const upwardDiagonalChips = [];
      const downwardDiagonalChips = [];

      for (let i = 0; i < 4; i++) {
        if (x + i < 7 && y + i < 6) {
          upwardDiagonalChips.push(
            board.find((chip) => chip.position.x === x + i && chip.position.y === y + i)
          );
        }

        if (x + i < 7 && y - i >= 0) {
          downwardDiagonalChips.push(
            board.find((chip) => chip.position.x === x + i && chip.position.y === y - i)
          );
        }
      }

      const upwardDiagonalChipsFiltered = upwardDiagonalChips.filter(
        (chip) => chip !== undefined
      ) as Chip[];

      const downwardDiagonalChipsFiltered = downwardDiagonalChips.filter(
        (chip) => chip !== undefined
      ) as Chip[];

      const upwardDiagonalMatch = checkForFourInARow(upwardDiagonalChipsFiltered);
      const downwardDiagonalMatch = checkForFourInARow(downwardDiagonalChipsFiltered);

      if (upwardDiagonalMatch) {
        return upwardDiagonalMatch;
      }

      if (downwardDiagonalMatch) {
        return downwardDiagonalMatch;
      }
    }
  }

  return playerWon;
};

const checkForFourInARow = (chips: Chip[]): string | null => {
  let currentValue: string | null = null;
  let counter = 0;

  for (let i = 0; i < chips.length; i++) {
    const chip = chips[i];

    if (chip.value === currentValue) {
      counter++;
    } else {
      currentValue = chip.value;
      counter = 1;
    }

    if (counter >= 4) {
      return currentValue;
    }
  }

  return null;
};
