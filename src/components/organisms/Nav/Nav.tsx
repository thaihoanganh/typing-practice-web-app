import React from "react";

export interface NavProps {
  children?: React.ReactNode;
}

export const Nav: React.FC<NavProps> = ({ children }) => {
  return <ul className="flex">{children}</ul>;
};

export default Nav;
