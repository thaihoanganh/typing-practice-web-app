import React from "react";

import Text from "@/components/atoms/Text";
import SvgIcon from "@/components/atoms/SvgIcon";
import Navbar, { NavbarBody, NavbarHeader } from "@/components/molecules/Navbar";
import Nav, { NavItem } from "@/components/organisms/Nav";

export const Header: React.FC = () => {
  return (
    <Navbar>
      <NavbarHeader>
        <Text variant="headline-2">TYPI</Text>
      </NavbarHeader>
      <NavbarBody>
        <Nav>
          <NavItem href="/">
            <SvgIcon className="desktop:mr-xs">
              <path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" />
            </SvgIcon>
            <Text className="hidden desktop:inline" variant="headline-3">
              Trang chủ
            </Text>
          </NavItem>
        </Nav>
      </NavbarBody>
    </Navbar>
  );
};

export default Header;
