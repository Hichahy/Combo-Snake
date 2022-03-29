import typeToReducer from "type-to-reducer";
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
  VALIDATION,
  SET_NICKNAME,
  OPEN_RECORDS,
  SUBMIT_SEND,
  SHOW_ERROR,
  OPEN_INSTRUCTION,
  MOBILE_MODE,
  CHANGE_DIRECTION_MOBILE
} from "../common/types";

interface stateSnake {
  stopGame: boolean;
  gameOver: boolean;
  comboActive: boolean;
  submitSend: boolean;
  food: any;
  speed: number;
  direction: string;
  snakeDots: [number[], number[]];
  comboCounter: number;
  widthProgress: number;
  comboSplit: boolean;
  openForm: boolean;
  openRecords: boolean;
  mute: boolean;
  errors: any;
  nickname: string;
  showError: boolean;
  openInstruction: boolean;
  mobileMode: boolean;
}

const initialState: stateSnake = {
  stopGame: false,
  gameOver: false,
  food: {},
  speed: 100,
  direction: "RIGHT",
  snakeDots: [
    [0, 0],
    [2, 0],
  ],
  comboCounter: 0,
  comboActive: false,
  widthProgress: 0,
  comboSplit: false,
  openForm: false,
  errors: {},
  mute: false,
  nickname: "",
  openRecords: false,
  openInstruction: false,
  submitSend: false,
  showError: false,
  mobileMode: false,
};

export const user = typeToReducer(
  {
    [STOP_GAME]: (state: stateSnake, action: any) => ({
      ...state,
      stopGame: action.payload.stopGame,
    }),

    [MOBILE_MODE]: (state: stateSnake, action: any) => ({
      ...state,
      mobileMode: action.payload.mobileMode,
    }),

    [OPEN_INSTRUCTION]: (state: stateSnake, action: any) => ({
      ...state,
      openInstruction: action.payload.openInstruction,
    }),

    [SET_NICKNAME]: (state: stateSnake, action: any) => ({
      ...state,
      nickname: action.payload.nickname,
    }),

    [VALIDATION]: (state: stateSnake, action: any) => ({
      ...state,
      errors: action.payload.errors,
    }),

    [OPEN_RECORDS]: (state: stateSnake, action: any) => ({
      ...state,
      openRecords: action.payload.openRecords,
    }),

    [GAME_OVER]: (state: stateSnake, action: any) => ({
      ...state,
      gameOver: action.payload.gameOver,
      speed: action.payload.speed,
      direction: action.payload.direction,
      snakeDots: action.payload.snakeDots,
      stopGame: action.payload.stopGame,
    }),

    [RESP_FOOD]: (state: stateSnake, action: any) => ({
      ...state,
      food: action.payload.coordinates,
    }),

    [SPEED_UP]: (state: stateSnake, action: any) => ({
      ...state,
      speed: action.payload.speed,
    }),

    [CHANGE_DIRECTION]: (state: stateSnake, action: any) => ({
      ...state,
      direction: action.payload.direction,
    }),

    [CHANGE_DIRECTION_MOBILE]: (state: stateSnake, action: any) => ({
      ...state,
      direction: action.payload.direction,
    }),

    [MOVE_SNAKE]: (state: stateSnake, action: any) => ({
      ...state,
      snakeDots: action.payload.snakeDots,
    }),

    [ENLARGE_SNAKE]: (state: stateSnake, action: any) => ({
      ...state,
      comboCounter: action.payload.counter,
      comboActive: action.payload.comboActive,
      snakeDots: action.payload.snakeDots,
    }),

    [CHECK_IF_OUT_OF_BOARDER]: (state: stateSnake, action: any) => ({
      ...state,
      gameOver: action.payload.gameOver,
      widthProgress: action.payload.widthProgress,
      comboActive: action.payload.comboActive,
    }),

    [CHECK_IF_COLLAPSED]: (state: stateSnake, action: any) => ({
      ...state,
      gameOver: action.payload.gameOver,
      widthProgress: action.payload.widthProgress,
      comboActive: action.payload.comboActive,
    }),

    [CHANGE_COMBO_ACTIVE]: (state: stateSnake, action: any) => ({
      ...state,
      comboActive: action.payload.comboActive,
    }),

    [CHANGE_WIDTH_PROGRESS]: (state: stateSnake, action: any) => ({
      ...state,
      widthProgress: action.payload.widthProgress,
    }),

    [CHANGE_COMBO_COUNTER]: (state: stateSnake, action: any) => ({
      ...state,
      comboCounter: action.payload.comboCounter,
    }),

    [CHANGE_COMBO_SPLIT]: (state: stateSnake, action: any) => ({
      ...state,
      comboSplit: action.payload.comboSplit,
    }),

    [SHOW_ERROR]: (state: stateSnake, action: any) => ({
      ...state,
      showError: action.payload.showError,
    }),

    [OPEN_FORM]: (state: stateSnake, action: any) => ({
      ...state,
      openForm: action.payload.openForm,
    }),

    [FORM_ERRORS]: (state: stateSnake, action: any) => ({
      ...state,
      errors: action.payload.errors,
    }),

    [MUTE]: (state: stateSnake, action: any) => ({
      ...state,
      mute: action.payload.mute,
    }),

    [SUBMIT_SEND]: (state: stateSnake, action: any) => ({
      ...state,
      submitSend: action.payload.submitSend,
    }),
  },
  initialState
);

export default user;
