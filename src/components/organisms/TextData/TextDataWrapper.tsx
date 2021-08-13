import React from "react";
import classNames from "classnames";

import classes from "./style.module.css";

export const TextDataWrapper: React.FC = ({ children }) => {
  return (
    <div
      className={classNames(
        "overflow-hidden relative border border-contrast-secondary border-opacity-12 rounded",
        classes["text-data-wrapper"]
      )}
    >
      {children}
    </div>
  );
};

export default TextDataWrapper;
