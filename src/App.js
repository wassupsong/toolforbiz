import LoginForm from "./LoginForm";
import Home from "./Home";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
      } else {
        setUserData(null);
      }
    });
  }, []);
  return <>{userData ? <Home /> : <LoginForm />}</>;
};

export default App;
