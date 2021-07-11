import React from "react";
import classNames from "classnames";

export interface NavbarBodyProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const NavbarBody: React.FC<NavbarBodyProps> = ({ className, children }) => {
  return <div className={classNames("flex items-center ml-auto", className)}>{children}</div>;
};

export default NavbarBody;
