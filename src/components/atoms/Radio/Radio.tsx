import React, { forwardRef } from "react";
import classNames from "classnames";

import classes from "./style.module.css";

export interface RadioProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, children, ...otherProps }, refInput) => {
    return (
      <label className={classNames(classes["input-radio-group"], className)}>
        <input type="radio" className={classes["input-radio"]} {...otherProps} ref={refInput} />
        <span className={classes["input-radio-inner"]} />
        {children && <span className={classes["input-radio-label"]}>{children}</span>}
      </label>
    );
  }
);

Radio.displayName = "Radio";

export default Radio;
