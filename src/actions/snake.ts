import {
  STOP_GAME,
  RESP_FOOD,
  SPEED_UP,
  GAME_OVER,
  CHANGE_DIRECTION,
  MOVE_SNAKE,
  ENLARGE_SNAKE,
  CHECK_IF_OUT_OF_BOARDER,
  CHECK_IF_COLLAPSED,
  CHANGE_COMBO_ACTIVE,
  CHANGE_WIDTH_PROGRESS,
  CHANGE_COMBO_COUNTER,
  OPEN_FORM,
  CHANGE_COMBO_SPLIT,
  FORM_ERRORS,
  MUTE,
  SET_NICKNAME,
  OPEN_RECORDS,
  SUBMIT_SEND,
  SHOW_ERROR,
  OPEN_INSTRUCTION,
} from "../common/types";

export const handleStopGame = (stopGame: boolean) => (dispatch: any) => {
  try {
    dispatch({
      type: STOP_GAME,
      payload: { stopGame },
    });
  } catch (err) {
    console.log("err", err);
  }
};

export const handleShowError = (showError: boolean) => (dispatch: any) => {
  try {
    dispatch({
      type: SHOW_ERROR,
      payload: { showError },
    });
  } catch (err) {
    console.log("err", err);
  }
};

export const handleValidation = () => (dispatch: any, getState: any) => {
  const nickname = getState().snake.nickname;
  const snakeDots = getState().snake.snakeDots;
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

export const handleFormErrors = (errors: any) => (dispatch: any) => {
  try {
    dispatch({
      type: FORM_ERRORS,
      payload: { errors },
    });
  } catch (err) {
    console.log("err", err);
  }
};

export const setNickname = (nickname: string) => (dispatch: any) => {
  try {
    dispatch({
      type: SET_NICKNAME,
      payload: { nickname },
    });
  } catch (err) {
    console.log("err", err);
  }
};

export const handleOpenForm = (openForm: boolean) => (dispatch: any) => {
  try {
    dispatch({
      type: OPEN_FORM,
      payload: { openForm },
    });
  } catch (err) {
    console.log("err", err);
  }
};

export const handleSubmitSend = (submitSend: boolean) => (dispatch: any) => {
  try {
    dispatch({
      type: SUBMIT_SEND,
      payload: { submitSend },
    });
  } catch (err) {
    console.log("err", err);
  }
};

export const handleMute = (mute: boolean) => (dispatch: any) => {
  try {
    dispatch({
      type: MUTE,
      payload: { mute: !mute },
    });
  } catch (err) {
    console.log("err", err);
  }
};

export const handleOpenInstruction =
  (openInstruction: boolean) => (dispatch: any) => {
    try {
      dispatch({
        type: OPEN_INSTRUCTION,
        payload: { openInstruction },
      });
    } catch (err) {
      console.log("err", err);
    }
  };

export const handleOpenRecords = (openRecords: boolean) => (dispatch: any) => {
  try {
    dispatch({
      type: OPEN_RECORDS,
      payload: { openRecords: !openRecords },
    });
  } catch (err) {
    console.log("err", err);
  }
};

export const handleGameOver = () => (dispatch: any) => {
  const speed = 100;
  const direction = "RIGHT";
  const snakeDots = [
    [0, 0],
    [2, 0],
  ];
  const stopGame = false;
  const gameOver = false;
  try {
    dispatch({
      type: GAME_OVER,
      payload: { gameOver, speed, direction, stopGame, snakeDots },
    });
  } catch (err) {
    console.log("err", err);
  }
};

export const handleCoordinatesFood = () => (dispatch: any, getState: any) => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  const coordinates = [x, y];
  try {
    dispatch({
      type: RESP_FOOD,
      payload: { coordinates },
    });
  } catch (err) {
    console.log("err", err);
  }
};

export const increseSpeed =
  (speed: number) => (dispatch: any, getState: any) => {
    speed = getState().snake.speed;
    if (speed > 40) {
      speed = speed - 10;
    }

    try {
      dispatch({
        type: SPEED_UP,
        payload: { speed },
      });
    } catch (err) {
      console.log("err", err);
    }
  };

