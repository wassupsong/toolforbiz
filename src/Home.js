import BottomNavbar from "./BottomNavbar";
import TopNavbar from "./TopNavbar";
import { BsMouse, BsArrowRightCircleFill } from "react-icons/bs";
import { useRef } from "react";
import food from "./image/food.jpg";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const onScroll = (event) => {
    const {
      target: { scrollTop },
    } = event;
    if (scrollTop > 200) {
      fadeInDiv();
    }
  };
  const fadeInDiv = () => {
    const contentDiv = document.getElementById("content_div").children;
    let cnt = 0;
    const interval = setInterval(() => {
      contentDiv[cnt].style.transitionProperty = "opacity transform";
      contentDiv[cnt].style.transitionDuration = "1s";
      contentDiv[cnt].style.transitionTimingFunction =
        "cubic-bezier(0, 0, 0.2, 1)";
      contentDiv[cnt].style.transitionDelay = "0.2s";
      contentDiv[cnt].style.opacity = 1;
      contentDiv[cnt].style.transform = "translate3d(0, 0, 0)";
      cnt++;
      if (cnt === contentDiv.length) clearInterval(interval);
    }, 500);
  };
  const clickScrollBtn = (event) => {
    fadeInDiv();
    document
      .getElementById("content")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const moveRandomFood = () => {
    navigate("/toolforbiz/randomFood");
  };
  return (
    <div className="home_container" onScroll={onScroll}>
      <div className="home_title">
        <h1>Tool for Biz</h1>
        <p>Tool for Comfortable Working</p>
        <BsMouse
          size="2rem"
          className="home_mouseicon"
          onClick={clickScrollBtn}
        />
        <span>Scroll Down or Click Me</span>
      </div>
      <div className="home_content" id="content">
        <div
          className="home_content_div"
          id="content_div"
          onClick={moveRandomFood}
        >
          <p>랜덤 음식 고르기</p>
          <Image rounded src={food} className="home_image" />
          <p>
            Random Choice
            <BsArrowRightCircleFill className="" />
          </p>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default Home;
