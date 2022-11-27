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
  @media print {
    display: none;
  }
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

export const Header = styled.h1`
  font-size: 4rem;
  text-decoration: none;

  @media ${device.laptop} {
    font-size: 3rem;
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
        opacity: 92%;
    }
`;

const fadeOut = keyframes`
    from {
      opacity: 92%;
    }
    to {
      opacity: 0%;
    }
`;

export const MobileMenu = styled.div<{ isOpen: boolean }>`
  display: flex;
  background-color: #ffffff;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: absolute;
  text-align: center;
  top: 0;
  left: 0;
  opacity: 92%;
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

export const Link = styled(NavLink)<{ isActive: boolean }>`
  text-decoration: none;
  text-transform: uppercase;
  margin: 1.5rem;
  font-size: 0.85rem;
  transition: color 0.3s ease-in-out;
  color: ${({ theme, isActive }) => isActive && theme.primary};
  border-bottom: ${({ isActive }) => isActive && "1px solid"};
  padding-bottom: 6px;
  font-weight: 500;

  :hover {
    color: ${({ theme }) => theme.primary};
  }

  @media ${device.desktopS} {
    font-size: 0.8rem;
  }

  @media ${device.laptop} {
    font-size: 1rem;
  }
`;


export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: 2rem;
  width: 8rem;
  padding-block: 2rem;
  border: 1px solid #0d6efd;
  border-radius: 2px;
`;