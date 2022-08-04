import { Navbar, Container, Nav } from "react-bootstrap";

const BottomNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" className="BottomNavbar_head">
      <p>Copyright &copy; toolforbiz {new Date().getFullYear()}</p>
      <p>v0.0.1</p>
    </Navbar>
  );
};

export default BottomNavbar;
