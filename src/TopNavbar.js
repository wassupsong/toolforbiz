import { useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import LeftSidebar from "./LeftSidebar";
import { BsJustify } from "react-icons/bs";

const TopNavbar = () => {
  const [leftSidebarMode, setleftSidebarMode] = useState(false);
  const leftSideShow = () => setleftSidebarMode(true);
  const leftSideHide = () => setleftSidebarMode(false);
  return (
    <Navbar bg="dark" variant="dark">
      <Button variant="dark" onClick={leftSideShow} size="lg">
        <BsJustify className="topNavbar_icon" size="2rem" />
      </Button>
      <Container className="topNavbar_head">
        <Navbar.Brand href="#home">toolforbiz</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
      </Container>
      <LeftSidebar
        leftSideHide={leftSideHide}
        leftSidebarMode={leftSidebarMode}
      />
    </Navbar>
  );
};

export default TopNavbar;
