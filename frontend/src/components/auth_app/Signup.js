import React, { useState } from "react";

export default function Signup({ onSignup }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const getCSRFToken = () => {
    const cookie = document.cookie
      .split("; ")
      .find(row => row.startsWith("csrftoken="));
    return cookie ? cookie.split("=")[1] : "";
  };

  const formatErrors = (errors) => {
    return Object.entries(errors)
      .map(([field, messages]) => {
        // Join multiple messages for a field with commas
        const joinedMessages = messages.join(', ');
        // Capitalize the field name and append messages
        return `${field.charAt(0).toUpperCase() + field.slice(1)}: ${joinedMessages}`;
      })
      .join(' | ');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (formData.password !== formData.password2) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/auth/signup/", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken()
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      
      if (response.ok) {
        const data = await response.json();
        setMessage("Signup successful! You can now log in.");
        setFormData({
          username: "",
          email: "",
          first_name: "",
          last_name: "",
          password: "",
          password2: ""
        });
        onSignup(data.username); 
      } else {
        const data = await response.json();
        setError(formatErrors(data));
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {message && <p style={{color: "green"}}>{message}</p>}
      {error && <p style={{color: "red"}}>{error}</p>}

      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        placeholder="First Name"
      />
      <input
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        placeholder="Last Name"
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <input
        name="password2"
        type="password"
        value={formData.password2}
        onChange={handleChange}
        placeholder="Confirm Password"
        required
      />

      <button type="submit">Sign Up</button>
    </form>
  );
}
