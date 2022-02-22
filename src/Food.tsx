import React from "react";

export default (props: any) => {
  const style = {
    left: `${props.dot[0]}%`,
    top: `${props.dot[1]}%`,
  };

  return (
    <div
      className={`${!props.comboActive  ? "snake-food" : "snake-food-rage"}`}
      style={style}
    ></div>
  );
};
