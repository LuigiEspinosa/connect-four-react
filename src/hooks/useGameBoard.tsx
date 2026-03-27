import { useState, useEffect, useCallback } from "react";
import { Chip, CurrentPlayer } from "../types";
import { checkForPlayerWin, generateBoard } from "../utils";

const BOTTOM_BORDER = 5;

const useGameBoard = () => {
  const [board, setBoard] = useState<Chip[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<CurrentPlayer>("red");

  const [isGameFinished, setIsGameFinished] = useState(false);
  const [whichPlayerWon, setWhichPlayerWon] = useState<string>();
  const [playersScore, setPlayersScore] = useState({ player1: 0, player2: 0 });

  const onChipClick = useCallback(
    ({ position, value }: Chip, currentPlayer: CurrentPlayer) => {
      const currentX = position.x;

      if (isGameFinished) {
        return;
      }

      setBoard((prevBoardState) => {
        if (value !== null) {
          return prevBoardState;
        }

        const newBoardState = [...prevBoardState];

        for (let i = position.y; i <= BOTTOM_BORDER; i++) {
          const currentIndex = newBoardState.findIndex(
            (chip) => chip.position.x === currentX && chip.position.y === i
          );

          const nextIndex = newBoardState.findIndex(
            (chip) => chip.position.x === currentX && chip.position.y === i + 1
          );

          if (newBoardState[nextIndex]?.value !== null) {
            newBoardState[currentIndex] = { ...newBoardState[currentIndex], value: currentPlayer };
            break;
          }

          if (i === BOTTOM_BORDER) {
            newBoardState[currentIndex] = { ...newBoardState[currentIndex], value: currentPlayer };
            break;
          }
        }

        const playerWon = checkForPlayerWin(newBoardState);

        if (playerWon) {
          setIsGameFinished(true);
          setWhichPlayerWon(playerWon);

          setPlayersScore((prev) => {
            if (playerWon === "red") {
              prev["player1"] = prev["player1"] + 1;
            } else {
              prev["player2"] = prev["player2"] + 1;
            }

            return prev;
          });
        }

        setCurrentPlayer(currentPlayer === "red" ? "yellow" : "red");
        return newBoardState;
      });
    },
    [isGameFinished]
  );

  useEffect(() => {
    setBoard(generateBoard());
  }, []);

  console.log(board);

  return {
    board,
    onChipClick,
    currentPlayer,
    isGameFinished,
    whichPlayerWon,
    playersScore,
  };
};

export default useGameBoard;
