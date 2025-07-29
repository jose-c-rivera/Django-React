import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Paper, Typography, TextField, Button, Divider, useMediaQuery, Alert } from '@mui/material';

function Login({ onLogin }) {
  const isDesktop = useMediaQuery('(min-width:900px)');
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
    <Grid container sx={{ minHeight: '100vh' }} justifyContent="center" alignItems="center">
      <Grid sx={{ width: { xs: '100%', sm: '66.6667%', md: '50%' } }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            width: '100%',
            boxSizing: 'border-box',
            mx: { xs: 2, sm: 0 },
          }}
        >
          <Grid container columns={12} spacing={2} alignItems="center">
            {/* Username/Password Login */}
            <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
              <Typography variant="h5" align="center" gutterBottom>
                Login
              </Typography>
              <form onSubmit={handleSubmit} aria-label="login form">
                {error && (
                  <Alert severity="error" sx={{ mb: 2 }} role="alert">
                    {error}
                  </Alert>
                )}
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
                  sx={{ mb: 2 }}
                />
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
                  sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 1, mb: 2 }}>Login</Button>
                <p>
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
              </form>
            </Grid>

            {/* Responsive Divider: vertical on desktop, horizontal on mobile/tablet */}
            <Divider
              orientation={isDesktop ? "vertical" : "horizontal"}
              flexItem={isDesktop ? true : undefined}
              sx={
                isDesktop
                  ? { display: { xs: "none", md: "block" }, mx: 2 }
                  : { display: { xs: "block", md: "none" }, my: 2, width: '100%' }
              }
            />

            {/* Social Logins */}
            <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 5' }, textAlign: 'center' }}>
              <Typography variant="h6">Other ways to sign in</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );

}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
