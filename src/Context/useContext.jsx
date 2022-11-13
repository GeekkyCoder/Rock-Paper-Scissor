import React, { useState, createContext } from "react";
import { cardsArray } from "../Cards/card";

const Context = createContext();

function ContextProvider(props) {
  const [hasUserChoosenCard, setHasUserChoosenCard] = useState(false);
  const [hasComputerChoosenCard, setHasComputerChoosenCard] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [availableCards, setAvailableCards] = useState(cardsArray);
  const [userChoosenCard, setuserChoosenCard] = useState([]);
  const [computerGuessedCard, setComputerGuessedCard] = useState([]);
  const [statusText, setStatusText] = useState(null);
  const [userChooseCardName, setUserChoosenCardName] = useState(null);
  const [computerChooseCardName, setComputerCardName] = useState(null);
  const [scoreCount, setScoreCount] = useState(0);
  const [bestScore, setBestScore] = useState(
    JSON.parse(localStorage.getItem("bestScore")) || 0
  );
  const [shouldGameRestart, setShouldGameRestart] = useState(false);
  const [livesCount, setLivesCount] = useState();

  const handleUserClickOnImage = (e) => {
    const imgId = e.target.dataset.id;
    handleUserCard(imgId);
    setHasUserChoosenCard(true);
  };

  const handleGameOver = () => {
    setHasUserChoosenCard(false);
    setHasComputerChoosenCard(false);
    setComputerGuessedCard([]);
    setuserChoosenCard([]);
  };

  const handleUserCard = (id) => {
    const findUserCard = availableCards.find((card) => card.id === id);
    setUserChoosenCardName(findUserCard.name);
    setuserChoosenCard(findUserCard);
    setHasUserChoosenCard(null);
  };

  const handleComputerCard = () => {
    let computerRandomIndex = Math.floor(Math.random() * cardsArray.length);
    const computerCard = cardsArray.find(
      (card) => Number(card.id) === computerRandomIndex
    );
    setComputerCardName(computerCard.name);
    setComputerGuessedCard(computerCard);
    setHasComputerChoosenCard(true);
  };

  const handleGameRestart = () => {
    setHasUserChoosenCard(false);
    setHasComputerChoosenCard(false);
    setScoreCount(0);
    setShouldGameRestart(true);
  };

  React.useEffect(() => {
    if (hasUserChoosenCard) {
      setTimeout(handleComputerCard, 1000);
    }
  }, [hasUserChoosenCard || gameOver]);

  React.useEffect(() => {
    // condition 1
    if (userChooseCardName === computerChooseCardName) {
      setStatusText("tie");
    } else if (
      userChooseCardName === "Rock" &&
      computerChooseCardName === "Paper"
    ) {
      setStatusText("computer won");
    } else if (
      userChooseCardName === "Paper" &&
      computerChooseCardName === "Rock"
    ) {
      setScoreCount((prevScore) => prevScore + 1);
      setStatusText("you won");
    } else if (
      userChooseCardName === "Scissor" &&
      computerChooseCardName === "Paper"
    ) {
      setScoreCount((prevScore) => prevScore + 1);
      setStatusText("you won");
    } else if (
      userChooseCardName === "Paper" &&
      computerChooseCardName === "Scissor"
    ) {
      setStatusText("computer won");
    } else if (
      userChooseCardName === "Rock" &&
      computerChooseCardName === "Scissor"
    ) {
      setScoreCount((prevScore) => prevScore + 1);
      setStatusText("you won");
    } else if (
      userChooseCardName === "Scissor" &&
      computerChooseCardName === "Rock"
    ) {
      setStatusText("computer won");
    }
  }, [userChooseCardName, computerChooseCardName]);

  React.useEffect(() => {
    if (scoreCount > 10) {
      alert("maximum limit is 10 😃");
      setShouldGameRestart(true);
    } else {
      setShouldGameRestart(false);
      setBestScore(scoreCount);
      localStorage.setItem("bestScore", JSON.stringify(scoreCount));
    }
  }, [scoreCount]);

  return (
    <Context.Provider
      value={{
        scoreCount,
        hasUserChoosenCard,
        handleUserClickOnImage,
        gameOver,
        handleGameOver,
        userChoosenCard,
        computerGuessedCard,
        handleComputerCard,
        handleGameRestart,
        shouldGameRestart,
        hasComputerChoosenCard,
        statusText,
        bestScore,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
