export interface ISnake {
  stopGame: boolean;
  gameOver: boolean;
  comboActive: boolean;
  comboSplit: boolean;
  food: any;
  speed: number;
  comboCounter: number;
  widthProgress: number;
  direction: string;
  snakeDots: [number[], number[]];
  openForm: boolean;
  openRecords: boolean;
  submitSend: boolean;
  showError: boolean;
  mute: boolean;
  nickname: string;
  errors: any;
  openInstruction: boolean;
  mobileMode: boolean;
  handleStopGame: (stopGame: boolean) => void;
  changeComboSplit: (comboSplit: boolean) => void;
  changeComboActive: (comboActive: boolean) => void;
  handleCoordinatesFood: () => void;
  increseSpeed: (speed: number) => void;
  changeWidthProgress: (widthProgress: number) => void;
  changeComboCounter: (comboCounter: number) => void;
  handleMute: (mute: boolean) => void;
  handleOpenRecords: (openRecords: boolean) => void;
  handleOpenInstruction: (openInstruction: boolean) => void;
  handleOnKeyDown: () => void;
  handleOnKeyDownMobile: () => void;
  handleMoveSnake: () => void;
  enlargeSnake: () => void;
  checkIfOutOfBorder: () => void;
  checkIfCollapsed: () => void;
  setNickname: (nickname: string) => void;
  handleOpenForm: (openForm: boolean) => void;
  handleFormErrors: (errors: any) => void;
  handleValidation: () => void;
  handleGameOver: () => void;
  handleSubmitSend: (submitSend: boolean) => void;
  handleShowError: (showError: boolean) => void;
  toggleMobileMode: (mobileMode: boolean) => void;
}
