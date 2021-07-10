import React from "react";
import classNames from "classnames";

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  fullWidth?: boolean;
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
}

enum SIZES {
  small = "py-xs px-sm",
  medium = "py-sm px-md",
  large = "py-md px-lg",
}

enum VARIANTS {
  container = "bg-contrast bg-opacity-87 hover:bg-opacity-100 disabled:bg-opacity-36 text-contrast",
  text = "hover:bg-contrast hover:bg-opacity-12 disabled:text-opacity-36 text-primary",
}

export const Button: React.FC<ButtonProps> = ({
  className,
  children,
  fullWidth,
  variant = "container",
  size = "medium",
  ...otherProps
}) => {
  return (
    <button
      className={classNames(
        "rounded text-button font-medium",
        "disabled:pointer-events-none",
        fullWidth && "w-full",
        variant && VARIANTS[variant],
        size && SIZES[size],
        className
      )}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
