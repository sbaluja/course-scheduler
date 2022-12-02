import styled from "styled-components";
import { device } from "../../utils/device";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 0.75rem;
`;

export const FooterDivider = styled.hr`
  width: 90%;
  border: ${({theme}) => `1px solid ${theme.primary}`} 
  /* 1px solid rgba(56, 56, 56, 0.5); */
`;

export const FooterText = styled.p`
  color: ${({theme}) => theme.primary};
`

export const RightsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 1.75rem;
  margin-bottom: 2.25rem;
  font-weight: 400;

  @media ${device.laptop} {
    margin-top: 1.5rem;
  }
`;