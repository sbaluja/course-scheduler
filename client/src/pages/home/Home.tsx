import React from "react";
import { NavLink } from "react-router-dom";
import { Layout } from "../../components/layout";
import { HeroContainer, HeroText } from "./Home.styled";
import Button from "react-bootstrap/Button";

const Home: React.FC = () => {
  return (
    <Layout>
      <HeroContainer>
        <HeroText>
          <h1>Welcome to&nbsp;</h1>
          <h1 className="text-primary">CourseClub!</h1>
        </HeroText>
        <NavLink to="/courses">
          <Button size="lg" variant="primary" className="mt-5">View Courses</Button>
        </NavLink>
      </HeroContainer>
    </Layout>
  );
};

export default Home;