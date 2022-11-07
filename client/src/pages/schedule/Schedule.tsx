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
import internal from "stream";
import { EventType } from "./Schedule.types";

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
  const [events, setEvents] = useState<EventType[]>([]);
  const [numCourses, setNumCourses] = useState<number>(0);

  const colors = ["red", "blue", "orange", "green", "purple"];
  let lecStart = 0;
  let labStart = 0;
  let semStart = 0;
  let examStart = 0;
  let endDateIndex = 0;
  let lecText = "";
  let labText = "";
  let semText = "";
  let courseDate = "";
  let startTimeString = "";
  let endTimeString = "";
  let indexes = [];
  let eventDays = [];

  // TODO: Update events
  // const events: any = [];

  const handleChange = (e: any) => {
    setCourseName(e.target.value);
    filterCourses(e.target.value);
  };

  const handleShowModal = (course: CourseType) => {
    setSelectedCourse(course);
    setShow(true);
  };

  const handleCloseModal = () => setShow(false);

  const validEvent = (meeting: string, wanted: number, indexes: number[]) => {
    if (wanted == -1) {
      return "";
    }

    let endOfWanted = meeting.length - 1;
    indexes.forEach(function (index) {
      if (index > wanted && index < endOfWanted && index != -1) {
        endOfWanted = index;
      }
    });
    return meeting.substring(wanted, endOfWanted);
  };

  const addEvent = (meeting: string, start: number, text: string) => {
    console.log(meeting);

    courseDate = selectedCourse.meeting.substring(0, start);
    endDateIndex = courseDate.indexOf("-");

    eventDays = dayParse(text);

    startTimeString = timeParse(text, 1);
    endTimeString = timeParse(text, 2);

    const newEvent = {
      title: selectedCourse.name + meeting,
      startTime: startTimeString,
      endTime: endTimeString,
      color: colors[numCourses],
      daysOfWeek: eventDays,
      allDay: false,
      startRecur: courseDate.substring(0, endDateIndex),
      endRecur: courseDate.substring(endDateIndex + 1, courseDate.length - 1),
    };

    setEvents((events) => [...events, newEvent]);
  };

  const dayParse = (string: string) => {
    const array = [];
    if (string.includes("Mon")) {
      array.push(1);
    }
    if (string.includes("Tues")) {
      array.push(2);
    }
    if (string.includes("Wed")) {
      array.push(3);
    }
    if (string.includes("Thur")) {
      array.push(4);
    }
    if (string.includes("Fri")) {
      array.push(5);
    }
    return array;
  };

  const timeParse = (string: string, i: number) => {
    const timeString = string.split(" ");
    const timeIndex = timeString.indexOf("-");
    let parsedTimeString = "";
    let temp = 0;

    if (i == 1) {
      if (timeString[timeIndex - 1].includes("PM")) {
        temp = parseInt(timeString[timeIndex - 1].substring(0, 2));
        if (temp != 12) {
          temp = temp + 12;
        }
        parsedTimeString = temp + timeString[timeIndex - 1].substring(2, 7);
      } else {
        parsedTimeString = timeString[timeIndex - 1].substring(
          0,
          timeString[timeIndex - 1].length
        );
      }
    }
    if (i == 2) {
      if (timeString[timeIndex + 1].includes("PM")) {
        temp = parseInt(timeString[timeIndex + 1].substring(0, 2));
        if (temp != 12) {
          temp = temp + 12;
        }
        parsedTimeString = temp + timeString[timeIndex + 1].substring(2, 7);
      } else {
        parsedTimeString = timeString[timeIndex + 1].substring(
          0,
          timeString[timeIndex - 1].length
        );
      }
    }
    return parsedTimeString;
  };

  const handleAddCourse = (newCourse: CourseType) => {
    if (selectedCourses.length < 5 && selectedCourses != undefined) {
      // Handles duplicates
      selectedCourses.forEach((course) => {
        if (course.name == newCourse.name) {
          alert("Error: Course has already been added");
        }
      });
      setSelectedCourses([...selectedCourses, newCourse]);

      // Add lecture events
      lecStart = selectedCourse.meeting.indexOf("LEC");
      labStart = selectedCourse.meeting.indexOf("LAB");
      semStart = selectedCourse.meeting.indexOf("SEM");
      examStart = selectedCourse.meeting.indexOf("EXAM");
      indexes = [lecStart, labStart, semStart, examStart];

      lecText = validEvent(selectedCourse.meeting, lecStart, indexes);
      labText = validEvent(selectedCourse.meeting, labStart, indexes);
      semText = validEvent(selectedCourse.meeting, semStart, indexes);

      console.log(lecText);
      console.log(labText);
      console.log(semText);

      if (lecText != "") {
        console.log("Lecture");
        // Add lecture event
        addEvent("Lecture", lecStart, lecText);

        console.log(events);
      }
      if (labText != "") {
        console.log("Lab");

        // Add lab event
        addEvent("Lab", labStart, labText);
        console.log(events);
      }
      if (semText != "") {
        console.log("Seminar");

        // Add sem event
        addEvent("Seminar", semStart, semText);
        console.log(events);
      }
      setNumCourses(numCourses + 1);
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
        <SubContainer>
          {/* {events.map((event, i) => (
            <p key={i}>{event.title}</p>
          ))} */}
        </SubContainer>
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
