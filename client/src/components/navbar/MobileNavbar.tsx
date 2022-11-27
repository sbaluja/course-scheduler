import React from "react";
import { useState } from "react";
import { Cross as Hamburger } from "hamburger-react";
import {
  HamburgerContainer,
  LogoContainer,
  NavbarContainer,
  MobileMenu,
  Header,
  LinkWrapper,
  Link,
  List,
} from "./Navbar.styled";
import { pages, activeCheck } from "./NavbarConstants";
import { NavLink } from "react-router-dom";
import { MobileNavProps } from "./Navbar.types";

const MobileNavbar: React.FC<MobileNavProps> = ({ themeType }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavbarContainer>
        <HamburgerContainer>
          <Hamburger
            color={themeType === "light" ? "black" : "white"}
            size={24}
            toggled={isOpen}
            toggle={onToggle}
          />
        </HamburgerContainer>
        <LogoContainer>
          <NavLink to="/">
            <Header>CourseClub</Header>
          </NavLink>
        </LogoContainer>
      </NavbarContainer>
      <MobileMenu onClick={() => setIsOpen(false)} isOpen={isOpen}>
        <List>
          {pages.map((page, id) => (
            <LinkWrapper key={id}>
              <Link
                isActive={activeCheck(window.location.pathname, page.link)}
                to={page.link}
              >
                {page.name}
              </Link>
            </LinkWrapper>
          ))}
        </List>
      </MobileMenu>
    </>
  );
};

export { MobileNavbar };
