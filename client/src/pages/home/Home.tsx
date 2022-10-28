import React from "react";
import axios from "axios";
import { Navbar } from "../../components/navbar";
import { PageContainer, HeroContainer, HeroText } from "./Home.styled";
import Button from "react-bootstrap/Button";

const Home: React.FC = () => {

  const submitButton = () => {
    axios({
      method: "GET",
      url: "http://localhost:5000/testButton",
    }).then((response) => {
      alert("Example response: " + response.data.title);
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
  };

  return (
    <PageContainer>
      <Navbar />
      <HeroContainer>
        <HeroText>
          <h1>Welcome to&nbsp;</h1>
          <h1 className="text-primary">CourseClub!</h1>
        </HeroText>
      </HeroContainer>
      {/* <Footer /> */}
    </PageContainer>
  );
};

export default Home;