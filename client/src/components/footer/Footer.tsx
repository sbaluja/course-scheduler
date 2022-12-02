import React from "react";
import {
  Container,
  FooterDivider,
  RightsContainer,
  FooterText,
} from "./Footer.styled";

const Footer: React.FC = () => {
  return (
    <Container>
      <FooterDivider />
      <RightsContainer>
        <FooterText>
          © 2022 CourseClub - Team306. All Rights Reserved
        </FooterText>
      </RightsContainer>
    </Container>
  );
};

export default Footer;
