import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding-block: 2rem;
`;

export const SubContainer = styled.div`
  border: 1px solid #0d6efd;
  border-radius: 2px;
  height: 26rem;
  width: 28rem;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SelectedCoursesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CalendarContainer = styled.div`
  margin-inline: 7rem;
`;

export const Input = styled.input`
  width: 99%;
`;

export const ScrollableContainer = styled.div`
  height: 21rem;
  width: 27.2rem;
  overflow-y: scroll;
`;

export const RemovableCourse = styled.span`
  :hover {
    cursor: pointer;
    color: #dc3545;
  }
`;

export const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
`;

export const ListItem = styled.li`
  padding-block: 3px;
  :hover {
    cursor: pointer;
    opacity: 90%;
    color: #0d6efd;
  }
`;
