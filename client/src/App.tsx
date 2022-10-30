import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CoursesType } from "./utils/common_types";
import { CoursesContext } from "./contexts/course-context";

// Pages
import { Home } from "./pages/home";
import { Courses } from "./pages/courses";

const App = () => {

  // States
  const [courses, setCourses] = useState<CoursesType>([]);
  const [coursesLoading, setCoursesLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [coursesPerPage, setCoursesPerPage] = useState<number>(200);
  const [error, setError] = useState<boolean>(false);

  // Pagination calculations
  const lastCourseIdx = currentPage * coursesPerPage;
  const firstCourseIdx = lastCourseIdx - coursesPerPage;
  const currentCourses = courses.slice(firstCourseIdx, lastCourseIdx);
  const totalCourses = courses.length;
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const fetchCourses = () => {
    setCoursesLoading(true);

    $.ajax({
      url: "http://localhost:5000/courseData",
      dataType: "json",
      type: "get",
      success: (data) => {
        setCourses(data)
      },
      error: () => {
        setError(true)
      }
    });

    setCoursesLoading(false);
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Router>
      <CoursesContext.Provider
        value={{
          currentCourses,
          coursesPerPage,
          totalCourses,
          currentPage,
          paginate,
          setCourses,
          coursesLoading,
          setCoursesLoading,
          error,
          setError
        }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </CoursesContext.Provider>
    </Router>
  );
};

export default App;
