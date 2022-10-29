import React from "react";
import { Layout } from "../../components/layout";
import { Course } from "./Course";
import { CoursesProps } from "./Course.types";
import { Container, Grid } from "./Courses.styled";

const Courses = ({ courses }: CoursesProps) => {
  return (
    <Layout>
      <Container>
        <Grid>
          {courses.map((course, i) => {
            return (
              <Course
                key={i}
                course={course}
              />
            );
          })}
        </Grid>
      </Container>
    </Layout>
  );
};

export default Courses;