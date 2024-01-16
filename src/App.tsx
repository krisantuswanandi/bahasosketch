import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Header from "./components/Header";
import Upload from "./components/Upload";
import LoginModal from "./components/LoginModal";
import Logout from "./components/Logout";
import Gallery from "./components/Gallery";
import Button from "./components/Button";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  function openLogin() {
    setIsLoginOpen(true);
  }

  function closeLogin() {
    setIsLoginOpen(false);
  }

  return (
    <div className="m-auto max-w-screen-lg p-2">
      <Header />
      <Gallery />
      {isLoggedIn ? (
        <>
          <Upload />
          <Logout />
        </>
      ) : (
        <>
          <Button
            className="fixed bottom-10 right-10 z-40 h-16 w-16 rounded-full text-4xl leading-none"
            onClick={openLogin}
          >
            +
          </Button>
          {isLoginOpen && <LoginModal onClose={closeLogin} />}
        </>
      )}
    </div>
  );
}

export default App;
