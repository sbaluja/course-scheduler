import React from "react";
import axios from "axios";
import { Navbar } from "../../components/navbar";

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
    <>
      <Navbar />
    </>
  );
};

export default Home;