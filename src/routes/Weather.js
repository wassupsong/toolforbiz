import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

const Weather = () => {
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
  const [weatherObj, setWeatherObj] = useState(null);
  useEffect(() => {
    //위치정보(날씨활용)
    const defaultPosition = {
      latitude: 37.5642135,
      longitude: 127.0016985,
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getWeatherInfo(position.coords);
        },
        (error) => {
          getWeatherInfo(defaultPosition);
        }
      );
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
  useEffect(() => {
    const str = weatherObj.weather[0].main;
    for (let i in weatherStrSelector) {
      if (str === i) {
        setWeatherStr(weatherStrSelector[i]);
        break;
      }
    }
  }, [weatherObj]);
  return (
    <>
      <div className="weather_dimm"></div>
      <div className="Loading">
        <Spinner animation="border" variant="secondary" />
      </div>
      <div>
        {weatherObj.name} {Math.floor(weatherObj.main.temp - 273.15)}℃{" "}
        {weatherStr}
        <img
          src={`http://openweathermap.org/img/wn/${weatherObj.weather[0].icon}.png`}
        />
      </div>
    </>
  );
};

export default Weather;
