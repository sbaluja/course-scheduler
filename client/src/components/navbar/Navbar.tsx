import React from "react";
import {
  Container,
  NavbarContainer,
  LinkContainer,
  LogoContainer,
  Logo,
  LinkWrapper,
  Link,
  List
} from "./Navbar.styled";
import { NavLink } from "react-router-dom";
import { MobileNavbar } from "./MobileNavbar";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { pages, activeCheck } from "./NavbarConstants";
import CourseClub from "../../assets/CourseClub.png";

const Navbar: React.FC = () => {
  const { width } = useWindowDimensions();

  return (
    <Container>
      {width > 1024 ? (
        <NavbarContainer>
          <LinkContainer>
            <List>
              {pages.slice(0, 3).map((page, id) => (
                <LinkWrapper key={id}>
                  <Link isActive={activeCheck(window.location.pathname, page.link)} to={page.link}>
                    {page.name}
                  </Link>
                </LinkWrapper>
              ))}
            </List>
          </LinkContainer>
          <LogoContainer>
            <NavLink to="/">
              <Logo src={CourseClub} />
            </NavLink>
          </LogoContainer>
          <LinkContainer>
            <List>
              {pages.slice(3, 6).map((page, id) => (
                <LinkWrapper key={id}>
                  <Link isActive={activeCheck(window.location.pathname, page.link)} to={page.link}>
                    {page.name}
                  </Link>
                </LinkWrapper>
              ))}
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
