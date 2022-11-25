import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopNavbar from "./Component/TopNavbar";
import Home from "./routes/Home";
import LoginForm from "./routes/LoginForm";
import RandomFood from "./routes/RandomFood";
import Rummikub from "./routes/Rummikub";
import Weather from "./routes/Weather";
const AppRouter = ({ userData }) => {
  return (
    <Router>
      {userData && <TopNavbar userData={userData} />}
      <Routes>
        {userData ? (
          <>
            <Route path="/toolforbiz" element={<Home />} />
            <Route path="/toolforbiz/randomFood" element={<RandomFood />} />
            <Route path="/toolforbiz/rummikub" element={<Rummikub />} />
            <Route path="/toolforbiz/weather" element={<Weather />} />
          </>
        ) : (
          <Route path="/toolforbiz" element={<LoginForm />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
