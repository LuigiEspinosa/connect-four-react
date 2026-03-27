import { useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

function PlayButton() {
  const [showButtons, setShowButtons] = useState(false);

  const handleButtonClick = () => {
    setShowButtons(true);
  };

  return (
    <ButtonWrapper showButtons={showButtons}>
      {!showButtons ? (
        <StartButton onClick={handleButtonClick}>
          Start <img src="/icons/play.svg" alt="" />
        </StartButton>
      ) : null}

      {showButtons ? (
        <>
          <StartButton>
            <Link to="/one-vs-one">
              <img src="/icons/user.svg" alt="" /> <span>Vs</span>{" "}
              <img src="/icons/user.svg" alt="" />
            </Link>
          </StartButton>

          <StartButton>
            <Link to="/one-vs-robot">
              <img src="/icons/user.svg" alt="" /> <span>Vs</span>{" "}
              <img src="/icons/robot.svg" alt="" />
            </Link>
          </StartButton>
        </>
      ) : null}
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.div<{ showButtons: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ showButtons }) => (!showButtons ? "center" : "space-around")};
`;

const StartButton = styled.button`
  width: 10.5rem;
  height: 4.75rem;
  border-radius: 2.375rem;
  background: var(--blue);

  &,
  a {
    color: #fff;
    font-family: "Inter", sans-serif;
    font-size: 1.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover {
    background: var(--gradient);
  }

  img {
    width: 2.25rem;
    height: 2.25rem;
    margin-left: 6.38px;

    + span {
      margin: 0 0.5rem;
    }
  }
`;

export default PlayButton;
