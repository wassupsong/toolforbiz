import { useState } from "react";
import { Navbar, Container, Nav, Button, Dropdown } from "react-bootstrap";
import LeftSidebar from "./LeftSidebar";
import { BsJustify } from "react-icons/bs";
import { Link } from "react-router-dom";

const TopNavbar = ({ userData }) => {
  const [leftSidebarMode, setleftSidebarMode] = useState(false);
  const leftSideShow = () => setleftSidebarMode(true);
  const leftSideHide = () => setleftSidebarMode(false);
  return (
    <Navbar bg="dark" variant="dark" sticky="top">
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
      <LeftSidebar
        leftSideHide={leftSideHide}
        leftSidebarMode={leftSidebarMode}
        userData={userData}
      />
    </Navbar>
  );
};

export default TopNavbar;
