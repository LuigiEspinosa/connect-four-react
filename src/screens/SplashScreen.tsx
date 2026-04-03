import logoImgSrc from "../assets/logo/full.svg";
import playIconSrc from "../assets/icon/play_circle_black_24dp.svg";
import { Board } from "../components/Board/Board";
import { useGameStore } from "../store/game.store";
import { emptyBoard } from "../types/game";
import styles from "./SplashScreen.module.css";

export function SplashScreen() {
  const goToSetup = useGameStore((s) => s.goToSetup);

  return (
    <div className={styles.card}>
      <div className={styles.boardArea}>
        {/* Decorative board - noColumnClick, so no column buttons render */}
        <Board board={emptyBoard()} />

        {/* Logo badge centered over the empty board */}
        <div className={styles.logoOverlay} aria-hidden="true">
          <div className={styles.logoBadge}>
            <img src={logoImgSrc} className={styles.logoImg} alt="" />
          </div>
        </div>

        <div className={styles.controls}>
          <button
            className={styles.btn}
            onClick={goToSetup}
            aria-label="Start game"
          >
            Start
            <img
              src={playIconSrc}
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
