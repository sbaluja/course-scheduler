import { createContext } from "react";
import { CoursesType } from "../utils/common_types";

interface CoursesContextInterface {
    currentCourses: CoursesType;
    coursesPerPage: number;
    totalCourses: number;
    currentPage: number;
    paginate: any;
    setCourses: any;
    coursesLoading: boolean;
    setCoursesLoading: any;
    error: boolean;
    setError: any;
    filteredCourses: CoursesType;
    setFilteredCourses: any;
    filterCourses: any;
    filterCoursesByDay: any;
    filterCoursesByYear: any;
    filterCoursesByTime: any;
    courseName: string;
    setCourseName: any;
    term: string;
    setTerm: any;
    courses: CoursesType;
}

const defaultCoursesContext: CoursesContextInterface = {
    currentCourses: [],
    coursesPerPage: 0,
    totalCourses: 0,
    currentPage: 1,
    paginate: null,
    setCourses: null,
    coursesLoading: false,
    setCoursesLoading: null,
    error: false,
    setError: null,
    filteredCourses: [],
    setFilteredCourses: null,
    filterCourses: null,
    filterCoursesByDay: null,
    filterCoursesByYear: null,
    filterCoursesByTime: null,
    courseName: "",
    setCourseName: null,
    term: "fall",
    setTerm: null,
    courses: [],
};

export const CoursesContext = createContext<CoursesContextInterface>(
    defaultCoursesContext
);