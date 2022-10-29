import React from "react";
import { CourseProps } from "./Course.types";
import Card from "react-bootstrap/Card";

const Course = ({ course }: CourseProps) => {
    return (
        <Card border="primary" style={{ width: "15rem" }} className="m-2">
            <Card.Body>
                <Card.Title>{course.name}</Card.Title>
                <hr />
                <Card.Subtitle className="mb-2 text-muted">{course.location}</Card.Subtitle>
                <Card.Text>
                    Term: {course.term} <br />
                    Status: {course.status} <br />
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