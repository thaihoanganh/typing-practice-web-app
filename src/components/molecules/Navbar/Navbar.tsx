import React from "react";
import classNames from "classnames";

export interface NavbarProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Navbar: React.FC<NavbarProps> = ({ className, children }) => {
  return <div className={classNames("flex h-full mx-lg", className)}>{children}</div>;
};

export default Navbar;
