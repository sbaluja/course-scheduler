import React, { useState, useContext, useEffect, useRef } from "react";
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
  ExportContainer,
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
  SelectionContainer,
  Header,
  ClearContainer,
} from "./Schedule.styled";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import timeGridPlugin from "@fullcalendar/timegrid"; // a plugin!
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import { CourseType, CoursesType } from "../../utils/common_types";
import { EventType } from "./Schedule.types";
import { FiTrash2 } from "react-icons/fi";
import { BsPlusCircle } from "react-icons/bs";
import { PageProps } from "../../types/common.types";
import { useCookies } from "react-cookie";

const Schedule: React.FC<PageProps> = ({ themeType, toggleTheme }) => {
  // Calendar API
  const calendarRef = useRef(null);

  // Course context
  const {
    filteredCourses,
    setFilteredCourses,
    filterCourses,
    filterCoursesByDay,
    filterCoursesByTime,
    filterCoursesByYear,
    courseName,
    setCourseName,
    term,
    setTerm,
    courses,
  } = useContext(CoursesContext);

  useEffect(() => {
    console.log(filteredCourses);
    console.log(courses);
  }, [filteredCourses]);

  // States
  const localEvents: string = localStorage.getItem("events") ?? "[]";
  const [cookies, setCookie] = useCookies([
    "fallCourses",
    "winterCourses",
    "numCourses",
    "events",
  ]);
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
  const [fallSelectedCourses, setFallSelectedCourses] = useState<CoursesType>(
    cookies?.fallCourses ?? []
  );
  const [winterSelectedCourses, setWinterSelectedCourses] =
    useState<CoursesType>(cookies?.winterCourses ?? []);
  const [events, setEvents] = useState<EventType[]>(JSON.parse(localEvents));
  const [numCourses, setNumCourses] = useState<number>(
    parseInt(cookies?.numCourses) ?? 0
  );
  const [showRemove, setShowRemove] = useState(false);
  const [showScheduleConfirmation, setShowScheduleConfirmation] =
    useState(false);
  const [selectedRemoveCourse, setSelectedRemoveCourse] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
    setCookie("events", events);
  }, [events]);

  // Variable declarations
  const colors = [
    "red",
    "blue",
    "green",
    "purple",
    "darkorange",
    "#8887E6",
    "#387780",
    "#967D69",
    "#650D1B",
    "olivedrab",
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

    // Add Years Excluded
    const excludedYears = [];
    const allYears = [
      "First Year",
      "Second Year",
      "Third Year",
      "Fourth Year",
      "Graduate",
    ];
    const yearToggles = document.getElementById("yearToggles");
    if (yearToggles != null) {
      const childElements = Object.values(
        yearToggles.childNodes
      ) as HTMLElement[];
      for (const childEl of childElements) {
        if ((childEl.children[0] as HTMLInputElement).checked) {
          const year = childEl.children[0].getAttribute("name");
          if (year != null) {
            excludedYears.push(year);
          }
        }
      }
    }

    filterCoursesByYear(excludedYears.length == 0 ? allYears : excludedYears);

    // Add Days Excluded
    const excludedDays = [];
    const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const dayToggles = document.getElementById("dayToggles");
    if (dayToggles != null) {
      const childElements = Object.values(
        dayToggles.childNodes
      ) as HTMLElement[];
      for (const childEl of childElements) {
        if ((childEl.children[0] as HTMLInputElement).checked) {
          const day = childEl.children[0].getAttribute("name");
          if (day != null) {
            excludedDays.push(day);
          }
        }
      }
    }

    filterCoursesByDay(excludedDays.length == 0 ? allDays : excludedDays);

    // Add Times Included
    const start_ul = document.getElementById("activeStartTimes");
    const end_ul = document.getElementById("activeEndTimes");
    const includedTimes = [];

    if (
      start_ul?.firstElementChild?.innerHTML != null &&
      end_ul?.firstElementChild?.innerHTML != null
    ) {
      // console.log("start time:" + start_ul.firstElementChild?.innerHTML);
      // console.log("end time:" + end_ul.firstElementChild?.innerHTML);
      includedTimes.push(start_ul.firstElementChild?.innerHTML);
      includedTimes.push(end_ul.firstElementChild?.innerHTML);
      filterCoursesByTime(includedTimes);
    }
  };

  // Reset active filters list
  const resetFilters = () => {
    setFilteredCourses(courses);
    // Reset Days
    const dayList = document.getElementById("activeDayFilters");
    if (dayList != null) dayList.innerHTML = "";
    const allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    filterCoursesByDay(allDays);

    // Reset Years
    const yearList = document.getElementById("activeYearFilters");
    if (yearList != null) yearList.innerHTML = "";
    const allYears = [
      "First Year",
      "Second Year",
      "Third Year",
      "Fourth Year",
      "Graduate",
    ];
    filterCoursesByYear(allYears);

    // Reset Start Time
    const start_ul = document.getElementById("activeStartTimes");
    if (start_ul != null) start_ul.innerHTML = "";

    // Reset End Time
    const end_ul = document.getElementById("activeEndTimes");
    if (end_ul != null) end_ul.innerHTML = "";

    const includedTimes = [];
    includedTimes.push("all times");
    filterCoursesByTime(includedTimes);
  };

  // Update active filters list
  const addFilters = () => {
    resetFilters();

    // Add Days Excluded
    const dayToggles = document.getElementById("dayToggles");
    if (dayToggles != null) {
      const ul = document.getElementById("activeDayFilters");
      const childElements = Object.values(
        dayToggles.childNodes
      ) as HTMLElement[];
      for (const childEl of childElements) {
        if ((childEl.children[0] as HTMLInputElement).checked) {
          const li = document.createElement("li");
          const day = childEl.children[0].getAttribute("name");
          if (day != null) {
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
      const childElements = Object.values(
        yearToggles.childNodes
      ) as HTMLElement[];
      for (const childEl of childElements) {
        if ((childEl.children[0] as HTMLInputElement).checked) {
          const li = document.createElement("li");
          const year = childEl.children[0].getAttribute("name");
          if (year != null) {
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
    if (startTime.value) {
      const start_li = document.createElement("li");
      const startHour = parseInt(startTime.value.substring(0, 2));
      const startMin = startTime.value.substring(3, 5);

      if (startHour < 12) {
        start_li.appendChild(
          document.createTextNode(startHour.toString() + ":" + startMin + " AM")
        );
      } else if (startHour == 12) {
        start_li.appendChild(
          document.createTextNode(startHour.toString() + ":" + startMin + " PM")
        );
      } else {
        start_li.appendChild(
          document.createTextNode(
            (startHour - 12).toString() + ":" + startMin + " PM"
          )
        );
      }
      start_ul?.append(start_li);
    }

    // Add End Time Excluded
    const end_ul = document.getElementById("activeEndTimes");
    const endTime = document.getElementById("endTime") as HTMLInputElement;
    if (end_ul != null) end_ul.innerHTML = "";
    if (endTime.value) {
      const end_li = document.createElement("li");
      const endHour = parseInt(endTime.value.substring(0, 2));
      const endMin = endTime.value.substring(3, 5);

      if (endHour < 12) {
        end_li.appendChild(
          document.createTextNode(endHour.toString() + ":" + endMin + " AM")
        );
      } else if (endHour == 12) {
        end_li.appendChild(
          document.createTextNode(endHour.toString() + ":" + endMin + " PM")
        );
      } else {
        end_li.appendChild(
          document.createTextNode(
            (endHour - 12).toString() + ":" + endMin + " PM"
          )
        );
      }
      end_ul?.append(end_li);
    }

    // Checking for both start and end time entries
    if (!(startTime.value && endTime.value)) {
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
    setShowScheduleConfirmation(false);
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

    let startDate = "";
    let endDate = "";

    if (term === "fall") {
      startDate = courseDate.substring(0, endDateIndex).replaceAll("/", "-");
      endDate = courseDate
        .substring(endDateIndex + 1, courseDate.length - 1)
        .replaceAll("/", "-");
    } else {
      startDate = "2023-01-02";
      endDate = "2023-04-14";
    }

    const newEvent = {
      title: selectedCourse.name + meeting,
      startTime: startTimeString,
      endTime: endTimeString,
      color: colors[numCourses],
      daysOfWeek: eventDays,
      allDay: false,
      startRecur: startDate,
      endRecur: endDate,
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
        if (term === "winter") {
          temp = parseInt(
            timeString[timeIndex - 1].substring(
              timeString[timeIndex - 1].length - 7,
              timeString[timeIndex - 1].length - 5
            )
          );
        } else {
          temp = parseInt(timeString[timeIndex - 1].substring(0, 2));
        }
        if (temp != 12) {
          temp = temp + 12;
        }
        parsedTimeString =
          temp +
          timeString[timeIndex - 1].substring(
            timeString[timeIndex - 1].length - 5,
            timeString[timeIndex - 1].length
          );
      } else {
        if (term === "winter") {
          parsedTimeString = timeString[timeIndex - 1].substring(
            timeString[timeIndex - 1].length - 7,
            timeString[timeIndex - 1].length
          );
        } else {
          parsedTimeString = timeString[timeIndex - 1].substring(
            0,
            timeString[timeIndex - 1].length
          );
        }
      }
    }
    if (i == 2) {
      if (timeString[timeIndex + 1].includes("PM")) {
        if (term === "winter") {
          temp = parseInt(timeString[timeIndex + 1].substring(0, 3));
        } else {
          temp = parseInt(timeString[timeIndex + 1].substring(0, 2));
        }

        if (temp != 12) {
          temp = temp + 12;
        }
        parsedTimeString = temp + timeString[timeIndex + 1].substring(2, 7);
      } else {
        if (term === "winter") {
          parsedTimeString = timeString[timeIndex + 1].substring(0, 7);
        } else {
          parsedTimeString = timeString[timeIndex + 1].substring(
            0,
            timeString[timeIndex - 1].length
          );
        }
      }
    }
    return parsedTimeString;
  };

  // Handles adding a course to the schedule
  const handleAddCourse = (newCourse: CourseType) => {
    if (term === "winter") {
      if (
        winterSelectedCourses.length < 5 &&
        winterSelectedCourses != undefined
      ) {
        // Handles duplicates
        winterSelectedCourses.forEach((course) => {
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
      } else {
        alert("Error: Number of Winter courses exceeded");
        setShow(false);
        return;
      }
    } else {
      if (fallSelectedCourses.length < 5 && fallSelectedCourses != undefined) {
        // Handles duplicates
        fallSelectedCourses.forEach((course) => {
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
      } else {
        alert("Error: Number of Fall courses exceeded");
        setShow(false);
        return;
      }
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
      if (term === "winter") {
        setWinterSelectedCourses([...winterSelectedCourses, newCourse]);
        setCookie("winterCourses", [...winterSelectedCourses, newCourse], {
          path: "/schedule",
        });
      } else {
        setFallSelectedCourses([...fallSelectedCourses, newCourse]);
        setCookie("fallCourses", [...fallSelectedCourses, newCourse], {
          path: "/schedule",
        });
      }
      setShow(false);
      return;
    } else {
      if (term === "winter") {
        setWinterSelectedCourses([...winterSelectedCourses, newCourse]);
        setCookie("winterCourses", [...winterSelectedCourses, newCourse], {
          path: "/schedule",
        });
      } else {
        setFallSelectedCourses([...fallSelectedCourses, newCourse]);
        setCookie("fallCourses", [...fallSelectedCourses, newCourse], {
          path: "/schedule",
        });
      }

      if (lecText != "") {
        // Add lecture event
        addEvent(" Lecture", lecStart, lecText);
      }
      if (labText != "") {
        // Add lab event
        addEvent(" Lab", labStart, labText);
      }
      if (semText != "") {
        // Add sem event
        addEvent(" Seminar", semStart, semText);
      }
      setNumCourses(numCourses + 1);
      setCookie("numCourses", (parseInt(cookies.numCourses) + 1).toString(), {
        path: "/schedule",
      });
    }
    setShow(false);
  };

  // Removes courses from selected courses list and schedule
  const handleRemoveCourse = (courseName: string) => {
    let updatedCourses: CoursesType = [];

    if (term === "fall") {
      if (fallSelectedCourses != undefined) {
        updatedCourses = fallSelectedCourses.filter((course) => {
          return course.name != courseName;
        });
        setFallSelectedCourses(updatedCourses);
        setCookie("fallCourses", updatedCourses, {
          path: "/schedule",
        });
      }
    } else {
      if (winterSelectedCourses != undefined) {
        updatedCourses = winterSelectedCourses.filter((course) => {
          return course.name != courseName;
        });
        setWinterSelectedCourses(updatedCourses);
        setCookie("winterCourses", updatedCourses, {
          path: "/schedule",
        });
      }
    }

    let updatedEvents: EventType[] = [];
    if (events != undefined) {
      updatedEvents = events.filter((event) => {
        return !event.title.includes(courseName);
      });
    }

    setEvents(updatedEvents);
    setShowRemove(false);
  };

  const exportCourses = () => {
    window.print();
  };

  const clearSchedule = () => {
    setFallSelectedCourses([]);
    setCookie("fallCourses", [], {
      path: "/schedule",
    });
    setWinterSelectedCourses([]);
    setCookie("winterCourses", [], {
      path: "/schedule",
    });
    setNumCourses(0);
    setCookie("numCourses", 0, {
      path: "/schedule",
    });
    setEvents([]);
    localStorage.setItem("events", JSON.stringify("[]"));
    setShowScheduleConfirmation(false);
  };

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
        <ExportContainer>
          <Button variant="danger" id="exportBtn" onClick={exportCourses}>
            Export
          </Button>
        </ExportContainer>
      </SelectionContainer>
      <Container>
        {/* Search Component */}
        <FilterContainer>
          <Header>Create Filters</Header>

          <FormContainerOuter>
            <FormContainer>
              <Form id="dayToggles">
                <Form.Check
                  className={themeType == "light" ? "dark" : "text-white"}
                  type="switch"
                  name="Monday"
                  label="Monday"
                />
                <Form.Check
                  className={themeType == "light" ? "dark" : "text-white"}
                  type="switch"
                  name="Tuesday"
                  label="Tuesday"
                />
                <Form.Check
                  className={themeType == "light" ? "dark" : "text-white"}
                  type="switch"
                  name="Wednesday"
                  label="Wednesday"
                />
                <Form.Check
                  className={themeType == "light" ? "dark" : "text-white"}
                  type="switch"
                  name="Thursday"
                  label="Thursday"
                />
                <Form.Check
                  className={themeType == "light" ? "dark" : "text-white"}
                  type="switch"
                  name="Friday"
                  label="Friday"
                />
              </Form>
            </FormContainer>
            <FormContainer>
              <Form id="yearToggles">
                <Form.Check
                  className={themeType == "light" ? "dark" : "text-white"}
                  type="switch"
                  name="First Year"
                  label="First Year"
                />
                <Form.Check
                  className={themeType == "light" ? "dark" : "text-white"}
                  type="switch"
                  name="Second Year"
                  label="Second Year"
                />
                <Form.Check
                  className={themeType == "light" ? "dark" : "text-white"}
                  type="switch"
                  name="Third Year"
                  label="Third Year"
                />
                <Form.Check
                  className={themeType == "light" ? "dark" : "text-white"}
                  type="switch"
                  name="Fourth Year"
                  label="Fourth Year"
                />
                <Form.Check
                  className={themeType == "light" ? "dark" : "text-white"}
                  type="switch"
                  name="Graduate"
                  label="Graduate"
                />
              </Form>
            </FormContainer>
          </FormContainerOuter>

          <CreateTimeContainerOuter>
            <CreateTimeContainer>
              <span className={themeType == "light" ? "dark" : "text-white"}>
                Start Time
              </span>
              <Form>
                <Input type="time" id="startTime" />
              </Form>
            </CreateTimeContainer>
            <CreateTimeContainer>
              {/* <Form.Check inline label="PM" name="group1" type="checkbox" id={"inline-checkbox-start"}/> */}
            </CreateTimeContainer>

            <CreateTimeContainer>
              <span className={themeType == "light" ? "dark" : "text-white"}>
                End Time
              </span>
              <Form>
                <Input type="time" id="endTime" />
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
          <Header>Active Filters</Header>
          <FormContainerOuter>
            <FormContainer>
              <List>
                <span className={themeType == "light" ? "dark" : "text-white"}>
                  <b>Included Days</b>
                </span>
                <ul
                  className={themeType == "light" ? "dark" : "text-white"}
                  id="activeDayFilters"
                ></ul>
              </List>
            </FormContainer>
            <FormContainer>
              <List>
                <span className={themeType == "light" ? "dark" : "text-white"}>
                  <b>Included Years</b>
                </span>
                <ul
                  className={themeType == "light" ? "dark" : "text-white"}
                  id="activeYearFilters"
                ></ul>
              </List>
            </FormContainer>
          </FormContainerOuter>

          <ActiveTimeContainerOuter>
            <ActiveTimeContainer>
              <List>
                <span className={themeType == "light" ? "dark" : "text-white"}>
                  <b>Start Time</b>
                </span>
                <div
                  className={themeType == "light" ? "dark" : "text-white"}
                  id="activeStartTimes"
                ></div>
              </List>
            </ActiveTimeContainer>
            <ActiveTimeContainer>
              <List>
                <br />
                <div
                  className={themeType == "light" ? "dark" : "text-white"}
                  id="activeTimeDashes"
                ></div>
              </List>
            </ActiveTimeContainer>
            <ActiveTimeContainer>
              <List>
                <span className={themeType == "light" ? "dark" : "text-white"}>
                  <b>End Time</b>
                </span>
                <div
                  className={themeType == "light" ? "dark" : "text-white"}
                  id="activeEndTimes"
                ></div>
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
            <Header>Search Courses</Header>
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
            <Header>Selected Courses</Header>
            {/* Displays list of selected courses into a container */}
            <List>
              {term === "fall"
                ? fallSelectedCourses.map((course, i) => (
                    <li
                      key={i}
                      onClick={() => handleShowRemoveModal(course.name)}
                    >
                      <RemovableCourse>
                        <FiTrash2 />
                        <span>&nbsp;&nbsp;{course.name}</span>
                      </RemovableCourse>
                    </li>
                  ))
                : winterSelectedCourses.map((course, i) => (
                    <li
                      key={i}
                      onClick={() => handleShowRemoveModal(course.name)}
                    >
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
      <ClearContainer>
        <Button
          variant="danger"
          onClick={() => {
            setShowScheduleConfirmation(true);
          }}
        >
          Clear Schedule
        </Button>
      </ClearContainer>
      <CalendarContainer
        className={themeType == "light" ? "dark" : "text-white"}
      >
        <FullCalendar
          ref={calendarRef}
          customButtons={{
            FallButton: {
              text: "Fall",
              click: function () {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                calendarRef.current.getApi().gotoDate(new Date(2022, 8, 9));
              },
            },
            WinterButton: {
              text: "Winter",
              click: function () {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                calendarRef.current.getApi().gotoDate(new Date(2023, 0, 1));
              },
            },
          }}
          headerToolbar={{
            start: "title", // will normally be on the left. if RTL, will be on the right
            end: "today FallButton WinterButton prev,next", // will normally be on the right. if RTL, will be on the left
          }}
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

      <Modal show={showScheduleConfirmation} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Clear Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to clear your schedule?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={clearSchedule}>
            Clear
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Schedule;
