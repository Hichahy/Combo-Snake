import React, { useState, useEffect } from "react";
import Snake from "./Snake";
import Food from "./Food";
import firebaseAxios from "./firebaseAxios";
import axios from "axios";


const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};
const audio = new Audio("/sound/music.mp3");
const wow = new Audio("/sound/wow.wav");
const crash = new Audio("/sound/crash.mp3");
const cash = new Audio("/sound/cash.mp3");
const boom = new Audio("/sound/boom.wav");

const App = () => {
  const [food, setFood] = useState(getRandomCoordinates());
  const [speed, setSpeed] = useState(100);
  const [direction, setDirection] = useState("RIGHT");
  const [stopGame, setStopGame] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [snakeDots, setSnakeDots] = useState([
    [0, 0],
    [2, 0],
  ]);
  const [openForm, setOpenForm] = useState(false);
  const [openRecords, setOpenRecords] = useState(false);
  const [records, setRecords] = useState<any>([]);
  const [recordsNoobs, setRecordsNoobs] = useState<any>([]);
  const [loadingRecords, setLodingRecords] = useState(true);
  const [nickname, setNickname] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [submitSend, setSubmitSend] = useState(false);
  const [showError, setShowError] = useState(true);
  const [mute, setMute] = useState(false);
  const [comboActive, setComboActive] = useState(false);
  const [widthProgress, setWidthProgress] = useState(0);
  const [comboCounter, setComboCounter] = useState(0);
  const [comboSplit, setComboSplit] = useState(false);

  let IntervalSnakeMove: NodeJS.Timer;
  let errorTime: NodeJS.Timer;
  let progressTime: NodeJS.Timer;
  const progressBar = document.getElementById("progress");

  const onKeyDown = (e: any) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        if (direction !== "DOWN") {
          setDirection("UP");
        }
        break;
      case 40:
        if (direction !== "UP") {
          setDirection("DOWN");
        }
        break;
      case 37:
        if (direction !== "RIGHT") {
          setDirection("LEFT");
        }
        break;
      case 39:
        if (direction !== "LEFT") {
          setDirection("RIGHT");
        }
        break;
    }
  };

  const moveSnake = () => {
    let dots = [...snakeDots];
    let head = dots[dots.length - 1];

    switch (direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
    }
    dots.push(head);
    dots.shift();
    setSnakeDots(dots);
  };

  const recordsAllPlayers = () => {
    setRecordsNoobs(records.splice(3));
  };

  const checkIfOutOfBorder = () => {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      setGameOver(true);
      setWidthProgress(0);
      setComboActive(false);
    }
  };

  const checkIfCollapesed = () => {
    let snake = [...snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        setGameOver(true);
        setWidthProgress(0);
        setComboActive(false);
      }
    });
  };

  useEffect(() => {
    if (comboActive) {
      progressTime = setInterval(() => {
        setWidthProgress(widthProgress - 0.333 * 100);
      }, 1000);
      return () => clearTimeout(progressTime);
    }
  }, [comboActive, widthProgress]);

  if (progressBar) {
    progressBar.style.width = `${widthProgress}%`;
  }

  useEffect(() => {
    if (widthProgress < 1) {
      setComboCounter(0);
      setComboActive(false);
    }
  }, [widthProgress]);

  const checkIfEat = () => {
    let head = snakeDots[snakeDots.length - 1];
    let snack = food;
    if (head[0] == snack[0] && head[1] == snack[1]) {
      setWidthProgress(100);
      // setComboCounter(0);
      setComboSplit(true);
      setFood(getRandomCoordinates());
      enlargeSnake();
      increseSpeed();
      setComboActive(true);
      if (comboActive) {
        wow.currentTime = 0;
        wow.play();
      } else {
        cash.currentTime = 0;
        cash.play();
      }
    }
  };

  const enlargeSnake = () => {
    let newSnake = [...snakeDots];
    let counter = comboCounter;
    if (comboActive) {
      newSnake.unshift([], [], []);
      counter++;
      setComboCounter(counter);
    } else {
      newSnake.unshift([]);
    }
    setSnakeDots(newSnake);
  };

  const onGameOver = () => {
    setSnakeDots([
      [0, 0],
      [2, 0],
    ]);
    setDirection("RIGHT");
    setSpeed(100);
    setGameOver(false);
    setStopGame(false);
  };

  const increseSpeed = () => {
    if (speed > 40) {
      setSpeed(speed - 10);
    }
  };

  const handleNickname = (e: any) => {
    e.preventDefault();
    setNickname(e.target.value);
  };

  const sendRecord = () => {
    const Data = {
      record: {
        name: nickname,
        score: snakeDots.length - 2,
      },
    };
    firebaseAxios.post("/records.json", Data).then((response) => {
      console.log(response);
      onGameOver();
    });
  };

  const handleStart = () => {
    setStopGame(!stopGame);
    audio.currentTime = 0;
    boom.currentTime = 0;
    // audio.volume = 0.1;
    boom.play();
    audio.play();
    audio.loop = true;
  };

  //FILTER RECORDS FROM HIGH SCORE
  let highestToLowest = records.sort(
    (a: { record: { score: number } }, b: { record: { score: number } }) =>
      b.record.score - a.record.score
  );

  const handleValidation = () => {
    const errors: any = {};

    if (!nickname.trim()) {
      errors.nickname = "required name";
    } else if (!/^[A-Za-z]+/.test(nickname.trim())) {
      errors.nickname = "invalid name";
    } else if (nickname.length > 8) {
      errors.nickname = "name is too long";
    } else if (snakeDots.length - 2 === 0) {
      errors.nickname = "you need to get more points";
    }
    return errors;
  };

  const handleSubmit = () => {
    setErrors(handleValidation());
    setSubmitSend(true);
    setShowError(true);
  };

  const handleMute = () => {
    setMute(!mute);
  };

  //SEND DATA TO FIREBASE IF NO ERRORS
  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitSend) {
      setOpenForm(false);
      setSubmitSend(false);
      setNickname("");
      sendRecord();
    }
  }, [errors, submitSend]);

  //ERROR SHOW AND HIDE TIME
  useEffect(() => {
    if (errors.nickname) {
      errorTime = setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
    return () => clearTimeout(errorTime);
  }, [errors]);

  //MOVE SNAKE
  useEffect(() => {
    if (stopGame && gameOver === false) {
      IntervalSnakeMove = setInterval(() => {
        moveSnake();
        document.onkeydown = onKeyDown;
      }, speed);
      return () => clearInterval(IntervalSnakeMove);
    }
  });

  //SNAKE BEHAVIOR
  useEffect(() => {
    checkIfOutOfBorder();
    checkIfCollapesed();
    checkIfEat();
  });

  // GET DATA AXIOS
  useEffect(() => {
    axios
      .get(
        "https://snake-d6542-default-rtdb.europe-west1.firebasedatabase.app/records.json"
      )
      .then((res) => {
        const records = [];
        for (const key in res.data) {
          records.push({
            ...res.data[key],
            id: key,
          });
        }
        console.log("loading reocrds complete 200");
        setRecords(records);
        setLodingRecords(false);
        recordsAllPlayers();
      })
      .catch(() => {
        setLodingRecords(false);
      });
  }, [openRecords, submitSend]);

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
    } else {
      audio.muted = false;
      wow.muted = false;
      crash.muted = false;
      cash.muted = false;
    }
  }, [mute]);

  useEffect(() => {
    setTimeout(() => {
      setComboSplit(false);
    }, 300);
  }, [food]);

  console.log(`startGame`, stopGame);
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
        {openRecords ? (
          <div className="records">
            {loadingRecords ? (
              <div className="loading-box">
                <p>loading...</p>
              </div>
            ) : (
              <div className="records-box">
                <ol>
                  <li>
                    <img
                      src="/images/trophy/trophy1.png"
                      alt="trophy image"
                    ></img>
                    <p>{records[0].record.name}</p>
                    <p>{records[0].record.score}</p>
                  </li>
                  <li>
                    <img
                      src="/images/trophy/trophy2.png"
                      alt="trophy image"
                    ></img>
                    <p>{records[1].record.name}</p>
                    <p>{records[1].record.score}</p>
                  </li>
                  <li>
                    <img
                      src="/images/trophy/trophy3.png"
                      alt="trophy image"
                    ></img>
                    <p>{records[2].record.name}</p>
                    <p>{records[2].record.score}</p>
                  </li>
                  {recordsNoobs.map((i: any) => (
                    <li key={i.id}>
                      <p>{i.record.name}</p>
                      <p>{i.record.score}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            <button className="button-50" onClick={() => setOpenRecords(false)}>
              back
            </button>
          </div>
        ) : null}
        {gameOver && stopGame && !openForm ? (
          <div className="overlay">
            <h1 className="game-over">Game Over</h1>
            <h1 className="game-over">Score {snakeDots.length - 2}</h1>
            <button className="button-50" onClick={() => onGameOver()}>
              try again
            </button>
            <button className="button-50" onClick={() => setOpenForm(true)}>
              send record
            </button>
          </div>
        ) : null}
        {openForm === true ? (
          <div className="overlay">
            {errors.nickname && (
              <span className={`${showError ? "error" : "error-hidden"}`}>
                {errors.nickname}
              </span>
            )}
            <input
              type="text"
              value={nickname}
              placeholder="nickname"
              onChange={handleNickname}
            />
            <button className="button-50" onClick={() => handleSubmit()}>
              send
            </button>
            <button className="button-50" onClick={() => setOpenForm(false)}>
              back
            </button>
          </div>
        ) : null}
        {stopGame ? (
          <>
            <Snake comboActive={comboActive} snakeDots={snakeDots} />
            <Food comboActive={comboActive} dot={food} />
          </>
        ) : (
          <div className="menu-box">
            <button className="button-50" onClick={handleStart}>
              start
            </button>
            <button
              className="button-50"
              onClick={() => setOpenRecords(!openRecords)}
            >
              records
            </button>
            <i
              className={`${
                !mute
                  ? "bi bi-volume-mute-fill mute"
                  : "bi bi-volume-mute-fill mute-on"
              }`}
              onClick={handleMute}
            ></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
