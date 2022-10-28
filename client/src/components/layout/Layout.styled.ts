import styled, { keyframes } from "styled-components";
import { device } from "../../utils/device";

// NOTE: May have to change the height to a styled component variable if other pages require heights greater than 100vh
export const PageContainer = styled.div`
  animation: ${keyframes`from {opacity: 0%} to {opacity: 100%}`} 0.8s linear;
  min-height: 100vh;
  position: relative;
`;

// Wrap PageHeader inside HeaderContainer to receive centering & margins
export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;

  @media ${device.laptop} {
    margin-top: 1.875rem;
  }
`;

export const PageHeader = styled.span`
  font-weight: 200;
  font-size: 2.5rem;

  @media ${device.laptop} {
    font-size: 2.25rem;
  }

  @media ${device.tabletL} {
    font-size: 2rem;
  }

  @media ${device.tabletS} {
    font-size: 1.75rem;
  }

  @media ${device.mobileM} {
    font-size: 1.5rem;
  }
`;
