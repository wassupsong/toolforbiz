import BottomNavbar from "./BottomNavbar";
import { BsMouse, BsArrowRightCircleFill } from "react-icons/bs";
import food from "./image/food.gif";
import sinrimSwim from "./image/sinrimSwim.webp";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const onScroll = (event) => {
    const {
      target: { scrollTop },
    } = event;
    if (scrollTop > 200 && scrollTop < 1000) {
      fadeInDiv(1);
    } else if (scrollTop > 1000) {
      fadeInDiv(2);
    }
  };
  const fadeInDiv = (num) => {
    const contentDiv = document.getElementById(`content_div${num}`).children;
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
    fadeInDiv(1);
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
          name="1"
        />
        <span className="home_title_span">Scroll Down or Click Me</span>
      </div>
      <div className="home_content" id="content">
        <div
          className="home_content_div"
          id="content_div1"
          onClick={moveRandomFood}
        >
          <p>랜덤 음식 고르기</p>
          <Image rounded src={food} className="home_image" />
          <p>
            Random Food
            <BsArrowRightCircleFill className="" />
          </p>
        </div>
      </div>
      <div
        className="home_content"
        id="content"
        style={{ backgroundColor: "white" }}
      >
        <div className="home_content_div" id="content_div2">
          <p style={{ color: "black", padding: "0px" }}>
            힘들 때 우는 자는 삼류다.
          </p>
          <p style={{ color: "black", padding: "0px" }}>
            힘들 때 참는 자는 이류다.
          </p>
          <p style={{ color: "red", padding: "0px" }}>
            힘들 때 웃는 자가 일류다.
          </p>
          <p style={{ color: "grey", padding: "0px" }}>
            Feat. sinrim-dong Phelps
          </p>
          <Image rounded src={sinrimSwim} className="home_image" />
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default Home;
