import React, { useContext } from "react";
import "../componentStyles/Header.css";
import { Context } from "../Context/useContext";

function Header() {
  const { scoreCount, bestScore } = useContext(Context);

  return (
    <div className="wrapper">
      <div className="header">
        <div className="header-left">
          <div className="game-text">Rock</div>
          <div className="game-text">Paper</div>
          <div className="game-text">Scissor</div>
        </div>
        <div className="header-right">
          <div className="right-flex">
            <div className="score-text">Score</div>
            <div className="score-num">{scoreCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
