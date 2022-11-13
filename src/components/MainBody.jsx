import React, { useState, useContext } from "react";
import "../componentStyles/MainBody.css";
import TriangleIcon from "../images/bg-triangle.svg";
import RockIcon from "../images/icon-rock.svg";
import PaperIcon from "../images/icon-paper.svg";
import ScissorIcon from "../images/icon-scissors.svg";
import { Context } from "../Context/useContext";
import RulesModal from "./RulesModal";

function MainBody() {
  const {
    hasUserChoosenCard,
    handleUserClickOnImage,
    handleGameOver,
    userChoosenCard,
    hasComputerChoosenCard,
    computerGuessedCard,
    handleComputerCard,
    handleGameRestart,
    shouldGameRestart,
    statusText,
  } = useContext(Context);

  console.log(computerGuessedCard);

  return (
    <div className="wrapper">
      {!hasUserChoosenCard ? (
        <div className="card">
          <div className="card-item-1">
            <img src={TriangleIcon} alt="triangle-image" />
          </div>
          <div className=" card-item card-item-2">
            <img
              onClick={handleUserClickOnImage}
              data-id="0"
              style={{ width: "65%" }}
              src={RockIcon}
              alt="rock-icon"
            />
          </div>
          <div className=" card-item card-item-3">
            <img
              onClick={handleUserClickOnImage}
              data-id="1"
              style={{ width: "65%" }}
              src={PaperIcon}
              alt="paper-icon"
            />
          </div>
          <div className=" card-item card-item-4">
            <img
              onClick={handleUserClickOnImage}
              data-id="2"
              style={{ width: "65%" }}
              src={ScissorIcon}
              alt="scissor-icon"
            />
          </div>
        </div>
      ) : (
        <div className="second-card">
          <div className="user-card">
            <h2 className="user-title">You Picked</h2>
            <div
              style={{ border: `35px solid ${userChoosenCard.borderColor}` }}
              className="card-item card-item-modifier"
            >
              <img
                style={{ width: "65%" }}
                src={userChoosenCard.imgSrc}
                alt="user-icon"
              />
            </div>
          </div>
         {hasComputerChoosenCard && <div className="winner">
            <h3>{statusText}</h3>
           {!shouldGameRestart && <button className="playBtn" onClick={handleGameOver}>
              Play Again
            </button>
          }    
         {shouldGameRestart &&  <button className="restart-btn" onClick={handleGameRestart}>
              Restart
            </button>}
          </div>}
          <div className="computer-card">
            <h2 className="computer-title">The House Picked</h2>
            
             {hasUserChoosenCard && 
              <div
                style={{
                  border: `35px solid ${computerGuessedCard.borderColor}`,
                }}
                className="card-item card-item-modifier"
              >
                <img
                  style={{ width: "65%" }}
                  src={computerGuessedCard.imgSrc}
                  // alt="computer-icon"
                />
              </div>
              }
              {!hasUserChoosenCard && <div className="emptyBox"></div>}
          </div>
        </div>

      )}
      {!hasUserChoosenCard && <RulesModal />}
    </div>
  );
}

export default MainBody;
