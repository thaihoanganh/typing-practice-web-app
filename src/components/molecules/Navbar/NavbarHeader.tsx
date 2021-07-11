import React from "react";
import classNames from "classnames";

export interface NavbarHeaderProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const NavbarHeader: React.FC<NavbarHeaderProps> = ({ className, children }) => {
  return <div className={classNames("flex items-center h-full", className)}>{children}</div>;
};

export default NavbarHeader;
