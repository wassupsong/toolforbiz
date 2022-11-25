import { Offcanvas, Button } from "react-bootstrap";
import { BiLogIn } from "react-icons/bi";
import { getAuth, signOut } from "firebase/auth";
import { Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";

const LeftSidebar = () => {
  return (
    <div className="leftSidebar_container">
      <div className="leftSidebar_header">
        {weatherObj ? (
          <div className="leftSidebar_title"></div>
        ) : (
          <div className="Loading">
            <Spinner animation="border" variant="secondary" />
          </div>
        )}
      </div>

      <div className="leftSidebar_content"></div>

      <button type="button" className="leftSidebar_logout" onClick={logOut}>
        로그아웃 <BiLogIn />
      </button>
    </div>
  );
};

export default LeftSidebar;