export const handleOnKeyDown = (e: any) => (dispatch: any, getState: any) => {
  e = e || window.event;
  let direction = getState().snake.direction;
  switch (e.keyCode) {
    case 38:
      if (direction !== "DOWN") {
        direction = "UP";
      }
      break;
    case 40:
      if (direction !== "UP") {
        direction = "DOWN";
      }
      break;
    case 37:
      if (direction !== "RIGHT") {
        direction = "LEFT";
      }
      break;
    case 39:
      if (direction !== "LEFT") {
        direction = "RIGHT";
      }
      break;
  }

  try {
    dispatch({
      type: CHANGE_DIRECTION,
      payload: { direction },
    });
  } catch (err) {
    console.log("err", err);
  }
};

export const handleMoveSnake = () => (dispatch: any, getState: any) => {
  const direction = getState().snake.direction;
  let snakeDots = getState().snake.snakeDots;
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
  snakeDots = dots;

  try {
    dispatch({
      type: MOVE_SNAKE,
      payload: { snakeDots },
    });
  } catch (err) {
    console.log("err", err);
  }
};

export const enlargeSnake = () => (dispatch: any, getState: any) => {
  let snakeDots = getState().snake.snakeDots;
  let comboCounter = getState().snake.comboCounter;
  let comboActive = getState().snake.comboActive;

  let newSnake = [...snakeDots];
  let counter = comboCounter;
  if (comboActive) {
    newSnake.unshift([], [], []);
    counter++;
    counter = counter;
  } else {
    newSnake.unshift([]);
  }
  snakeDots = newSnake;
  try {
    dispatch({
      type: ENLARGE_SNAKE,
      payload: { snakeDots, counter, comboActive },
    });
  } catch (err) {
    console.log("err", err);
  }
};

export const checkIfOutOfBorder = () => (dispatch: any, getState: any) => {
  let snakeDots = getState().snake.snakeDots;
  let gameOver = getState().snake.gameOver;
  let widthProgress = getState().snake.widthProgress;
  let comboActive = getState().snake.comboActive;

  let head = snakeDots[snakeDots.length - 1];
  if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
    gameOver = true;
    widthProgress = 0;
    comboActive = false;
  }

  try {
    dispatch({
      type: CHECK_IF_OUT_OF_BOARDER,
      payload: { gameOver, widthProgress, comboActive },
    });
  } catch (err) {
    console.log("err", err);
  }
};

export const checkIfCollapsed = () => (dispatch: any, getState: any) => {
  let snakeDots = getState().snake.snakeDots;
  let gameOver = getState().snake.gameOver;
  let widthProgress = getState().snake.widthProgress;
  let comboActive = getState().snake.comboActive;

  let snake = [...snakeDots];
  let head = snake[snake.length - 1];
  snake.pop();
  snake.forEach((dot) => {
    if (head[0] == dot[0] && head[1] == dot[1]) {
      gameOver = true;
      widthProgress = 0;
      comboActive = false;
    }
  });

  try {
    dispatch({
      type: CHECK_IF_COLLAPSED,
      payload: { gameOver, widthProgress, comboActive },
    });
  } catch (err) {
    console.log("err", err);
  }
};

export const changeComboActive = (comboActive: boolean) => (dispatch: any) => {
  try {
    dispatch({
      type: CHANGE_COMBO_ACTIVE,
      payload: { comboActive },
    });
  } catch (err) {
    console.log("err", err);
  }
};

export const changeWidthProgress =
  (widthProgress: number) => (dispatch: any) => {
    try {
      dispatch({
        type: CHANGE_WIDTH_PROGRESS,
        payload: { widthProgress },
      });
    } catch (err) {
      console.log("err", err);
    }
  };

export const changeComboCounter = (comboCounter: number) => (dispatch: any) => {
  try {
    dispatch({
      type: CHANGE_COMBO_COUNTER,
      payload: { comboCounter },
    });
  } catch (err) {
    console.log("err", err);
  }
};

export const changeComboSplit = (comboSplit: number) => (dispatch: any) => {
  try {
    dispatch({
      type: CHANGE_COMBO_SPLIT,
      payload: { comboSplit },
    });
  } catch (err) {
    console.log("err", err);
  }
};
