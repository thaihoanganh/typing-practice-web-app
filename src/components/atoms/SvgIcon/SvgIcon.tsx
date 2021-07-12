import React from "react";
import classNames from "classnames";

export interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  color?: keyof typeof COLORS;
  size?: keyof typeof SIZES;
}

enum SIZES {
  small = "w-4 h-4",
  medium = "w-6 h-6",
  large = "w-8 h-8",
}

enum COLORS {
  primary = "text-primary text-opacity-87",
  secondary = "text-primary text-opacity-60",
  danger = "text-accent text-opacity-87",
}

export const SvgIcon: React.FC<SvgIconProps> = ({
  className,
  children,
  color = "primary",
  size = "medium",
  ...otherProps
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={classNames("fill-current", COLORS[color], SIZES[size], className)}
      {...otherProps}
    >
      {children}
    </svg>
  );
};

export default SvgIcon;
