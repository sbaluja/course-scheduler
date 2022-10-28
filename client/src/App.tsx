import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import { Home } from "./pages/home";
import { Courses } from "./pages/courses";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </Router>
  );
};

export default App;
