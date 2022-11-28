import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CoursesType } from "./utils/common_types";
import { CoursesContext } from "./contexts/course-context";
import { ThemeProvider } from "styled-components";
import { light, dark } from "./components/theme/Themes";
import GlobalStyle from "./components/theme/globalStyles";
import { CookiesProvider } from "react-cookie";

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
  const [term, setTerm] = useState("fall");

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

  // Helper fxn to determine if time is within a given time block
  function checkTime(given: string, start: string, end: string) {
    // Sample Time: "12:20PM"
    let startTime = 0,
      endTime = 0,
      givenTime = 0;

    // Get given time in minutes
    if (given[5] == "P") givenTime += 12 * 60;
    if ((given as string).substring(0, 2) != "12") {
      givenTime += parseInt((given as string).substring(0, 2)) * 60;
    }
    givenTime += parseInt((given as string).substring(3, 5));

    // Get start time in minutes
    if (start[5] == "P") startTime += 12 * 60;
    if ((start as string).substring(0, 2) != "12") {
      startTime += parseInt((start as string).substring(0, 2)) * 60;
    }
    startTime += parseInt((start as string).substring(3, 5));

    // Get end time in minutes
    if (end[5] == "P") endTime += 12 * 60;
    if ((end as string).substring(0, 2) != "12") {
      endTime += parseInt((end as string).substring(0, 2)) * 60;
    }
    endTime += parseInt((end as string).substring(3, 5));

    return startTime <= givenTime && givenTime <= endTime ? true : false;
  }

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
  const filterCoursesByTime = (query: string[]) => {
    setFilteredCourses(
      courses.filter((course) => {
        const meeting_regexp =
          /([a-zA-Z]+( [a-zA-Z,]+)+)+\d{2}:\d{2}[A-Z]+ - \d{2}:\d{2}([A-Z]){2}/g;
        const meetingResult = course.meeting.match(meeting_regexp);
        console.log("meetingResult " + meetingResult);

        // null result = courses with tba times, we aren't including those
        if (meetingResult) {
          const time_regexp = /(\d+):(\d+)[A-Z]{2}/g;

          for (let i = 0; i < meetingResult.length; i++) {
            const timeResult = String(meetingResult[i]).match(time_regexp);

            if (timeResult) {
              for (let j = 0; j < timeResult.length; j++) {
                console.log("timeResult[" + j + "]: " + timeResult);
              }
            } else {
              continue;
            }
          }
        } else {
          return false;
        }

        return false;
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
        <CookiesProvider>
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
                element={
                  <Courses themeType={theme} toggleTheme={toggleTheme} />
                }
              />
              <Route
                path="/schedule"
                element={
                  <Schedule themeType={theme} toggleTheme={toggleTheme} />
                }
              />
            </Routes>
          </CoursesContext.Provider>
        </CookiesProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
