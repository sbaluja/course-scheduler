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
import { EventType } from "./Schedule.types";
import { FiTrash2 } from "react-icons/fi";
import { BsPlusCircle } from "react-icons/bs";

const Schedule = () => {
  const {
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

  const colors = [
    "red",
    "blue",
    "orange",
    "green",
    "purple",
    "brown",
    "darkslategrey",
    "olivedrab",
    "black",
    "darksalmon",
  ];
  let lecStart = 0;
  let labStart = 0;
  let semStart = 0;
  let examStart = 0;
  let endDateIndex = 0;
  let duplicateFlag = 0;
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseName(e.target.value);
    filterCourses(e.target.value);
  };

  const handleShowModal = (course: CourseType) => {
    setSelectedCourse(course);
    setShow(true);
  };

  const handleShowRemoveModal = (courseName: string) => {
    setSelectedRemoveCourse(courseName);
    setShowRemove(true);
  };

  const handleCloseModal = () => {
    setShow(false);
    setShowRemove(false);
  };

  const [showRemove, setShowRemove] = useState(false);
  const [selectedRemoveCourse, setSelectedRemoveCourse] = useState<string>("");

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
    courseDate = selectedCourse.meeting.substring(start - 22, start);
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
      startRecur: courseDate.substring(0, endDateIndex).replaceAll("/", "-"),
      endRecur: courseDate
        .substring(endDateIndex + 1, courseDate.length - 1)
        .replaceAll("/", "-"),
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
          duplicateFlag = 1;
          alert("Error: Course has already been added");
        }
      });
      if (duplicateFlag == 1) {
        duplicateFlag = 0;
        setShow(false);
        return;
      }

      // Add lecture events
      lecStart = selectedCourse.meeting.indexOf("LEC");
      labStart = selectedCourse.meeting.indexOf("LAB");
      semStart = selectedCourse.meeting.indexOf("SEM");
      examStart = selectedCourse.meeting.indexOf("EXAM");
      indexes = [lecStart, labStart, semStart, examStart];

      lecText = validEvent(selectedCourse.meeting, lecStart, indexes);
      labText = validEvent(selectedCourse.meeting, labStart, indexes);
      semText = validEvent(selectedCourse.meeting, semStart, indexes);

      if (
        lecText.includes("TBA") ||
        labText.includes("TBA") ||
        semText.includes("TBA")
      ) {
        setSelectedCourses([...selectedCourses, newCourse]);
        setShow(false);
        return;
      } else {
        setSelectedCourses([...selectedCourses, newCourse]);

        if (lecText != "") {
          // Add lecture event
          addEvent("Lecture", lecStart, lecText);
        }
        if (labText != "") {
          // Add lab event
          addEvent("Lab", labStart, labText);
        }
        if (semText != "") {
          // Add sem event
          addEvent("Seminar", semStart, semText);
        }
        setNumCourses(numCourses + 1);
      }
    } else {
      alert("Error: Number of courses exceeded");
    }
    setShow(false);
  };

  // Removes courses from selected courses list and schedule
  const handleRemoveCourse = (courseName: string) => {
    let updatedCourses: CoursesType = [];
    if (selectedCourses != undefined) {
      updatedCourses = selectedCourses.filter((course) => {
        return course.name != courseName;
      });
    }

    setSelectedCourses(updatedCourses);

    let updatedEvents: EventType[] = [];
    if (events != undefined) {
      updatedEvents = events.filter((event) => {
        return !event.title.includes(courseName);
      });
    }

    setEvents(updatedEvents);
    setShowRemove(false);
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
              placeholder="Ex. CIS*3760"
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
                    <BsPlusCircle /> &nbsp;
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
                <li key={i} onClick={() => handleShowRemoveModal(course.name)}>
                  <RemovableCourse>
                    <FiTrash2 />
                    <span>&nbsp;&nbsp;{course.name}</span>
                  </RemovableCourse>
                </li>
              ))}
            </List>
          </SelectedCoursesContainer>
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
      <Modal show={show} onHide={handleCloseModal} centered>
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
      {/* Remove Modal */}
      <Modal show={showRemove} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedRemoveCourse}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleRemoveCourse(selectedRemoveCourse)}
          >
            Remove Course
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Schedule;
