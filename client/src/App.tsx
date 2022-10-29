import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CoursesType } from "./utils/common_types";

// Pages
import { Home } from "./pages/home";
import { Courses } from "./pages/courses";

const App = () => {

  const dummyCourses: CoursesType = [
    {
      term: "F22",
      status: "Open",
      name: "ACCT*1220",
      location: "Guelph",
      meeting: "Idk",
      faculty: "Obimbo",
      capacity: "22/50",
      credits: "0.5",
      level: "Undergraduate"
    },
    {
      term: "F22",
      status: "Open",
      name: "ACCT*1220",
      location: "Guelph",
      meeting: "Idk",
      faculty: "Obimbo",
      capacity: "22/50",
      credits: "0.5",
      level: "Undergraduate"
    },
    {
      term: "F22",
      status: "Open",
      name: "ACCT*1220",
      location: "Guelph",
      meeting: "Idk",
      faculty: "Obimbo",
      capacity: "22/50",
      credits: "0.5",
      level: "Undergraduate"
    },
    {
      term: "F22",
      status: "Open",
      name: "ACCT*1220",
      location: "Guelph",
      meeting: "Idk",
      faculty: "Obimbo",
      capacity: "22/50",
      credits: "0.5",
      level: "Undergraduate"
    },
    {
      term: "F22",
      status: "Open",
      name: "ACCT*1220",
      location: "Guelph",
      meeting: "Idk",
      faculty: "Obimbo",
      capacity: "22/50",
      credits: "0.5",
      level: "Undergraduate"
    },
    {
      term: "F22",
      status: "Open",
      name: "ACCT*1220",
      location: "Guelph",
      meeting: "Idk",
      faculty: "Obimbo",
      capacity: "22/50",
      credits: "0.5",
      level: "Undergraduate"
    },
    {
      term: "F22",
      status: "Open",
      name: "ACCT*1220",
      location: "Guelph",
      meeting: "Idk",
      faculty: "Obimbo",
      capacity: "22/50",
      credits: "0.5",
      level: "Undergraduate"
    },
    {
      term: "F22",
      status: "Open",
      name: "ACCT*1220",
      location: "Guelph",
      meeting: "Idk",
      faculty: "Obimbo",
      capacity: "22/50",
      credits: "0.5",
      level: "Undergraduate"
    },
    {
      term: "F22",
      status: "Open",
      name: "ACCT*1220",
      location: "Guelph",
      meeting: "Idk",
      faculty: "Obimbo",
      capacity: "22/50",
      credits: "0.5",
      level: "Undergraduate"
    },
    {
      term: "F22",
      status: "Open",
      name: "ACCT*1220",
      location: "Guelph",
      meeting: "Idk",
      faculty: "Obimbo",
      capacity: "22/50",
      credits: "0.5",
      level: "Undergraduate"
    }
  ];

  const [courses, setCourses] = useState<CoursesType>([]);

  // Todo: fetch courses
  useEffect(() => {
    setCourses(dummyCourses);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses courses={courses} />} />
      </Routes>
    </Router>
  );
};

export default App;
