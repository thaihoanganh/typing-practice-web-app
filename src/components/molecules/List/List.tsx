import React, { cloneElement, Children, isValidElement } from "react";
import classNames from "classnames";

export interface ListProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  bordered?: boolean;
}

export const List: React.FC<ListProps> = ({ bordered, children, ...otherProps }) => {
  return (
    <ul {...otherProps}>
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            bordered: bordered,
            className: classNames(bordered && "border-b", bordered && index === 0 && "border-t"),
          });
        }
      })}
    </ul>
  );
};

export default List;
