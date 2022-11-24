import React from "react";
import {
  Container,
  NavbarContainer,
  LinkContainer,
  LogoContainer,
  Header,
  LinkWrapper,
  Link,
  List,
} from "./Navbar.styled";
import { NavLink } from "react-router-dom";
import { MobileNavbar } from "./MobileNavbar";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { pages, activeCheck } from "./NavbarConstants";
import { NavProps } from "./Navbar.types";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const Navbar: React.FC<NavProps> = ({ themeType, toggleTheme }) => {
  const { width } = useWindowDimensions();

  return (
    <Container>
      {width > 1024 ? (
        <NavbarContainer>
          <LinkContainer>
            <List>
              {pages.slice(0, 3).map((page, id) => (
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
          </LinkContainer>
          <LogoContainer>
            <NavLink to="/" style={{ textDecoration: "none" }}>
              <Header>CourseClub</Header>
            </NavLink>
          </LogoContainer>
          <LinkContainer>
            <List>
              {pages.slice(3, 6).map((page, id) => (
                <LinkWrapper key={id}>
                  <Link
                    isActive={activeCheck(window.location.pathname, page.link)}
                    to={page.link}
                  >
                    {page.name}
                  </Link>
                </LinkWrapper>
              ))}
              <IconButton onClick={toggleTheme}>
                {themeType === "light" ? (
                  <DarkModeIcon sx={{ color: "#000000" }} />
                ) : (
                  <LightModeIcon sx={{ color: "#FFFFFF" }} />
                )}
              </IconButton>
            </List>
          </LinkContainer>
        </NavbarContainer>
      ) : (
        <MobileNavbar />
      )}
    </Container>
  );
};

export default Navbar;
