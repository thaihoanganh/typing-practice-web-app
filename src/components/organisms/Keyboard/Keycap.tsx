import React, { useState, useEffect } from "react";
import classNames from "classnames";

import classes from "./style.module.css";

export interface KeycapProps {
  location?: number;
  keyCode?: number;
  value: string;
  subValue?: string;
}

export const Keycap: React.FC<KeycapProps> = ({ location = 0, keyCode, value }) => {
  const [state, setState] = useState({ isPressed: false });

  const onTogglePress = (e: KeyboardEvent) => {
    if (keyCode === e.keyCode && location === e.location) {
      setState((prevState) => ({ ...prevState, isPressed: !prevState.isPressed }));
    }
  };

  useEffect(() => {
    if (keyCode !== undefined) {
      window.addEventListener("keydown", onTogglePress);
      window.addEventListener("keyup", onTogglePress);
    }
    return () => {
      if (keyCode !== undefined) {
        window.removeEventListener("keydown", onTogglePress);
        window.removeEventListener("keyup", onTogglePress);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={classNames(classes.keycap, "bg-contrast bg-opacity-12", state.isPressed && "bg-opacity-32")}
      data-keycap={`${keyCode}-${location}`}
    >
      {value}
    </div>
  );
};

export default Keycap;
