import React, { createElement, forwardRef } from "react";
import classNames from "classnames";

export interface GridProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
  bordered?: boolean;
  color?: keyof typeof COLORS;
}

enum COLORS {
  primary = "bg-primary",
  secondary = "bg-secondary",
  danger = "bg-accent",
  contrast = "bg-contrast",
}

export const Grid = forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  const { as = "div", bordered, className, children, color, ...otherProps } = props;

  return createElement(
    as,
    {
      className: classNames(
        bordered && "border-primary border-opacity-12",
        color && COLORS[color],
        className
      ),
      ref: ref,
      ...otherProps,
    },
    children
  );
});

Grid.displayName = "Grid";

export default Grid;
