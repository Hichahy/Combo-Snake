import React from "react";
import { ISnake } from "../../types/types";

const Food = ({ comboActive, food }: ISnake) => {
  const style = {
    left: `${food[0]}%`,
    top: `${food[1]}%`,
  };
  return (
    <div>
      <div
        className={`${!comboActive ? "snake-food" : "snake-food-rage"}`}
        style={style}
      ></div>
    </div>
  );
};

export default Food;
