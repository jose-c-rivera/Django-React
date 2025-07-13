import React, { useState } from "react";
import Login from "./auth_app/Login";
import Home from "./auth_app/Home";
import Signup from "./auth_app/Signup";

function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div style={{ padding: "2rem" }}>
      {user ? (
        <Home onLogout={() => setUser(null)} />
      ) : showSignup ? (
        <Signup
          onSignup={(username) => {
            setUser(username);
            setShowSignup(false);
          }}
        />
      ) : (
        <Login
          onLogin={(username) => setUser(username)}
          onShowSignup={() => setShowSignup(true)}
        />
      )}
    </div>
  );
}


export default App;
