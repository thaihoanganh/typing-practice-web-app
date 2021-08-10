import React, { forwardRef, useRef } from "react";
import classNames from "classnames";

export interface InputProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  fullWidth?: boolean;
  prefix?: any;
  suffix?: any;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, disabled, fullWidth, onBlur, onFocus, prefix, style, suffix, ...otherProps },
    refInput
  ) => {
    const refWrapper: React.LegacyRef<HTMLDivElement> = useRef(null);

    const onToggleFocus = () => {
      if (refWrapper.current) {
        refWrapper.current.classList.toggle("border-primary");
        refWrapper.current.classList.toggle("border-opacity-100");
        refWrapper.current.classList.toggle("hover:border-opacity-100");
      }
    };

    return (
      <div
        style={style}
        className={classNames(
          "inline-flex py-sm px-md border-2 border-contrast-secondary border-opacity-12 rounded",
          !disabled && "hover:border-opacity-24",
          fullWidth && "w-full",
          className
        )}
        ref={refWrapper}
      >
        {prefix && (
          <span
            className={classNames(
              "mr-sm text-body-1 text-contrast-secondary",
              disabled && "text-opacity-32"
            )}
          >
            {prefix}
          </span>
        )}
        <input
          type="text"
          className={classNames(
            "flex-grow outline-none bg-transparent text-body-1 text-contrast-secondary",
            disabled && "text-opacity-32 pointer-events-none"
          )}
          onFocus={(e) => {
            onToggleFocus();
            onFocus && onFocus(e);
          }}
          onBlur={(e) => {
            onToggleFocus();
            onBlur && onBlur(e);
          }}
          disabled={disabled}
          ref={refInput}
          {...otherProps}
        />
        {suffix && (
          <span
            className={classNames(
              "ml-sm text-body-1 text-contrast-secondary",
              disabled && "text-opacity-32"
            )}
          >
            {suffix}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
