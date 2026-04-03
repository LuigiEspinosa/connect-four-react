import logoImgSrc from "../assets/logo/full.svg";
import faceIconSrc from "../assets/icon/face_black_24dp.svg";
import robotIconSrc from "../assets/icon/smart_toy_black_24dp.svg";
import { Board } from "../components/Board/Board";
import { useGameStore } from "../store/game.store";
import { emptyBoard } from "../types/game";
import styles from "./SetupScreen.module.css";

export function SetupScreen() {
  const startGame = useGameStore((s) => s.startGame);

  return (
    <div className={styles.card}>
      <div className={styles.boardArea}>
        <Board board={emptyBoard()} />
        <div className={styles.logoOverlay} aria-hidden="true">
          <div className={styles.logobadge}>
            <img src={logoImgSrc} className={styles.logoImg} alt="" />
          </div>
        </div>

        <div className={styles.controls}>
          <button
            className={styles.btn}
            onClick={() => startGame("local")}
            aria-label="Two players, same device"
          >
            <img
              src={faceIconSrc}
              alt=""
              aria-hidden="true"
              className={styles.btnIcon}
            />
            Vs
            <img
              src={faceIconSrc}
              alt=""
              aria-hidden="true"
              className={styles.btnIcon}
            />
          </button>

          <button
            className={styles.btn}
            onClick={() => startGame("ai")}
            aria-label="Play against AI"
          >
            <img
              src={faceIconSrc}
              alt=""
              aria-hidden="true"
              className={styles.btnIcon}
            />
            Vs
            <img
              src={robotIconSrc}
              alt=""
              aria-hidden="true"
              className={styles.btnIcon}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
