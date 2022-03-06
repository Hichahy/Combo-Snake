import React from "react";
import { ISnake } from "../../types/types";

const Snake = ({ comboActive, snakeDots }: ISnake) => {
  return (
    <div>
      {snakeDots.map((dot: any, i: any) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`,
        };
        return (
          <div
            className={`${!comboActive ? "snake-dot" : "snake-dot-rage"}`}
            key={i}
            style={style}
          ></div>
        );
      })}
    </div>
  );
};

export default Snake;
