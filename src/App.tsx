import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import styled from "@emotion/styled";

import { Board, GameBoard } from "./components/Board";
import useGameBoard from "./hooks/useGameBoard";

function App() {
  const { board, onChipClick, currentPlayer } = useGameBoard();

  return (
    <Router>
      <AppWrapper>
        <Routes>
          <Route path="/" element={<Board />} />

          <Route
            path="/one-vs-one"
            element={
              <GameBoard board={board} onChipClick={onChipClick} currentPlayer={currentPlayer} />
            }
          />

          <Route path="/one-vs-robot" element={<h1>AI</h1>} />
        </Routes>
      </AppWrapper>
    </Router>
  );
}

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: var(--gradient);
  display: grid;
  place-items: center;
`;

export default App;
