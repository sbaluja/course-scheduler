import React, { useContext } from "react";
import { Layout } from "../../components/layout";
import { Course } from "./Course";
import { Container, Grid } from "./Courses.styled";
import Spinner from "react-bootstrap/Spinner";
import { CoursesContext } from "../../contexts/course-context";
import { Pagination } from "../../components/pagination";

const Courses = () => {
  const { currentCourses, coursesLoading, error } =
    useContext(CoursesContext);

  return (
    <Layout>
      <Container>
        {coursesLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Grid>
            {currentCourses.map((course, i) => {
              return <Course key={i} course={course} />;
            })}
          </Grid>
        )}
        <Pagination />
      </Container>
    </Layout>
  );
};

export default Courses;