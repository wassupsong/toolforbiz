import BottomNavbar from "../Component/BottomNavbar";
import { BsMouse, BsSearch } from "react-icons/bs";
import { MdOutlineWatchLater } from "react-icons/md";
import { GrFormClose } from "react-icons/gr";
import { useEffect, useRef, useState } from "react";
import * as common from "../Common";

const Home = () => {
  const [searchVal, setSearchVal] = useState("");
  const [searchCheck, setSearchCheck] = useState(true);
  const [recordList, setRecordList] = useState("");
  //시계 interval
  const clock = () => {
    const today = new Date();
    const dateStr = `${today.getFullYear()}년 ${
      today.getMonth() + 1
    }월 ${today.getDate()}일 (${common.getDayLabel(today.getDay(), 2)})`;
    const timeStr = common.formatTime(today);
    document.getElementById("date").innerText = dateStr;
    document.getElementById("time").innerText = timeStr;
  };
  useEffect(() => {
    if (localStorage.getItem("searchRecordList")) {
      setRecordList(localStorage.getItem("searchRecordList"));
    }
    //시계
    setInterval(clock, 1000);
  }, []);
  const contentRef = useRef();
  //메인 화면 scroll event
  const onScroll = (event) => {
    const {
      target: { scrollTop },
    } = event;
    if (scrollTop > 200) {
      fadeInDiv();
    }
  };
  //메인 컨텐츠 fadeIn 구현
  const fadeInDiv = () => {
    const contentDiv = document.getElementById(`content_div`).children;
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
  //스크롤 하지않고, 클릭으로 내릴 시, 슬라이드효과
  const clickScrollBtn = () => {
    contentRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "center",
    });
  };
  //검색창 inputChange
  const inputChange = (event) => {
    const {
      target: { value },
    } = event;
    setSearchVal(value);
  };
  //검색 버튼 및 enter 시, event
  const searchSite = (event) => {
    event.preventDefault();
    if (!searchVal) {
      alert("검색어를 입력해주세요.");
      return;
    }
    saveSearchRecord();
    if (searchCheck)
      window.open(`https://www.google.com/search?q=${encodeURI(searchVal)}`);

    if (!searchCheck)
      window.open(
        `https://search.naver.com/search.naver?query=${encodeURI(searchVal)}`
      );
    setRecordList(localStorage.getItem("searchRecordList"));
  };
  //최근검색기록 저장
  const saveSearchRecord = () => {
    if (!recordList) {
      localStorage.setItem("searchRecordList", searchVal);
    } else {
      let recordArr = recordList.split(",");
      if (recordArr.includes(searchVal))
        recordArr.splice(recordArr.indexOf(searchVal), 1);

      if (recordArr.length > 10) {
        recordArr.shift();
        recordArr.unshift(searchVal);
        recordArr.join(",");
      } else {
        recordArr.unshift(searchVal);
        recordArr.join(",");
      }
      localStorage.setItem("searchRecordList", recordArr);
    }
  };
  //검색포털사이트 토글
  const toggleSearch = (event) => {
    const {
      target: { id },
    } = event;
    if (id === "radio1") setSearchCheck(true);
    if (id === "radio2") setSearchCheck(false);
  };
  //최근검색기록 클릭 시 이벤트
  const clickSearchItem = (item) => {
    if (searchCheck) {
      window.open(`https://www.google.com/search?q=${encodeURI(item)}`);
    } else {
      window.open(
        `https://search.naver.com/search.naver?query=${encodeURI(item)}`
      );
    }
  };
  //검색창 포커스 시 이벤트
  const searchFocus = (event) => {
    if (event.type === "focus") {
      document.getElementById("recordList").style.display = "block";
      setRecordList(localStorage.getItem("searchRecordList"));
    }
    if (event.type === "blur")
      setTimeout(
        () => (document.getElementById("recordList").style.display = "none"),
        200
      );
  };
  //검색기록 삭제 버튼 클릭 시 이벤트
  const deleteRecordList = (event, item) => {
    event.stopPropagation();
    let recordArr = recordList.split(",");
    recordArr.splice(recordArr.indexOf(item), 1);
    recordArr.join(",");
    localStorage.setItem("searchRecordList", recordArr);
  };
  //검색기록 삭제 버튼 show and hide
  const deleteRecordEvent = (event) => {
    const {
      target: { id },
    } = event;
    if (id) {
      if (event.type === "mouseenter") {
        document.getElementById(`close${id}`).style.display = "inline-block";
      } else {
        document.getElementById(`close${id}`).style.display = "none";
      }
    }
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
      <div className="home_content">
        <div className="home_content_div" id="content_div" ref={contentRef}>
          <div className="home_content_time">
            <p id="date"></p>
            <h1 id="time"></h1>
          </div>
          <div className="home_content_searchBtn">
            <input
              type="radio"
              id="radio1"
              checked={searchCheck}
              onChange={toggleSearch}
            />
            <label htmlFor="radio1">Google</label>
            <input
              type="radio"
              id="radio2"
              checked={!searchCheck}
              onChange={toggleSearch}
            />
            <label htmlFor="radio2">Naver</label>
          </div>
          <form onSubmit={searchSite}>
            <div className="home_content_search">
              <BsSearch onClick={searchSite} />
              <input
                type="text"
                onChange={inputChange}
                value={searchVal}
                onFocus={searchFocus}
                onBlur={searchFocus}
              />
              {recordList ? (
                <ul id="recordList">
                  {recordList.split(",").map((item, i) => (
                    <li
                      key={i}
                      onClick={() => clickSearchItem(item)}
                      onMouseEnter={deleteRecordEvent}
                      onMouseLeave={deleteRecordEvent}
                      id={i}
                    >
                      <MdOutlineWatchLater style={{ marginRight: "10px" }} />
                      {item}
                      <GrFormClose
                        style={{
                          float: "right",
                          width: "1.5rem",
                          height: "1.5rem",
                          display: "none",
                          zIndex: "9999",
                        }}
                        id={`close${i}`}
                        onClick={(e) => deleteRecordList(e, item)}
                      />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </form>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
};

export default Home;
