import { Offcanvas, ButtonGroup, Button } from "react-bootstrap";
import { BiLogIn } from "react-icons/bi";
import { getAuth, signOut } from "firebase/auth";

const LeftSidebar = ({ leftSidebarMode, leftSideHide, userData }) => {
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
        <Offcanvas.Title></Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        Some text as placeholder. In real life you can have the elements you
        have chosen. Like, text, images, lists, etc.
      </Offcanvas.Body>
      <Button variant="light" onClick={logOut}>
        로그아웃 <BiLogIn />
      </Button>
    </Offcanvas>
  );
};

export default LeftSidebar;
