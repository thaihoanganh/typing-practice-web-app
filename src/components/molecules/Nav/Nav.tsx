import React, { Children, isValidElement, cloneElement } from "react";

export const Nav: React.FC = ({ children }) => {
  return (
    <ul className="inline-flex p-sm">
      {Children.map(
        children,
        (child) =>
          isValidElement(child) &&
          cloneElement(child, {
            className: "mx-sm",
          })
      )}
    </ul>
  );
};

export default Nav;
