import styled from "styled-components";
import { device } from "../../utils/device";
import Card from "react-bootstrap/Card";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Grid = styled.div`
  display: grid;
  margin-block: 2rem;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);

  @media ${device.desktopS} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${device.laptop} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const SelectionContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-block: 2rem 1rem;
`;
