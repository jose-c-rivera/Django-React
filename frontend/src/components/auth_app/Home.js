import React, { useEffect, useState } from "react";
import { Button } from '@mui/material';

function Home({ onLogout }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/auth/home/", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message || data.error));
  }, []);

  const handleLogout = async () => {
    await fetch("/auth/logout/", {
      method: "POST",
      credentials: "include",
    });
    onLogout();
  };

  return (
    <div>
      <h2>Home</h2>
      <p>{message}</p>
      <Button onClick={handleLogout}
        variant="contained"
        color="error">Logout
      </Button>
    </div>
  );
}

export default Home;
