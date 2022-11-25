import { useEffect, useState } from "react";
import { BsJustify } from "react-icons/bs";
import { BiLogIn } from "react-icons/bi";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

const TopNavbar = ({ userData }) => {
  const clickMenuToggle = () => {
    const menu = document.querySelector(".topNavbar_menu");
    const foot = document.querySelector(".topNavbar_foot");
    const dimm = document.querySelector(".menu_dimm");
    menu.classList.toggle("on");
    foot.classList.toggle("on");
    dimm.classList.toggle("on");
  };

  //로그아웃
  const logOut = () => {
    const auth = getAuth();
    signOut(auth);
  };

  return (
    <>
      <div className="menu_dimm" onClick={clickMenuToggle}></div>
      <nav className="topNavbar_Container">
        <div className="topNavbar_head">
          <a href="/toolforbiz">toolforbiz</a>
        </div>
        <ul className="topNavbar_menu">
          <li>
            <Link
              to="/toolforbiz/randomFood"
              className="topNavbar_Link"
              onClick={clickMenuToggle}
            >
              랜덤점심메뉴
            </Link>
          </li>
          <li>
            <Link
              to="/toolforbiz/rummiKub"
              className="topNavbar_Link"
              onClick={clickMenuToggle}
            >
              루미큐브
            </Link>
          </li>
          {/* <li>
            <Link
              to="/toolforbiz/weather"
              className="topNavbar_Link"
              onClick={clickMenuToggle}
            >
              날씨정보
            </Link>
          </li> */}
        </ul>
        <ul className="topNavbar_foot">
          <li>
            <button type="button" className="logout" onClick={logOut}>
              로그아웃
              <BiLogIn />
            </button>
          </li>
        </ul>
        <button
          type="button"
          className="topNavbar_menu_mobile"
          onClick={clickMenuToggle}
        >
          <BsJustify className="topNavbar_icon" size="2rem" />
        </button>
      </nav>
    </>
  );
};

export default TopNavbar;
