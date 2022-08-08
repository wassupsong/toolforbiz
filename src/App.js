import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Spinner } from "react-bootstrap";
import AppRouter from "./Router";

const App = () => {
  const [init, setInit] = useState(false);
  const [userData, setUserData] = useState();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
      } else {
        setUserData(null);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter userData={userData} />
      ) : (
        <div className="Loading">
          <Spinner animation="border" variant="secondary" />
        </div>
      )}
    </>
  );
};

export default App;
