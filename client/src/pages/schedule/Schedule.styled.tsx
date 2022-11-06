import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding-block: 2rem;
`

export const SubContainer = styled.div`
  border: 1px solid #0d6efd;
  border-radius: 2px;
`

export const ScrollableContainer = styled.div`
  height: 24rem;
  width: 36rem;
  overflow-y: scroll;
`;

export const List = styled.ul`
  list-style-type: none;
`

export const ListItem = styled.li`
  :hover{
    cursor: pointer;
    opacity: 90%;
    color: #0d6efd;
  }
`