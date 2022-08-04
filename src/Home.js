import BottomNavbar from "./BottomNavbar";
import TopNavbar from "./TopNavbar";
import { Carousel } from "react-bootstrap";
import { BsMouse } from "react-icons/bs";

const Home = () => {
  const onScroll = (event) => {
    const {
      target: { scrollTop },
    } = event;
    console.log(scrollTop);
  };
  const clickScrollBtn = (event) => {
    document
      .getElementById("content")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className="home_container" onScroll={onScroll}>
      <TopNavbar />
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
        <div className="home_content_div">
          <h1>Important thing</h1>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default Home;
