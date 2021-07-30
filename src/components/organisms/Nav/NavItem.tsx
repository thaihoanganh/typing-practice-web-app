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
    <li className={classNames("flex items-center py-sm px-md last:pr-0", className)}>
      <Link {...otherProps}>
        <a className="inline-flex items-center">
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
