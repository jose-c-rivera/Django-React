import React, { useEffect, useState } from "react";

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
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
