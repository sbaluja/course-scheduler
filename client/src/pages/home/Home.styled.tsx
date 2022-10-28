import styled, { keyframes } from "styled-components";

export const PageContainer = styled.div`
    animation: ${keyframes`from {opacity: 0%} to {opacity: 100%}`} 0.8s linear;
`

export const HeroContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32rem;
`;

export const HeroText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`