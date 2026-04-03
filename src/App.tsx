import styles from "./App.module.css";
import { useGameStore } from "./store/game.store";
import { SplashScreen } from "./screens/SplashScreen";
import { SetupScreen } from "./screens/SetupScreen";

export default function App() {
  const phase = useGameStore((s) => s.phase);

  return (
    <div className={styles.app}>
      {phase === "MENU" && <SplashScreen />}
      {phase === "SETUP" && <SetupScreen />}
      {phase === "PLAYING" && <p style={{ color: "white" }}>TODO: GameBoard</p>}
      {(phase === "GAME_OVER" || phase === "DRAW") && (
        <p style={{ color: "white" }}>TODO: EndScreen</p>
      )}
    </div>
  );
}
