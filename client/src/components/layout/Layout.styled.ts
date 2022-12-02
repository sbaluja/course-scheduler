import styled, { keyframes } from "styled-components";

export const PageContainer = styled.div`
  animation: ${keyframes`from {opacity: 0%} to {opacity: 100%}`} 0.8s linear;
  min-height: 100vh;
  position: relative;
`;
