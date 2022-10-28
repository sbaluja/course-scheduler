import React from "react";
import {
  Container,
  FooterDivider,
  RightsContainer,
} from "./Footer.styled";

const Footer: React.FC = () => {
  return (
    <Container>
      <FooterDivider />
      <RightsContainer>
        <p>© 2022 CourseClub - Team306. All Rights Reserved</p>
      </RightsContainer>
    </Container>
  );
};

export default Footer;
