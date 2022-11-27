import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding-block: 2rem;
  @media print {
    display: none;
  }
`;

export const Header = styled.h2`
  color: ${({ theme }) => theme.primary};
`;

export const SubContainer = styled.div`
  border: 1px solid #0d6efd;
  border-radius: 2px;
  height: 26rem;
  width: 28rem;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  border: 1px solid #0d6efd;
  border-radius: 2px;
  height: 26rem;
  width: 28rem;
  @media print {
    display: none;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: 2rem;
  width: 8rem;
  padding-block: 2rem;
`;

export const ExportContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: 2.3rem;
  width: 8rem;
  @media print {
    display: none;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  height: 12rem;
  width: 13rem;
`;

export const FormContainerOuter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  height: 10rem;
  width: 26rem;
  @media print {
    display: none;
  }
`;

export const ActiveTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 10rem;
  width: 15rem;
  @media print {
    display: none;
  }
`;

export const ActiveTimeContainerOuter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 1rem;
  width: 16rem;
  padding-block: 1rem;
  padding-top: 1rem;
  @media print {
    display: none;
  }
`;

export const CreateTimeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  height: 3rem;
  width: 3rem;
  padding-block: 1rem;
  padding-right: 4rem;
  @media print {
    display: none;
  }
`;

export const CreateTimeContainerOuter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  height: 2rem;
  width: 24rem;
  padding-block: 1rem;
  @media print {
    display: none;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media print {
    display: none;
  }
`;

export const SelectedCoursesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media print {
    display: none;
  }
`;

export const CalendarContainer = styled.div`
  margin-inline: 7rem;
  @media print {
    justify-content: center;
    align-items: center;
    zoom: 40%;
  }
`;

export const Input = styled.input`
  width: 99%;
`;

export const ScrollableContainer = styled.div`
  height: 21rem;
  width: 27.2rem;
  overflow-y: scroll;
`;

export const RemoveContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media print {
    display: none;
  }
`;

export const RemovableCourse = styled.span`
  color: ${({ theme }) => theme.primary};

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
  color: ${({ theme }) => theme.primary};

  padding-block: 3px;
  :hover {
    cursor: pointer;
    opacity: 90%;
    color: #0d6efd;
  }
`;

export const SelectionContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-block: 2rem 1rem;
  padding-right: 20px;
  @media print {
    display: none;
  }
`;

export const ClearContainer = styled.div`
  display: flex;
  justify-content: center;
  @media print {
    display: none;
  }
`;
