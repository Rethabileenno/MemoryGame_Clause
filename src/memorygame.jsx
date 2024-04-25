import React, { useState, useEffect } from 'react';
import './memorygame.css';

function MemoryGame() {
  const initialGameState = {
    cards: ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D' ,'E', 'E', 'F', 'F'],
    flippedCards: [],
    timer: 0,
    score: 0,
    gameWon: false
  };

  const [gameState, setGameState] = useState(initialGameState);

  useEffect(() => {
    let shuffledCards = shuffle(gameState.cards);
    setGameState({...gameState, cards: shuffledCards});
    let interval = setInterval(() => {
      setGameState(prevState => ({...prevState, timer: prevState.timer + 1}));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const flipCard = (index) => {
    setGameState(prevState => ({...prevState, flippedCards: [...prevState.flippedCards, index]}));
  };

  useEffect(() => {
    if (gameState.flippedCards.length === 2) {
      checkMatch();
    }
  }, [gameState.flippedCards]);

  
  useEffect(() => {
    let shuffledCards = shuffle(gameState.cards);
    setGameState({...gameState, cards: shuffledCards});
    let interval = setInterval(() => {
      setGameState(prevState => ({...prevState, timer: prevState.timer + 1}));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (gameState.flippedCards.length === gameState.cards.length) {
      setGameState(prevState => ({...prevState, gameWon: true}));
    }
  }, [gameState.flippedCards]);



  const checkMatch = () => {
    if (gameState.cards[gameState.flippedCards[0]] === gameState.cards[gameState.flippedCards[1]]) {
      setGameState(prevState => ({...prevState, score: prevState.score + 1, flippedCards: []}));
    } else {
      setTimeout(() => {
        setGameState(prevState => ({...prevState, flippedCards: []}));
      }, 1000);
    }
  };

  const resetGame = () => {
    let shuffledCards = shuffle(gameState.cards);
    setGameState({...initialGameState, cards: shuffledCards});
  };

  const shuffle = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  return (
    <div className="App">
      <div className="game-board">
        {gameState.cards.map((card, index) => (
          <div
            className={`card ${gameState.flippedCards.includes(index) ? 'flipped' : ''}`}
            key={index}
            onClick={() => flipCard(index)}
          >
            {gameState.flippedCards.includes(index) && card}
          </div>
        ))}
      </div>
      <button onClick={resetGame}>Reset</button>
      <p>Time: {gameState.timer}</p>
      <p>Score: {gameState.score}</p>
      {gameState.gameWon && <div>You have won!</div>}

    </div>
  );
}

export default MemoryGame;