import { useEffect, useState } from "react";
import { Navbar, Container, Nav, Button, Dropdown } from "react-bootstrap";
import LeftSidebar from "./LeftSidebar";
import { BsJustify } from "react-icons/bs";
import { Link } from "react-router-dom";

const TopNavbar = ({ userData }) => {
  const [leftSidebarMode, setleftSidebarMode] = useState(false);
  const [weatherObj, setWeatherObj] = useState(null);
  const leftSideShow = () => setleftSidebarMode(true);
  const leftSideHide = () => setleftSidebarMode(false);
  useEffect(() => {
    //위치정보(날씨활용)
    let defaultPosition = {
      latitude: 37.33,
      longitude: 126.59,
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        getWeatherInfo(position.coords);
      });
    } else {
      /* 위치정보 사용 불가능 */
      getWeatherInfo(defaultPosition);
    }
  }, []);
  const getWeatherInfo = async (position) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      ).then((res) => res.json());
      setWeatherObj(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar bg="dark" variant="dark" className="topNavbar_Main">
      <Button variant="dark" onClick={leftSideShow} size="lg">
        <BsJustify className="topNavbar_icon" size="2rem" />
      </Button>
      <Container className="topNavbar_head">
        <Navbar.Brand href="/toolforbiz">toolforbiz</Navbar.Brand>
        <Nav className="me-auto">
          <Link to="/toolforbiz/randomFood" className="topNavbar_Link">
            RandomFood
          </Link>
          <Link to="/toolforbiz/rummiKub" className="topNavbar_Link">
            Rummikub
          </Link>
        </Nav>
      </Container>
      {weatherObj ? (
        <LeftSidebar
          leftSideHide={leftSideHide}
          leftSidebarMode={leftSidebarMode}
          userData={userData}
          weatherObj={weatherObj}
        />
      ) : null}
    </Navbar>
  );
};

export default TopNavbar;
