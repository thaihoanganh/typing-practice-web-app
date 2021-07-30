import React, { createElement } from "react";
import classNames from "classnames";

export interface TextProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
  color?: keyof typeof COLORS;
  variant?: keyof typeof VARIANTS;
}

enum VARIANTS {
  "headline-1" = "text-headline-1 font-normal",
  "headline-2" = "text-headline-2 font-normal",
  "headline-3" = "text-headline-3 font-medium",
  "subtitle-1" = "text-subtitle-1 font-normal",
  "subtitle-2" = "text-subtitle-2 font-medium",
  "body-1" = "text-body-1 font-normal",
  "body-2" = "text-body-2 font-normal",
  caption = "text-caption font-normal",
  overline = "text-overline font-normal",
}

enum TAGS {
  "headline-1" = "h1",
  "headline-2" = "h2",
  "headline-3" = "h3",
  "subtitle-1" = "p",
  "subtitle-2" = "p",
  "body-1" = "span",
  "body-2" = "span",
  caption = "span",
  overline = "span",
}

enum COLORS {
  primary = "text-primary text-opacity-87",
  secondary = "text-primary text-opacity-60",
  disabled = "text-primary text-opacity-36",
  danger = "text-accent text-opacity-87",
  contrast = "text-contrast text-opacity-87",
}

export const Text: React.FC<TextProps> = ({
  as,
  className,
  children,
  color = "primary",
  variant = "body-2",
  ...otherProps
}) => {
  return createElement(
    as || TAGS[variant],
    {
      className: classNames(COLORS[color], VARIANTS[variant], className),
      ...otherProps,
    },
    children
  );
};

export default Text;
