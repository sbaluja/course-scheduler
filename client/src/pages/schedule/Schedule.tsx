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
  SelectedCoursesContainer,
  SearchContainer,
  RemovableCourse,
  CalendarContainer,
} from "./Schedule.styled";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { CourseType, CoursesType } from "../../utils/common_types";

const Schedule = () => {
  const {
    currentCourses,
    filteredCourses,
    filterCourses,
    courseName,
    setCourseName,
  } = useContext(CoursesContext);
  const [show, setShow] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseType>({
    Term: "",
    Status: "",
    name: "",
    location: "",
    meeting: "",
    faculty: "",
    capacity: "",
    credits: "",
    level: "",
  });
  const [selectedCourses, setSelectedCourses] = useState<CoursesType>([]);

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

  const handleAddCourse = (newCourse: CourseType) => {
    if (selectedCourses.length < 5 && selectedCourses != undefined) {
      // Handles duplicates
      selectedCourses.forEach((course) => {
        if (course.name == newCourse.name) {
          alert("Error: Course has already been added");
        }
      });
      setSelectedCourses([...selectedCourses, newCourse]);
      // TODO: Add course to "events" list
    } else {
      alert("Error: Number of courses exceeded");
    }
    setShow(false);
  };

  const handleRemoveCourse = (courseName: string) => {
    // TODO: Remove course from "events" list
    let updatedCourses: CoursesType = [];
    if (selectedCourses != undefined) {
      updatedCourses = selectedCourses.filter((course) => {
        return course.name != courseName;
      });
    }

    setSelectedCourses(updatedCourses);
  };

  return (
    <Layout>
      <Container>
        {/* Search Component */}
        <SubContainer>
          <SearchContainer>
            <h2>Search Courses</h2>
            <Input
              type="text"
              id="course"
              name="course"
              placeholder="Acct*1220"
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
          </SearchContainer>
        </SubContainer>

        {/* Selected Courses Component */}
        <SubContainer>
          <SelectedCoursesContainer>
            <h2>Selected Courses</h2>
            <List>
              {selectedCourses.map((course, i) => (
                <li key={i} onClick={() => handleRemoveCourse(course.name)}>
                  <RemovableCourse>{course.name} </RemovableCourse>
                </li>
              ))}
            </List>
          </SelectedCoursesContainer>
        </SubContainer>

        {/* Course Conflicts Component */}
        <SubContainer></SubContainer>
      </Container>
      <CalendarContainer>
        <FullCalendar
          plugins={[timeGridPlugin]}
          weekends={false}
          slotDuration="00:30"
          slotMinTime="08:00"
          slotMaxTime="23:30"
          timeZone="local"
          events={events}
          height={950}
        />
      </CalendarContainer>

      {/* Add modal */}
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
