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
  const [term, setTerm] = useState("fall");

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

  // Filter courses by days
  const filterCoursesByDay = (query: string) => {
    setFilteredCourses(
      courses.filter((course) => {
        const TESTSTRING =
          "2022/09/08-2022/12/16 LEC Fri 08:30AM - 10:20AM, ROZH, Room 104 2022/09/08-2022/12/16 SEM Mon 04:30PM - 05:20PM, MCKN, Room 225 2022/12/06-2022/12/06 EXAM Tues 08:30AM - 10:30AM, Room TBA Room TBA";
        // const regexp = Exp("(?<=.)*(?<=LEC | LAB | EXAM | SEM ).+?(?=[0-9])");
        // const result = regexp.test(course.meeting);
        // const result = regexp.test(TESTSTRING);
        // if (result) {
        //INCLUDE COURSE???
        // }

        // regex match string pattern for days
        //// ####/##/##-####/##/## AAA <***> ##...
        ////// ".+?(?=\d)"
        // .toLowerCase()
        // .replace("*", "")
        // .includes(query.toLowerCase().replace("*", ""))
      })
    );
  };

  // Filter courses by years
  const filterCoursesByYear = (query: string[]) => {
    setFilteredCourses(
      courses.filter((course) => {
        const regexp = /.*?(\d+)/;
        const result = course.name.match(regexp);

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

        // course.name
        // regex match string pattern for code
        //// AAAA*<****>*...

        /////// ".*?(\d+)"

        // .toLowerCase()
        // .replace("*", "")
        // .includes(query.toLowerCase().replace("*", ""))
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
