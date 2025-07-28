import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ResponsiveNavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Left side: App title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Game Garden
        </Typography>

        {/* Right side: Nav buttons */}
        <Button color="inherit" component={Link} to="/home">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/profile">
          Profile
        </Button>
      </Toolbar>
    </AppBar>
  );
}
