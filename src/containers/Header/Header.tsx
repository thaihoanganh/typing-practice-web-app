import React from "react";
import Text from "@/components/atoms/Text";
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
            <Text variant="headline-3">Trang chủ</Text>
          </NavItem>
        </Nav>
      </NavbarBody>
    </Navbar>
  );
};

export default Header;
