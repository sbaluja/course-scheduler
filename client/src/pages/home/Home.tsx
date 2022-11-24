import React from "react";
import { NavLink } from "react-router-dom";
import { Layout } from "../../components/layout";
import { HeroContainer, HeroText, WelcomeText } from "./Home.styled";
import Button from "react-bootstrap/Button";
import { PageProps } from "../../types/common.types";

const Home: React.FC<PageProps> = ({ themeType, toggleTheme }) => {
  return (
    <Layout themeType={themeType} toggleTheme={toggleTheme}>
      <HeroContainer>
        <HeroText>
          <WelcomeText>Welcome to&nbsp;</WelcomeText>
          <h1 className="text-primary">CourseClub!</h1>
        </HeroText>
        <NavLink to="/courses">
          <Button size="lg" variant="primary" className="mt-5">
            View Courses
          </Button>
        </NavLink>
      </HeroContainer>
    </Layout>
  );
};

export default Home;
