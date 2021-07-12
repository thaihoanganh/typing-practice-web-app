import React, { forwardRef } from "react";
import classNames from "classnames";

export interface InputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  fullWidth?: boolean;
  isError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, fullWidth, isError, ...otherProps } = props;

  return (
    <input
      className={classNames(
        "px-md py-sm",
        "rounded border-2 border-opacity-60 focus:border-opacity-87",
        "bg-primary",
        "text-primary",
        "focus:outline-none",
        "disabled:bg-contrast disabled:bg-opacity-12",
        fullWidth && "w-full",
        isError ? "border-accent" : "border-primary",
        className
      )}
      ref={ref}
      {...otherProps}
    />
  );
});

Input.displayName = "Input";

export default Input;
