import React, { useState, useEffect, useRef } from "react";
import { ISnake } from "../../types/types";

const Instruction = ({ handleOpenInstruction, mobileMode }: ISnake) => {
  const [placeholder, setPlaceholder] = useState("");

  // GAME LETTER SPITTING
  const string =
    "if rage bar is flooded with blood, and you eat red cube, you get an extra 3 points. Make combos for satysfaction! Get trophy in lounge.";
  const index = useRef(0);

  useEffect(() => {
    const tick = () => {
      setPlaceholder((prev) => prev + string[index.current]);
      index.current++;
    };
    if (index.current < string.length) {
      let addChar = setInterval(tick, 30);
      return () => clearInterval(addChar);
    }
  }, [placeholder]);

  return (
    <div className="instruction-box">
      <div className="instruction">
        <p>controls:</p>
        {!mobileMode ? (
          <div>
            <kbd>↑</kbd>
            <kbd>↓</kbd>
            <kbd>←</kbd>
            <kbd>→</kbd>
          </div>
        ) : (
          <div className="mobile-btn-instruction" />
        )}
      </div>
      <div className="instruction-2">
        <p>{placeholder}</p>
      </div>
      <div className="rage-bar-instruction"></div>
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
