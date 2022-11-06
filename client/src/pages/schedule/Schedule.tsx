import React, { useState, useContext } from "react";
import { Layout } from "../../components/layout";
import { CoursesContext } from "../../contexts/course-context";
import {
  List,
  ListItem,
  ScrollableContainer,
  Container,
  SubContainer,
  Input,
} from "./Schedule.styled";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { CourseType } from "../../utils/common_types";

const Schedule = () => {
  const {
    currentCourses,
    filteredCourses,
    filterCourses,
    courseName,
    setCourseName,
  } = useContext(CoursesContext);
  const [show, setShow] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseType>();

  // TODO: Update events
  const events = [
    {
      title: "Event1",
      startTime: "15:30:00",
      endTime: "16:30:00",
      color: "red",
      daysOfWeek: [2, 4],
      allDay: false,
      startRecur: "2022-09-08",
      endRecur: "2022-12-05",
    },
    {
      title: "Event2",
      startTime: "12:30:00",
      endTime: "2022-11-02T13:30:00",
      color: "blue",
      daysOfWeek: [1, 3],
      allDay: false,
      startRecur: "2022-09-08",
      endRecur: "2022-12-05",
    },
    // etc...
  ];

  const handleChange = (e: any) => {
    setCourseName(e.target.value);
    filterCourses(e.target.value);
  };

  const handleShowModal = (course: CourseType) => {
    setSelectedCourse(course);
    setShow(true);
  };

  const handleCloseModal = () => setShow(false);

  const handleAddCourse = (course: CourseType | undefined) => {
    console.log(course);
    setShow(false);
    // TODO: Add course to "events" list if not full...
    // and add course to the "Selected Courses" component - Mr luka
  };

  const handleRemoveCourse = () => {
    // TODO: Remove course from "events" list and "Selected Courses" component
  };

  return (
    <Layout>
      <Container>
        {/* Search Component */}
        <SubContainer>
          <Input
            type="text"
            id="course"
            name="course"
            placeholder="Search courses"
            onChange={handleChange}
            value={courseName}
          />
          <ScrollableContainer>
            <List>
              {filteredCourses.map((course, i) => (
                <ListItem
                  onClick={() => handleShowModal(course)}
                  value={course.name}
                  key={i}
                >
                  {course.name}
                </ListItem>
              ))}
            </List>
          </ScrollableContainer>
        </SubContainer>
        {/* Selected Courses Component */}
        <SubContainer></SubContainer>
        {/* Course Conflicts Component */}
        <SubContainer></SubContainer>
      </Container>
      {/* <FullCalendar
        plugins={[ timeGridPlugin ]}
        weekends={false}
        slotDuration='00:30'
        slotMinTime='08:00'
        slotMaxTime='23:30'
        timeZone='local'
        events={events}
      /> */}
      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          {selectedCourse == undefined ? (
            <Modal.Title>Something went wrong...</Modal.Title>
          ) : (
            <Modal.Title>{selectedCourse.name}</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          {selectedCourse == undefined ? (
            <p>Something went wrong...</p>
          ) : (
            <span>
              <b>Term:</b> {selectedCourse.Term} <br />
              <b>Status:</b> {selectedCourse.Status} <br />
              <b>Meeting:</b> {selectedCourse.meeting} <br />
              <b>Faculty:</b> {selectedCourse.faculty} <br />
              <b>Capacity:</b> {selectedCourse.capacity} <br />
              <b>Credits:</b> {selectedCourse.credits} <br />
              <b>Level:</b> {selectedCourse.level} <br />
            </span>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleAddCourse(selectedCourse)}
          >
            Add Course
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Schedule;
