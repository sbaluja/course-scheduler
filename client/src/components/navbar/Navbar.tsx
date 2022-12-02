import React, { useState } from "react";
import {
  Container,
  NavbarContainer,
  LinkContainer,
  LogoContainer,
  Header,
  LinkWrapper,
  Link,
  List,
  ButtonContainer,
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
import MusicOnIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";

const Navbar: React.FC<NavProps> = ({ themeType, toggleTheme }) => {
  const { width } = useWindowDimensions();

  const [value, setValue] = useState("");
  const handleSelect = (event: string | null) => {
    if (event) {
      setValue(event);
      const musicElement = document.getElementById(
        "music"
      ) as HTMLAudioElement | null;
      if (musicElement) {
        console.log("Loading music: " + event + "...");
        musicElement.pause();
        if (event !== "OFF") {
          musicElement.setAttribute("src", "music/" + event);
          musicElement.load();
          musicElement.play();
          musicElement.volume = 0.1;
        }
      } else {
        console.log("Music element not found");
      }
    }
  };

  return (
    <Container>
      <audio id="music" loop>
        <source type="audio/mpeg" />
      </audio>
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
                <Label value={value} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="OFF">OFF</Dropdown.Item>
                <Dropdown.Item eventKey="Ellinia.mp3">MapleStory - Ellinia</Dropdown.Item>
                <Dropdown.Item eventKey="Henesys.mp3">MapleStory - Henesys</Dropdown.Item>
                <Dropdown.Item eventKey="Kerning.mp3">MapleStory - Kerning City</Dropdown.Item>
                <Dropdown.Item eventKey="Dior.mp3">Dior - Pop Smoke</Dropdown.Item>
                <Dropdown.Item eventKey="Mario.mp3">Super Mario Bros.</Dropdown.Item>
                <Dropdown.Item eventKey="Wii.mp3">Wii Theme</Dropdown.Item>
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
        <MobileNavbar themeType={themeType} />
      )}
    </Container>
  );
};

function Play({ value }: any) {
  if (value.toString() == "OFF" || value.toString() == "") {
    return <audio id="music"></audio>;
  } else {
    // console.log(value.toString())
    return (
      <audio id="music" controls autoPlay>
        <source src={value} type="audio/mpeg" />
      </audio>
    );
  }
}

function Label({ value }: any) {
  if (value.toString() == "OFF" || value == "") {
    return <MusicOffIcon></MusicOffIcon>;
  } else {
    return <MusicOnIcon></MusicOnIcon>;
  }
}

export default Navbar;
