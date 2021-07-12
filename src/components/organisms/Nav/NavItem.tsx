import React, { Children, cloneElement, isValidElement } from "react";
import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

export interface NavItemProps extends LinkProps {
  className?: string;
}

export const NavItem: React.FC<NavItemProps> = ({ className, children, ...otherProps }) => {
  const { asPath } = useRouter();

  return (
    <li className={classNames("p-sm", className)}>
      <Link {...otherProps}>
        <a>
          {Children.map(children, (child) => {
            if (isValidElement(child)) {
              return cloneElement(child, {
                color: asPath === otherProps.href ? "primary" : "secondary",
              });
            }
          })}
        </a>
      </Link>
    </li>
  );
};

export default NavItem;
