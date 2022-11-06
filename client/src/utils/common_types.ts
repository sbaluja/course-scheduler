import { ReactNode } from "react";

export type CourseType = {
    Term: string,
    Status: string,
    name: string,
    location: string,
    meeting: string,
    faculty: string,
    capacity: string,
    credits: string,
    level: string
};

export type CoursesType = Array<CourseType>;