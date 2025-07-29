import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Paper, Typography, TextField, Button } from '@mui/material';

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

  const navigate = useNavigate();

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
        setMessage("Signup successful! Logging you in...");

        // Try to log in automatically
        const loginResponse = await fetch("/auth/login/", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "X-CSRFToken": getCSRFToken()
          },
          credentials: "include",
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });

        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          setFormData({
            username: "",
            email: "",
            first_name: "",
            last_name: "",
            password: "",
            password2: "",
          });
          onSignup(loginData.username);
          navigate("/home");
        } else {
          setError("Signup succeeded but automatic login failed. Please log in manually.");
        }
      } else {
        const data = await response.json();
        setError(formatErrors(data));
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Network error");
    }
  };

  return (
    <Grid
      container
      style={{ minHeight: '100vh' }} // full viewport height
      justifyContent="center"        // horizontal centering
      alignItems="center"            // vertical centering
    >
      <Grid size={{ xs:10, sm:6, md:4 }} component={Paper} elevation={3} style={{ padding: 24 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          {message && <p style={{color: "green"}}>{message}</p>}
          {error && <p style={{color: "red"}}>{error}</p>}

          <TextField
            name="username"
            value={formData.username}
            label="Username"
            variant="outlined"
            color="primary"
            size="small"
            fullWidth
            margin="normal"
            onChange={handleChange}
            required
          />
          <TextField
            name="email"
            type="email"
            label="E-mail"
            variant="outlined"
            color="primary"
            size="small"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            name="first_name"
            value={formData.first_name}
            label="First Name"
            variant="outlined"
            color="primary"
            size="small"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            name="last_name"
            value={formData.last_name}
            label="Last Name"
            variant="outlined"
            color="primary"
            size="small"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            name="password"
            type="password"
            value={formData.password}
            label="Password"
            variant="outlined"
            color="primary"
            size="small"
            fullWidth
            margin="normal"
            onChange={handleChange}
            required
          />
          <TextField
            name="password2"
            type="password"
            value={formData.password2}
            label="Confirm Password"
            variant="outlined"
            color="primary"
            size="small"
            fullWidth
            margin="normal"
            onChange={handleChange}
            required
          />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>Sign Up</Button>

          <p>
            Already have an account? <Link to="/login">Sign in.</Link>
          </p>
        </form>
      </Grid>
    </Grid>
  );
}
