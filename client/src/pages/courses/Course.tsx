import React from "react";
import { CourseProps } from "./Course.types";
import Card from "react-bootstrap/Card";

const Course = ({ course, themeType }: CourseProps) => {
  return (
    <Card
      bg={themeType == "light" ? "white" : "dark"}
      text={themeType == "light" ? "dark" : "white"}
      border="primary"
      style={{ width: "15rem" }}
      className="m-2"
    >
      <Card.Body>
        <Card.Title>{course.name}</Card.Title>
        <hr />
        <Card.Subtitle className="mb-2 text-muted">
          {course.location}
        </Card.Subtitle>
        <Card.Text>
          Term: {course.Term} <br />
          Status: {course.Status} <br />
          Meeting: {course.meeting} <br />
          Faculty: {course.faculty} <br />
          Capacity: {course.capacity} <br />
          Credits: {course.credits} <br />
          Level: {course.level} <br />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export { Course };
