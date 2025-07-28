import React, { useState, useEffect } from "react";
import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

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
        {/* Auth routes without nav */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/signup" element={<Signup onSignup={setUser} />} />
        </Route>

        {/* Main app routes with nav */}
        <Route element={<MainLayout />}>
          <Route
            path="/home"
            element={user ? <Home onLogout={() => setUser(null)} /> : <Navigate to="/login" />}
          />
          {/* add more protected routes here */}
        </Route>

        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}


export default App;
