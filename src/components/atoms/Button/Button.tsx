import React, { forwardRef } from "react";
import classNames from "classnames";

const COLORS = {
  primary: [
    "bg-primary disabled:bg-opacity-32",
    "bg-contrast-primary bg-opacity-0 hover:bg-opacity-8 active:bg-opacity-32",
    "text-contrast-primary",
  ],
  secondary: [
    "bg-contrast-secondary bg-opacity-8",
    "bg-contrast-secondary bg-opacity-0 hover:bg-opacity-8 active:bg-opacity-32",
    "text-contrast-secondary",
  ],
  danger: [
    "bg-danger bg-opacity-12",
    "bg-contrast-danger bg-opacity-0 hover:bg-opacity-16 active:bg-opacity-32",
    "text-danger",
  ],
};

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  color?: keyof typeof COLORS;
  fullWitdh?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, color = "primary", disabled, fullWitdh, ...otherProps }, refButton) => {
    return (
      <button
        className={classNames(
          "overflow-hidden relative rounded px-md py-sm disabled:pointer-events-none",
          COLORS[color][0],
          className,
          fullWitdh && "w-full"
        )}
        disabled={disabled}
        ref={refButton}
        {...otherProps}
      >
        <div className={classNames("absolute inset-0", COLORS[color][1])} />
        <span
          className={classNames(
            "text-button font-medium",
            COLORS[color][2],
            disabled && (color === "secondary" || color === "danger") && "text-opacity-32"
          )}
        >
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
