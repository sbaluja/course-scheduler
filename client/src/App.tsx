import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CoursesType } from "./utils/common_types";
import { CoursesContext } from "./contexts/course-context";

// Pages
import { Home } from "./pages/home";
import { Courses } from "./pages/courses";
import { Schedule } from "./pages/schedule";

const App = () => {
  // States
  const [courses, setCourses] = useState<CoursesType>([]);
  const [coursesLoading, setCoursesLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [coursesPerPage, setCoursesPerPage] = useState<number>(200);
  const [error, setError] = useState<boolean>(false);
  const [filteredCourses, setFilteredCourses] = useState<CoursesType>([]);
  const [courseName, setCourseName] = useState("");

  // Pagination calculations
  const lastCourseIdx = currentPage * coursesPerPage;
  const firstCourseIdx = lastCourseIdx - coursesPerPage;
  const currentCourses = courses.slice(firstCourseIdx, lastCourseIdx);
  const totalCourses = courses.length;
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Filter searched courses
  const filterCourses = (query: string) => {
    setFilteredCourses(
      courses.filter((course) =>
        course.name
          .toLowerCase()
          .replace("*", "")
          .includes(query.toLowerCase().replace("*", ""))
      )
    );
  };

  const fetchCourses = () => {
    setCoursesLoading(true);

    $.ajax({
      url: "http://localhost:5000/courseData",
      dataType: "json",
      type: "get",
      success: (data) => {
        setCourses(data);
        setFilteredCourses(data);
      },
      error: () => {
        setError(true);
      },
    });
  };

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
          setError,
          filteredCourses,
          filterCourses,
          courseName,
          setCourseName,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
      </CoursesContext.Provider>
    </Router>
  );
};

export default App;
