import React from "react";

export default (props: any) => {
  return (
    <div>
      {props.snakeDots.map((dot: any, i: any) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`,
        };
        return (
          <div
            className={`${!props.comboActive ? "snake-dot" : "snake-dot-rage"}`}
            key={i}
            style={style}
          ></div>
        );
      })}
    </div>
  );
};
