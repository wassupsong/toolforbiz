import { Offcanvas, Button } from "react-bootstrap";
import { BiLogIn } from "react-icons/bi";
import { getAuth, signOut } from "firebase/auth";
import { Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";

const LeftSidebar = ({
  leftSidebarMode,
  leftSideHide,
  userData,
  weatherObj,
}) => {
  const [weatherStr, setWeatherStr] = useState("");
  const weatherStrSelector = {
    Clear: "맑음",
    Rain: "비",
    Clouds: "구름",
    Snow: "눈",
    Thunderstorm: "번개",
    Drizzle: "이슬비",
    Squall: "강풍",
    Tornado: "태풍",
    Ash: "재",
    Dust: "먼지",
    Sand: "황사",
    Fog: "안개",
    Haze: "연무",
    Mist: "박무",
    Smoke: "안개",
  };

  useEffect(() => {
    console.log(userData);
    const str = weatherObj.weather[0].main;
    for (let i in weatherStrSelector) {
      if (str === i) {
        setWeatherStr(weatherStrSelector[i]);
        break;
      }
    }
  }, [weatherObj]);
  //로그아웃
  const logOut = () => {
    const auth = getAuth();
    signOut(auth);
  };
  return (
    <Offcanvas
      show={leftSidebarMode}
      onHide={leftSideHide}
      className="leftSidebar_container"
    >
      <Offcanvas.Header closeButton>
        {weatherObj ? (
          <Offcanvas.Title>
            {weatherObj.name} {Math.floor(weatherObj.main.temp - 273.15)}℃{" "}
            {weatherStr}
            <img
              src={`http://openweathermap.org/img/wn/${weatherObj.weather[0].icon}.png`}
            />
          </Offcanvas.Title>
        ) : (
          <div className="Loading">
            <Spinner animation="border" variant="secondary" />
          </div>
        )}
      </Offcanvas.Header>

      <Offcanvas.Body></Offcanvas.Body>

      <Button variant="light" onClick={logOut}>
        로그아웃 <BiLogIn />
      </Button>
    </Offcanvas>
  );
};

export default LeftSidebar;
