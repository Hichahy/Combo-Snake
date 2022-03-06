import React, { useState, useEffect } from "react";
import Snake from "../snake";
import Food from "../food";
import Records from "../records";
import Form from "../form";
import Instruction from "../instruction";
import { ISnake } from "../../types/types";

const audio = new Audio("/sound/music.mp3");
const wow = new Audio("/sound/wow.wav");
const crash = new Audio("/sound/crash.mp3");
const cash = new Audio("/sound/cash.mp3");
const boom = new Audio("/sound/boom.wav");

const Game = ({
  stopGame,
  food,
  speed,
  gameOver,
  comboSplit,
  snakeDots,
  widthProgress,
  openForm,
  comboActive,
  comboCounter,
  mute,
  openRecords,
  openInstruction,
  handleOpenInstruction,
  handleMute,
  handleCoordinatesFood,
  handleStopGame,
  increseSpeed,
  handleGameOver,
  handleOnKeyDown,
  handleMoveSnake,
  enlargeSnake,
  checkIfOutOfBorder,
  checkIfCollapsed,
  changeComboActive,
  changeWidthProgress,
  changeComboCounter,
  changeComboSplit,
  handleOpenForm,
  handleOpenRecords,
}: ISnake) => {
  let IntervalSnakeMove: NodeJS.Timer;

  let progressTime: NodeJS.Timer;
  const progressBar = document.getElementById("progress");

  const checkIfEat = () => {
    let head = snakeDots[snakeDots.length - 1];
    let snack = food;
    if (head[0] == snack[0] && head[1] == snack[1]) {
      changeWidthProgress(100);
      changeComboSplit(true);
      handleCoordinatesFood();
      enlargeSnake();
      increseSpeed(speed);
      changeComboActive(true);
      if (comboActive) {
        wow.currentTime = 0;
        wow.play();
      } else {
        cash.currentTime = 0;
        cash.play();
      }
    }
  };

  const handleStart = () => {
    handleStopGame(!stopGame);
    audio.currentTime = 0;
    boom.currentTime = 0;
    boom.play();
    audio.play();
    audio.loop = true;
    handleCoordinatesFood();
  };

  useEffect(() => {
    if (comboActive) {
      progressTime = setInterval(() => {
        changeWidthProgress(widthProgress - 0.333 * 100);
      }, 1000);
      return () => clearTimeout(progressTime);
    }
  }, [comboActive, widthProgress]);

  if (progressBar) {
    progressBar.style.width = `${widthProgress}%`;
  }

  useEffect(() => {
    if (widthProgress < 1) {
      changeComboCounter(0);
      changeComboActive(false);
    }
  }, [widthProgress]);

  //MOVE SNAKE
  useEffect(() => {
    if (stopGame && gameOver === false) {
      IntervalSnakeMove = setInterval(() => {
        document.onkeydown = handleOnKeyDown;
        handleMoveSnake();
      }, speed);
      return () => clearInterval(IntervalSnakeMove);
    }
  });

  //SNAKE BEHAVIOR
  useEffect(() => {
    if (gameOver === false && stopGame === true) {
      checkIfOutOfBorder();
      checkIfCollapsed();
      checkIfEat();
    }
  });

  //MUSIC
  useEffect(() => {
    if (gameOver) {
      crash.play();
      audio.pause();
    }
  }, [gameOver]);

  useEffect(() => {
    if (mute) {
      audio.muted = true;
      wow.muted = true;
      crash.muted = true;
      cash.muted = true;
      boom.muted = true;
    } else {
      audio.muted = false;
      wow.muted = false;
      crash.muted = false;
      cash.muted = false;
      boom.muted = false;
    }
  }, [mute]);

  //COMBO SPLITING
  useEffect(() => {
    setTimeout(() => {
      changeComboSplit(false);
    }, 300);
  }, [food]);

  return (
    <div className="game-container">
      <div className="info-box">
        <h1 className="score">score {snakeDots.length - 2}</h1>
        <div className="rage-box">
          {comboCounter >= 1 && (
            <label className="combo">combo x{comboCounter}</label>
          )}
          <div className="box-progress">
            <label>rage</label>
            <div className={`${comboActive ? "rage-bar-active" : "rage-bar"}`}>
              {comboActive && <div id="progress" className="progress"></div>}
            </div>
          </div>
        </div>
      </div>
      <div className={`${stopGame ? "game-area" : "game-area-inside"}`}>
        {comboCounter >= 1 && (
          <p className={`${comboSplit ? "combo-split" : "combo-split-out"}`}>
            {comboCounter}
          </p>
        )}
        {openRecords ? <Records /> : null}
        {openInstruction ? <Instruction /> : null}
        {gameOver && stopGame && !openForm ? (
          <div className="overlay">
            <h1 className="game-over">Game Over</h1>
            <h1 className="game-over">Score {snakeDots.length - 2}</h1>
            <button className="button-50" onClick={() => handleGameOver()}>
              try again
            </button>
            <button className="button-50" onClick={() => handleOpenForm(true)}>
              send record
            </button>
          </div>
        ) : null}
        {openForm === true ? <Form /> : null}
        {stopGame ? (
          <>
            <Snake />
            <Food />
          </>
        ) : (
          <div className="menu-box">
            <button className="button-50" onClick={handleStart}>
              start
            </button>
            <button
              className="button-50"
              onClick={() => handleOpenRecords(openRecords)}
            >
              records
            </button>
            <button
              className="button-50"
              onClick={() => handleOpenInstruction(true)}
            >
              instruction
            </button>
            <i
              className={`${
                !mute
                  ? "bi bi-volume-mute-fill mute"
                  : "bi bi-volume-mute-fill mute-on"
              }`}
              onClick={() => handleMute(mute)}
            ></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
