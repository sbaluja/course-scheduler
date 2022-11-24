import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CoursesType } from "./utils/common_types";
import { CoursesContext } from "./contexts/course-context";
import { ThemeProvider } from "styled-components";
import { light, dark } from "./components/theme/Themes";
import GlobalStyle from "./components/theme/globalStyles";

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
  const [term, setTerm] = useState("winter");

  // Pagination calculations
  const lastCourseIdx = currentPage * coursesPerPage;
  const firstCourseIdx = lastCourseIdx - coursesPerPage;
  const currentCourses = courses.slice(firstCourseIdx, lastCourseIdx);
  const totalCourses = courses.length;
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Themeing
  const localTheme = localStorage.getItem("theme") ?? "dark";

  const [theme, setTheme] = useState<string>(localTheme);

  const toggleTheme = (): void => {
    const toggledTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", toggledTheme);
    setTheme(toggledTheme);
  };

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

  // Filter courses by days
  const filterCoursesByDay = (query: string[]) => {
    setFilteredCourses(
      courses.filter((course) => {
        const regexp = /(?<=LEC |LAB |SEM ).+?(?=[0-9])/g;
        const result = course.meeting.match(regexp);

        if (result != null) {
          for (let i = 0; i < result.length; i++) {
            if (result[i].includes("Mon") && !query.includes("Monday"))
              return false;
            if (result[i].includes("Tues") && !query.includes("Tuesday"))
              return false;
            if (result[i].includes("Wed") && !query.includes("Wednesday"))
              return false;
            if (result[i].includes("Thur") && !query.includes("Thursday"))
              return false;
            if (result[i].includes("Fri") && !query.includes("Friday"))
              return false;
          }

          return true;
        }

        return true;
      })
    );
  };

  // Filter courses by years
  const filterCoursesByYear = (query: string[]) => {
    setFilteredCourses(
      courses.filter((course) => {
        const regexp = /.*?(\d+)/;
        const result = course.name.match(regexp);

        // console.log(query + " " + query.length)

        if (result) {
          if (query.includes("First Year") && parseInt(result[1][0]) == 1)
            return true;
          if (query.includes("Second Year") && parseInt(result[1][0]) == 2)
            return true;
          if (query.includes("Third Year") && parseInt(result[1][0]) == 3)
            return true;
          if (query.includes("Fourth Year") && parseInt(result[1][0]) == 4)
            return true;
          if (query.includes("Graduate") && parseInt(result[1][0]) > 4)
            return true;
        }

        return false;
      })
    );
  };

  // Filter courses by time
  const filterCoursesByTime = (query: string) => {
    setFilteredCourses(
      courses.filter((course) => {
        // course.meeting
        // regex match string pattern for time
        //// ####/##/##-####/##/## AAA AAA <####-####>...
        ////// "(\d+:\d+[AP][M]){1}"
        // .toLowerCase()
        // .replace("*", "")
        // .includes(query.toLowerCase().replace("*", ""))
      })
    );
  };

  ////// TRIMMER: .Pattern = ".+?(?=LEC)"
  ////// DAYS AFTER TRIMMER: ".+?(?=\d)"
  ////// TIME AFTER TRIMMER: "(\d+:\d+[AP][M]){1}"

  // Makes a request to fetch the list of UofG courses given a term (fall or winter)
  const fetchCourses = (term: string) => {
    setCoursesLoading(true);

    const prodUrl = `https://131.104.49.100/${term}CourseData`;
    const devUrl = `http://127.0.0.1:5000/${term}CourseData`;

    $.ajax({
      // url: prodUrl, // prod
      url: devUrl, // dev
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
    setCoursesLoading(false);
  };

  // Get courses on site load
  useEffect(() => {
    fetchCourses(term);
  }, [term]);

  return (
    <Router>
      <ThemeProvider theme={theme === "light" ? light : dark}>
        <GlobalStyle />
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
            filterCoursesByDay,
            filterCoursesByYear,
            filterCoursesByTime,
            courseName,
            setCourseName,
            term,
            setTerm,
          }}
        >
          <Routes>
            <Route
              path="/"
              element={<Home themeType={theme} toggleTheme={toggleTheme} />}
            />
            <Route
              path="/courses"
              element={<Courses themeType={theme} toggleTheme={toggleTheme} />}
            />
            <Route
              path="/schedule"
              element={<Schedule themeType={theme} toggleTheme={toggleTheme} />}
            />
          </Routes>
        </CoursesContext.Provider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
