import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CoursesType } from "./utils/common_types";

// Pages
import { Home } from "./pages/home";
import { Courses } from "./pages/courses";

const App = () => {

  let dummyCourses: CoursesType;

    $.ajax({
      url: "http://localhost:5000/courseData",
      dataType: "json",
      async : false,
      type: "get",
      success: function(data){
        dummyCourses = data;
        console.log(dummyCourses);
      }
    });

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
