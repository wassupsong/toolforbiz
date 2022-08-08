import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BottomNavbar from "./BottomNavbar";
import TopNavbar from "./TopNavbar";
import Home from "./Home";
import LoginForm from "./LoginForm";
import RandomFood from "./RandomFood";

const AppRouter = ({ userData }) => {
  return (
    <Router>
      <TopNavbar userData={userData} />
      <Routes>
        {userData ? (
          <>
            <Route path="/toolforbiz" element={<Home />} />
            <Route path="/toolforbiz/randomFood" element={<RandomFood />} />
          </>
        ) : (
          <Route path="/toolforbiz" element={<LoginForm />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
