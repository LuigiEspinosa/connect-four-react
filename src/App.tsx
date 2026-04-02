import styles from "./App.module.css";
import { useGameStore } from "./store/game.store";

export default function App() {
  const phase = useGameStore((s) => s.phase);
  const goToSetup = useGameStore((s) => s.goToSetup);
  const startGame = useGameStore((s) => s.startGame);
  const rematch = useGameStore((s) => s.rematch);
  const newGame = useGameStore((s) => s.newGame);

  return (
    <div className={styles.app}>
      {phase === "MENU" && <button onClick={goToSetup}>Start</button>}
      {phase === "SETUP" && (
        <div>
          <button onClick={() => startGame("local")}>PvP</button>
          <button onClick={() => startGame("ai")}>vs AI</button>
        </div>
      )}
      {phase === "PLAYING" && <p style={{ color: "white" }}>TODO: GameBoard</p>}
      {(phase === "GAME_OVER" || phase === "DRAW") && (
        <div>
          <button onClick={rematch}>Rematch</button>
          <button onClick={newGame}>New Game</button>
        </div>
      )}
    </div>
  );
}
