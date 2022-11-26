import React, {useState} from "react";
import {
  Container,
  NavbarContainer,
  LinkContainer,
  LogoContainer,
  Header,
  LinkWrapper,
  Link,
  List,
  ButtonContainer
} from "./Navbar.styled";
import Dropdown from "react-bootstrap/Dropdown";
import { NavLink } from "react-router-dom";
import { MobileNavbar } from "./MobileNavbar";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { pages, activeCheck } from "./NavbarConstants";
import { NavProps } from "./Navbar.types";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MusicOnIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';

const Navbar: React.FC<NavProps> = ({ themeType, toggleTheme }) => {
  const { width } = useWindowDimensions();
  
  const [value,setValue]=useState('');
  const handleSelect=(event: string | null)=>{
    // console.log('anything');
    // console.log(event);
    // console.log(event.target.va);
    if (event){
      setValue(event);
    }

    
  }
 
  return (
    <Container>
      <Play value={value}/>
      {width > 1024 ? (
        <NavbarContainer>
          <LinkContainer>
            <List>
              {pages.slice(0, 3).map((page, id) => (
                <LinkWrapper key={id}>
                  <Link
                    isActive={activeCheck(window.location.pathname, page.link)}
                    to={page.link}
                  >
                    {page.name}
                  </Link>
                </LinkWrapper>
              ))}
            </List>
          </LinkContainer>
          <LogoContainer>
            <NavLink to="/" style={{ textDecoration: "none" }}>
              <Header>CourseClub</Header>
            </NavLink>
          </LogoContainer>
          <LinkContainer>
            <Dropdown onSelect={handleSelect} id="dropdown-music-main">
              <Dropdown.Toggle variant="primary" id="dropdown-music">
                {/* {term === "fall" ? "Fall 2022" : "Winter 2023"} */}
                <Label value={value}/>
                {/* Whatever they picked <MusicOnIcon></MusicOnIcon> */}
              </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="OFF">OFF</Dropdown.Item>
                      <Dropdown.Item eventKey="Ellinia.mp3">Ellinia</Dropdown.Item>
                      <Dropdown.Item eventKey="Henesys.mp3">Henesys</Dropdown.Item>
                      <Dropdown.Item eventKey="Kerning.mp3">Kerning</Dropdown.Item>
                    </Dropdown.Menu>
              </Dropdown>
            <List>
              {pages.slice(3, 6).map((page, id) => (
                <LinkWrapper key={id}>
                  <Link
                    isActive={activeCheck(window.location.pathname, page.link)}
                    to={page.link}
                  >
                    {page.name}
                  </Link>
                </LinkWrapper>
              ))}
              <IconButton onClick={toggleTheme}>
                {themeType === "light" ? (
                  <DarkModeIcon sx={{ color: "#000000" }} />
                ) : (
                  <LightModeIcon sx={{ color: "#FFFFFF" }} />
                )}
              </IconButton>
            </List>
          </LinkContainer>
        </NavbarContainer>
      ) : (
        <MobileNavbar />
      )}
    </Container>
  );
};


function Play({value} : any) {
  
  if (value.toString() != 'OFF') {
    return <audio autoPlay controls><source src={value} type="audio/mp3"/></audio>;
  }else {
    return <audio></audio>;
  }
}

function Label({value} : any) {
  
  if (value.toString() == 'OFF' || value == "") {
    return <MusicOffIcon></MusicOffIcon>;
  }else {
    return <MusicOnIcon></MusicOnIcon>;
  }
}

export default Navbar;
