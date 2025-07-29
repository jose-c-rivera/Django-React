import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Paper, Typography, TextField, Button, Divider } from '@mui/material';

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCSRFToken(),
        },
        credentials: "include", // Include Django session cookie
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.username);
        navigate("/home");  // Redirect to home on success
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error");
    }
  };

  const getCSRFToken = () => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="));
    return cookie ? cookie.split("=")[1] : "";
  };

  return (
    <Grid
      container
      style={{ minHeight: '100vh' }} // full viewport height
      justifyContent="center"        // horizontal centering
      alignItems="center"            // vertical centering
    >
      <Grid size={{ xs:10, sm:8, md:6 }}>
        <Paper elevation={3} style={{ padding: 24 }}>
          <Grid container spacing={2} alignItems="center">
            {/* Username/Password Login */}
            <Grid size={{ xs:12, md:6 }}>
              <Typography variant="h5" align="center" gutterBottom>
                Login
              </Typography>
              <form onSubmit={handleSubmit}>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <TextField
                  type="text"
                  value={username}
                  label="Username"
                  variant="outlined"
                  color="primary"
                  size="small"
                  fullWidth
                  margin="normal"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                /><br />
                <TextField
                  type="password"
                  value={password}
                  label="Password"
                  variant="outlined"
                  color="primary"
                  size="small"
                  fullWidth
                  margin="normal"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                /><br />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>Login</Button>
                <p>
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
              </form>
            </Grid>

            {/* Vertical Divider */}
            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: { xs: "none", md: "block" }, mx: 2 }}
            />

            {/* Social Logins */}
            <Grid size={{ xs:12, md:5 }} textAlign="center">
              <Typography variant="h6">Other ways to sign in</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;
