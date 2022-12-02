import styled, { keyframes } from "styled-components";
import { device } from "../../utils/device";

export const PageContainer = styled.div`
  animation: ${keyframes`from {opacity: 0%} to {opacity: 100%}`} 0.8s linear;
`;

export const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 44rem;

  @media ${device.desktopS} {
    height: 40rem;
  }

  @media ${device.laptop} {
    height: 42rem;
  }
`;

export const WelcomeText = styled.h1`
  color: ${({ theme }) => theme.primary};
`;

export const HeroText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
