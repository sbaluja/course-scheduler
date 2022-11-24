import React, { useContext } from "react";
import { Layout } from "../../components/layout";
import { Course } from "./Course";
import { Container, Grid } from "./Courses.styled";
import Spinner from "react-bootstrap/Spinner";
import { CoursesContext } from "../../contexts/course-context";
import { Pagination } from "../../components/pagination";
import { SelectionContainer } from "./Courses.styled";
import Dropdown from "react-bootstrap/Dropdown";
import { PageProps } from "../../types/common.types";

const Courses: React.FC<PageProps> = ({ themeType, toggleTheme }) => {
  const { currentCourses, coursesLoading, error, term, setTerm } =
    useContext(CoursesContext);

  return (
    <Layout themeType={themeType} toggleTheme={toggleTheme}>
      <SelectionContainer>
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {term === "fall" ? "Fall 2022" : "Winter 2023"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setTerm("fall")}>Fall</Dropdown.Item>
            <Dropdown.Item onClick={() => setTerm("winter")}>
              Winter
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </SelectionContainer>
      <Container>
        {coursesLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Grid>
            {currentCourses.map((course, i) => {
              return <Course themeType={themeType} key={i} course={course} />;
            })}
          </Grid>
        )}
        <Pagination />
      </Container>
    </Layout>
  );
};

export default Courses;
