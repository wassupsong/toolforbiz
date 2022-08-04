import { Offcanvas } from "react-bootstrap";

const LeftSidebar = ({ leftSidebarMode, leftSideHide }) => {
  return (
    <Offcanvas
      show={leftSidebarMode}
      onHide={leftSideHide}
      className="lefSidebar_container"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        Some text as placeholder. In real life you can have the elements you
        have chosen. Like, text, images, lists, etc.
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default LeftSidebar;
