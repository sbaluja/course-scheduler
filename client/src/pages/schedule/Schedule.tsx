import React, {useState, useContext } from "react";
import { Layout } from "../../components/layout";
import { CoursesContext } from "../../contexts/course-context";
import { List, ListItem, ScrollableContainer, Container, SubContainer } from "./Schedule.styled";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!

const Schedule = () => {
  const {currentCourses, filteredCourses, filterCourses, courseName, setCourseName } = useContext(CoursesContext);

  // TODO: Update events 
  const events =
      [
        {
          title: 'Event1',
          startTime: '15:30:00',
          endTime: '16:30:00',
          color: 'red',
          daysOfWeek: [2, 4],
          allDay: false,
          startRecur: '2022-09-08',
          endRecur: '2022-12-05',
        },
        {
          title: 'Event2',
          startTime: '12:30:00',
          endTime: '2022-11-02T13:30:00',
          color: 'blue',
          daysOfWeek: [1, 3],
          allDay: false,
          startRecur: '2022-09-08',
          endRecur: '2022-12-05'
        }
        // etc...
      ]

  const handleChange = (e: any) => {
    setCourseName(e.target.value);
    filterCourses(e.target.value);
  }

  const handleClick = (e: any) => {
    console.log(e.target.getAttribute('value'));
  }

  return (
    <Layout>
      <Container>
        {/* Search Component */}
        <SubContainer>
          <input
            type="text"
            id="course"
            name="course"
            onChange={handleChange}
            value={courseName}
          />
          <ScrollableContainer>
            <List>
            {filteredCourses.map((course, i) => (          
                <ListItem onClick={handleClick} value={course.name} key={i}>{course.name}</ListItem>
            ))}
            </List>
          </ScrollableContainer>
        </SubContainer>
        {/* Selected Courses Component */}
        <SubContainer>
        <input
            type="text"
            id="course"
            name="course"
            onChange={handleChange}
            value={courseName}
          />
          <ScrollableContainer>
            <List>
            {filteredCourses.map((course, i) => (          
                <ListItem onClick={handleClick} value={course.name} key={i}>{course.name}</ListItem>
            ))}
            </List>
          </ScrollableContainer>
        </SubContainer>
        {/* Course Conflicts Component */}
        <SubContainer>
        <input
            type="text"
            id="course"
            name="course"
            onChange={handleChange}
            value={courseName}
          />
          <ScrollableContainer>
            <List>
            {filteredCourses.map((course, i) => (          
                <ListItem onClick={handleClick} value={course.name} key={i}>{course.name}</ListItem>
            ))}
            </List>
          </ScrollableContainer>
        </SubContainer>
      </Container>
      <FullCalendar
        plugins={[ timeGridPlugin ]}
        weekends={false}
        slotDuration='00:30'
        slotMinTime='08:00'
        slotMaxTime='23:30'
        timeZone='local'
        events={events}
      />
    </Layout>
  )
}

export default Schedule;