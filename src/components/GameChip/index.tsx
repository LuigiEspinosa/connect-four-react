import { FC } from "react";
import styled from "@emotion/styled";

import { Chip, CurrentPlayer, OnChipClick } from "../../types";

interface ChipProps {
  chip: Chip;
  currentPlayer: CurrentPlayer;
  onClick: OnChipClick;
}

const GameChip: FC<ChipProps> = ({ chip, currentPlayer, onClick }) => {
  const { value } = chip;

  return (
    <StyledChip
      value={value}
      currentPlayer={currentPlayer}
      onClick={() => onClick(chip, currentPlayer)}
    />
  );
};

const StyledChip = styled.div<{ value: null | "red" | "yellow"; currentPlayer: CurrentPlayer }>`
  border-radius: 50%;
  width: 100%;
  max-width: 65px;
  height: 65px;
  box-shadow: var(--chip-shadow);
  text-align: center;
  color: white;

  background-color: ${({ value }) =>
    value === "red" ? "var(--red)" : value === "yellow" ? "var(--yellow)" : "var(--white)"};

  :hover {
    border: 3px solid
      ${({ currentPlayer, value }) =>
        value !== null ? "black" : currentPlayer === "red" ? "var(--red)" : "var(--yellow)"};
    cursor: ${({ value }) => (value === null ? "pointer" : "default")};
  }
`;

export default GameChip;
