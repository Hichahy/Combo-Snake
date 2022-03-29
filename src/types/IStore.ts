export interface IStore {
  snake: {
    stopGame: boolean;
    comboActive: boolean;
    food: object;
    speed: number;
    gameOver: boolean;
    comboSplit: boolean;
    openForm: boolean;
    direction: string;
    nickname: string;
    comboCounter: number;
    widthProgress: number;
    snakeDots: [number[], number[]];
    errors: any;
    mute: boolean;
    openRecords: boolean;
    submitSend: boolean;
    showError: boolean;
    openInstruction: boolean;
    mobileMode: boolean;
  };
}
