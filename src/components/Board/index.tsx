import { FC } from "react";
import styled from "@emotion/styled";

import GameChip from "../GameChip";
import PlayButton from "../Buttons/PlayButton";
import { Chip, CurrentPlayer, OnChipClick } from "../../types";

interface BoardProps {
  board: Chip[];
  onChipClick: OnChipClick;
  currentPlayer: CurrentPlayer;
}

export const Board = () => {
  return (
    <BoardWrapper>
      <GridWrapper>
        <img src="/full-logo.png" alt="Find Four White Text around Logo over a blue gradient" />

        {Array.from({ length: 42 }, () => (
          <PlaceholderChip />
        ))}
      </GridWrapper>

      <PlayButton />
    </BoardWrapper>
  );
};

export const GameBoard: FC<BoardProps> = ({ board, currentPlayer, onChipClick }) => {
  return (
    <BoardWrapper>
      <GridWrapper>
        {board.map((cell, i) => (
          <GameChip key={i} chip={cell} onClick={onChipClick} currentPlayer={currentPlayer} />
        ))}
      </GridWrapper>
    </BoardWrapper>
  );
};

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 42.9375rem;
  max-height: 45rem;
  border-radius: 1.25rem;
  background: var(--white);
  box-shadow: var(--board-shadow);
  position: relative;
  overflow: hidden;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 98px);
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 37rem;
  background: var(--light-gray);
  padding: 0 8px;

  img {
    width: 15.75rem;
    height: 13.5625rem;
    object-fit: cover;
    position: absolute;
    align-self: center;
  }
`;

const PlaceholderChip = styled.div`
  border-radius: 50%;
  width: 100%;
  max-width: 65px;
  height: 65px;
  box-shadow: var(--chip-shadow);
  text-align: center;
  color: white;
`;
