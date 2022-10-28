import styled, { keyframes } from "styled-components";
import { Link as NavLink } from "react-router-dom";
import { device } from "../../utils/device";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 1.5rem;
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
`;

export const LinkContainer = styled.nav`
  display: flex;
  padding-top: 1.75rem;
  width: 320px;
`;

export const List = styled.ul`
  display: flex;
  list-style-type: none;
  padding: 0;

  @media ${device.laptop} {
    flex-direction: column;
  }
`;

export const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Logo = styled.img`
  display: flex;
  justify-self: center;
  align-self: center;
  width: 21rem;
  height: 3.5rem;

  @media ${device.laptop} {
    width: 12rem;
    height: 2rem;
  }
`;

export const HamburgerContainer = styled.div`
  z-index: 999;
`;

const fadeIn = keyframes`
    from {
        opacity: 0%;
    }
    to {
        opacity: 85%;
    }
`;

const fadeOut = keyframes`
    from {
      opacity: 85%;
    }
    to {
      opacity: 0%;
    }
`;

export const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: absolute;
  text-align: center;
  top: 0;
  left: 0;
  opacity: 90%;
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  animation: ${({ isOpen }) => (isOpen ? fadeIn : fadeOut)} 0.5s linear;
  transition: visibility 0.5s linear;
  z-index: 998;
`;

export const LinkWrapper = styled.li`
  font-size: 1.25rem;
  text-transform: uppercase;

  @media ${device.laptop} {
    font-size: 2.5rem;
  }
`;

export const Link = styled(NavLink) <{ isActive: boolean }>`
  text-decoration: none;
  text-transform: uppercase;
  margin: 1.5rem;
  font-size: 0.85rem;
  transition: color 0.3s ease-in-out;
  color: ${({ isActive }) => isActive && "#000000"};
  border-bottom: ${({ isActive }) => isActive && "1px solid"};
  padding-bottom: 6px;
  font-weight: 500;

  :hover {
    color: #000000;
  }

  @media ${device.desktopS} {
    font-size: 0.8rem;
  }

  @media ${device.laptop} {
    font-size: 1rem;
  }
`;
