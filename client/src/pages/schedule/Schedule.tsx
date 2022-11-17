import React, { useState, useContext } from "react";
import { Layout } from "../../components/layout";
import { CoursesContext } from "../../contexts/course-context";
import {
  List,
  ListItem,
  ScrollableContainer,
  Container,
  SubContainer,
  FilterContainer,
  ButtonContainer, 
  FormContainer, 
  FormContainerOuter, 
  CreateTimeContainer,
  CreateTimeContainerOuter,
  ActiveTimeContainer,
  ActiveTimeContainerOuter,
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
import Form from "react-bootstrap/Form";
import { CourseType, CoursesType } from "../../utils/common_types";
import { EventType } from "./Schedule.types";
import { FiTrash2 } from "react-icons/fi";
import { BsPlusCircle } from "react-icons/bs";

const Schedule = () => {
  // Course context
  const { filteredCourses, filterCourses, filterCoursesByDay, filterCoursesByTime, filterCoursesByYear, courseName, setCourseName } =
    useContext(CoursesContext);

  // States
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
  const [showRemove, setShowRemove] = useState(false);
  const [selectedRemoveCourse, setSelectedRemoveCourse] = useState<string>("");

  // Variable declarations
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


  // Update search query and refilters courses
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseName(e.target.value);
    filterCourses(e.target.value);
  };

  // Update courses to search through based off filters
  const handleFilters = () => {

    addFilters();


    // filterCoursesByDay();


    // Add Years Excluded
    const excludedYears = [];
    const allYears = ["First Year", "Second Year", "Third Year", "Fourth Year", "Graduate"];
    const yearToggles = document.getElementById("yearToggles");
    if (yearToggles != null) {
      const childElements = Object.values(yearToggles.childNodes) as HTMLElement[];
      for (const childEl of childElements) {
        if ((childEl.children[0] as HTMLInputElement).checked){
          const year = childEl.children[0].getAttribute("name");
          if (year != null){
            excludedYears.push(year);
          }
        }
      }
    }
    filterCoursesByYear(excludedYears.length == 0? allYears : excludedYears);

    // filterCoursesByTime();

  };


  // Reset active filters list
  const resetFilters = () => {
  

    // Reset Days
    const dayList = document.getElementById("activeDayFilters");
    if (dayList != null) dayList.innerHTML = "";


    // Reset Years
    const yearList = document.getElementById("activeYearFilters");
    if (yearList != null) yearList.innerHTML = "";
    const allYears = ["First Year", "Second Year", "Third Year", "Fourth Year", "Graduate"];
    filterCoursesByYear(allYears);

    // Reset Start Time
    const start_ul = document.getElementById("activeStartTimes");
    if (start_ul != null) start_ul.innerHTML = "";


    // Reset End Time
    const end_ul = document.getElementById("activeEndTimes");
    if (end_ul != null) end_ul.innerHTML = "";

  };

  // Update active filters list
  const addFilters = () => {
    
    resetFilters();

    // Add Days Excluded
    const dayToggles = document.getElementById("dayToggles");
    if (dayToggles != null) {
      const ul = document.getElementById("activeDayFilters");
      const childElements = Object.values(dayToggles.childNodes) as HTMLElement[];
      for (const childEl of childElements) {
        if ((childEl.children[0] as HTMLInputElement).checked){
          const li = document.createElement("li");
          const day = childEl.children[0].getAttribute("name");
          if (day != null){
            li.appendChild(document.createTextNode(day));
            ul?.append(li);
          }
        }
      }
    }

    // Add Years Excluded
    const yearToggles = document.getElementById("yearToggles");
    if (yearToggles != null) {
      const ul = document.getElementById("activeYearFilters");
      const childElements = Object.values(yearToggles.childNodes) as HTMLElement[];
      for (const childEl of childElements) {
        if ((childEl.children[0] as HTMLInputElement).checked){
          const li = document.createElement("li");
          const year = childEl.children[0].getAttribute("name");
          if (year != null){
            li.appendChild(document.createTextNode(year));
            ul?.append(li);
          }
        }
      }
    }
    
    // Add Start Time Excluded
    const start_ul = document.getElementById("activeStartTimes");
    const startTime = document.getElementById("startTime") as HTMLInputElement;
    if (start_ul != null) start_ul.innerHTML = "";
    if (startTime.value){
      const start_li = document.createElement("li");
      const startHour = parseInt((startTime.value).substring(0,2));
      const startMin = (startTime.value).substring(3,5);
  
      if (startHour < 12){
        start_li.appendChild(document.createTextNode(startHour.toString() + ":" + startMin + " AM"));
      } else if (startHour == 12){
        start_li.appendChild(document.createTextNode((startHour).toString() + ":" + startMin + " PM"));
      } else {
        start_li.appendChild(document.createTextNode((startHour-12).toString() + ":" + startMin + " PM"));
      }
      start_ul?.append(start_li);
    }


    // Add End Time Excluded
    const end_ul = document.getElementById("activeEndTimes");
    const endTime = document.getElementById("endTime") as HTMLInputElement;
    if (end_ul != null) end_ul.innerHTML = "";
    if (endTime.value){
      const end_li = document.createElement("li");
      const endHour = parseInt((endTime.value).substring(0,2));
      const endMin = (endTime.value).substring(3,5);
  
      if (endHour < 12){
        end_li.appendChild(document.createTextNode(endHour.toString() + ":" + endMin + " AM"));
      } else if (endHour == 12){
        end_li.appendChild(document.createTextNode((endHour).toString() + ":" + endMin + " PM"));
      } else {
        end_li.appendChild(document.createTextNode((endHour-12).toString() + ":" + endMin + " PM"));
      }
      end_ul?.append(end_li);
    }


    // Checking for both start and end time entries
    if (!(startTime.value && endTime.value)){
      if (start_ul != null) start_ul.innerHTML = "";
      if (end_ul != null) end_ul.innerHTML = "";
    }

  };


  // TODO:
  // 1. Create new UI elements for users to create filter
  // 2. Create new UI elements to display active filters
  // 3. Create new UI elements to remove active filters
  // 4. Make filters functional
  //// 4a. Search courses and find matching critera
  //// 4b. Compile new array and return results 
  //// 4c. Recompile array on filter add/remove 

  // // Update filter query and returns courses matching filter
  // const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCourseName(e.target.value);
  //   filterCourses(e.target.value);
  // }

  // Show modal with course information when user wants to add a course to schedule
  const handleShowModal = (course: CourseType) => {
    setSelectedCourse(course);
    setShow(true);
  };

  const handleCloseModal = () => {
    setShow(false);
    setShowRemove(false);
  };

  // Shows confirmation modal to remove a course from schedule
  const handleShowRemoveModal = (courseName: string) => {
    setSelectedRemoveCourse(courseName);
    setShowRemove(true);
  };

  // Checks if a course being added has valid lecture, lab, or seminar times and returns a meeting substring with its meeting time
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

  // Creates a formatted course and is added to the list of courses
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

  // Parses a lecture, lab, or seminar time
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

  // Handles adding a course to the schedule
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
        <FilterContainer>
          <h2>Create Filters</h2>

            <FormContainerOuter>
              <FormContainer>
                <Form id="dayToggles"> 
                  <Form.Check type="switch" name="Monday" label="Monday"/>
                  <Form.Check type="switch" name="Tuesday" label="Tuesday"/>
                  <Form.Check type="switch" name="Wednesday" label="Wednesday"/>
                  <Form.Check type="switch" name="Thursday" label="Thursday"/>
                  <Form.Check type="switch" name="Friday" label="Friday"/>
                </Form>
              </FormContainer>
              <FormContainer>
                <Form id="yearToggles">
                  <Form.Check type="switch" name="First Year" label="First Year"/>
                  <Form.Check type="switch" name="Second Year" label="Second Year"/>
                  <Form.Check type="switch" name="Third Year" label="Third Year"/>
                  <Form.Check type="switch" name="Fourth Year" label="Fourth Year"/>
                  <Form.Check type="switch" name="Graduate" label="Graduate"/>
                </Form>
              </FormContainer>
            </FormContainerOuter>

            <CreateTimeContainerOuter>
              <CreateTimeContainer>
                Start Time
                <Form>
                  <Input type="time" id="startTime"/>
                </Form>
              </CreateTimeContainer>
              <CreateTimeContainer>
                {/* <Form.Check inline label="PM" name="group1" type="checkbox" id={"inline-checkbox-start"}/> */}
              </CreateTimeContainer>

              <CreateTimeContainer>
                End Time
                <Form>
                  <Input type="time" id="endTime"/>
                </Form>
              </CreateTimeContainer>
              <CreateTimeContainer>
                {/* <Form.Check inline label="PM" name="group1" type="checkbox" id={"inline-checkbox-end"}/> */}
              </CreateTimeContainer>
            </CreateTimeContainerOuter>

          <ButtonContainer>
            <Button variant="primary" id="addFilterBtn" onClick={handleFilters}>
              Update Filter
            </Button>
          </ButtonContainer>
       </FilterContainer>


        {/* Active Filter Component */}
        <FilterContainer>
          <h2>Active Filters</h2>
          <FormContainerOuter>
            <FormContainer>
              <List>
                <b>Excluded Days</b>
                <ul id="activeDayFilters">
                </ul>
              </List>
            </FormContainer>
            <FormContainer>
              <List>
                <b>Excluded Years</b>
                <ul id="activeYearFilters">
                </ul>
              </List>
            </FormContainer>
          </FormContainerOuter>

          <ActiveTimeContainerOuter>
            <ActiveTimeContainer>
              <List>
                <b>Start Time</b>
                <div id="activeStartTimes">
                </div>
              </List>
            </ActiveTimeContainer>
            <ActiveTimeContainer>
              <List>
                <br/>
                <div id="activeTimeDashes">
                </div>
              </List>
            </ActiveTimeContainer>
            <ActiveTimeContainer>
              <List>
                <b>End Time</b>
                <div id="activeEndTimes">
                </div>
              </List>
            </ActiveTimeContainer>
          </ActiveTimeContainerOuter>

          <ButtonContainer>
            <Button variant="danger" id="rmFilterBtn" onClick={resetFilters}>
              Reset Filter
            </Button>
          </ButtonContainer>
        </FilterContainer>



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
            {/* Displays list of searched courses into a container */}
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
            {/* Displays list of selected courses into a container */}
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
