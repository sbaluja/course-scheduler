import { CourseType, CoursesType } from "../../utils/common_types"

export type CoursesProps = {
    courses: CoursesType;
}

export type CourseProps = {
    course: CourseType;
    themeType: string;
}