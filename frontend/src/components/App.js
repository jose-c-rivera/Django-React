import React, { useState, useEffect } from "react";
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./auth_app/Login";
import Home from "./auth_app/Home";
import Signup from "./auth_app/Signup";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // <-- new

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/auth/user/", {
          credentials: "include", // sends session cookie
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.username);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false); // <-- done loading
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>; // <-- wait before rendering routes

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/signup" element={<Signup onSignup={setUser} />} />
        <Route
          path="/home"
          element={user ? <Home onLogout={() => setUser(null)} /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}


export default App;
