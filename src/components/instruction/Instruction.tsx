import React from "react";
import { ISnake } from "../../types/types";

const Instruction = ({ handleOpenInstruction }: ISnake) => {
  return (
    <div className="instruction-box">
      <div className="instruction">
        <p>controls:</p>
        <div>
          <kbd>↑</kbd>
          <kbd>↓</kbd>
          <kbd>←</kbd>
          <kbd>→</kbd>
        </div>
      </div>
      <div className="instruction-2">
        <p>
          if rage bar is flooded with blood, and you eat red cube, you get an
          extra 3 points. Make combos for satysfaction! Get trophy in lounge.
        </p>
        <div className="rage-bar-instruction"></div>
      </div>
      <button
        className="button-50"
        onClick={() => handleOpenInstruction(false)}
      >
        back
      </button>
    </div>
  );
};

export default Instruction;
