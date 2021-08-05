import React from "react";
import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

export interface NavItemProps extends LinkProps {
  className?: string;
}

export const NavItem: React.FC<NavItemProps> = ({ className, children, ...otherProps }) => {
  const { asPath } = useRouter();

  return (
    <li className={classNames("inline-flex items-center p-sm", className)}>
      <Link {...otherProps}>
        <a
          className={classNames(
            "inline-flex items-center",
            asPath === otherProps.href ? "text-primary" : "text-contrast-secondary text-opacity-60"
          )}
        >
          {children}
        </a>
      </Link>
    </li>
  );
};

export default NavItem;
