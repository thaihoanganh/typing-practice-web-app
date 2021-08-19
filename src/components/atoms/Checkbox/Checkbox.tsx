import React, { forwardRef } from "react";
import classNames from "classnames";

import classes from "./style.module.css";

export interface CheckboxProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, children, ...otherProps }, refInput) => {
    return (
      <label className={classNames(classes["input-checkbox-group"], className)}>
        <input
          type="checkbox"
          className={classes["input-checkbox"]}
          {...otherProps}
          ref={refInput}
        />
        <span className={classes["input-checkbox-inner"]} />
        {children && <span className={classes["input-checkbox-label"]}>{children}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
