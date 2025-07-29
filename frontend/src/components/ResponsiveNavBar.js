import React, { useState } from 'react';
import { navItems } from './navConfig';
import {
  AppBar, Toolbar, IconButton, Typography,
  Drawer, List, ListItem, ListItemText, Button,
  useMediaQuery, Box, Menu, MenuItem, Avatar
} from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';


function DesktopNav({ navItems }) {
  return navItems
    .filter(item => item.label !== 'Logout' && item.label !== 'Profile')
    .map((item) => (
      <Button
        color="inherit"
        component={Link}
        to={item.path}
        key={item.label}
        sx={{ ml: 2, fontWeight: 'bold' }}
      >
        {item.label}
      </Button>
    ));
}

function ProfileMenu({ anchorEl, menuOpen, handleProfileMenuClose, handleLogout }) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={menuOpen}
      onClose={handleProfileMenuClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          bgcolor: '#333',
          color: '#fff',
          minWidth: 160,
        },
      }}
    >
      <MenuItem
        component={Link}
        to="/profile"
        onClick={handleProfileMenuClose}
        sx={{ fontWeight: 'bold', color: '#fff' }}
      >
        Profile
      </MenuItem>
      <Box sx={{ my: 0.5 }}><hr style={{ border: 0, borderTop: '1px solid #555', margin: 0 }} /></Box>
      <MenuItem
        onClick={() => { handleLogout(); handleProfileMenuClose(); }}
        sx={{ fontWeight: 'bold', color: '#fff' }}
      >
        Logout
      </MenuItem>
    </Menu>
  );
}

function MobileDrawer({ navItems, drawerOpen, toggleDrawer, handleLogout }) {
  return (
    <Drawer
      variant="temporary"
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          bgcolor: '#333',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {navItems.map((item, idx) => (
            <React.Fragment key={item.label}>
              <ListItem disablePadding>
                {item.label === 'Logout' ? (
                  <ListItemButton onClick={() => { handleLogout(); toggleDrawer(false)(); }}>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ sx: { color: '#fff', fontWeight: 'bold' } }}
                    />
                  </ListItemButton>
                ) : (
                  <ListItemButton component={Link} to={item.path} onClick={toggleDrawer(false)}>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{ sx: { color: '#fff', fontWeight: 'bold' } }}
                    />
                  </ListItemButton>
                )}
              </ListItem>
              {idx < navItems.length - 1 && (
                <Box sx={{ my: 0.5 }}><hr style={{ border: 0, borderTop: '1px solid #555', margin: 0 }} /></Box>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

function ResponsiveNavBar({ onLogout }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);
  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const handleLogout = async () => {
    await fetch("/auth/logout/", {
      method: "POST",
      credentials: "include",
    });
    onLogout();
  };

  return (
    <>
      <AppBar position="static" sx={{ zIndex: theme.zIndex.drawer + 1, bgcolor: '#222' }}>
        <Toolbar>
          {/* Hamburger menu left of MyApp on mobile */}
          {!isDesktop && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleDrawer(true)}
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {/* MyApp always leftmost */}
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mr: 2 }}>
            MyApp
          </Typography>
          {/* Desktop nav links */}
          {isDesktop && <DesktopNav navItems={navItems} />}
          {/* Spacer */}
          <Box sx={{ flexGrow: 1 }} />
          {/* Profile icon and dropdown on desktop */}
          {isDesktop && (
            <>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                onClick={handleProfileMenuOpen}
                sx={{ ml: 2 }}
              >
                <AccountCircle sx={{ fontSize: 36 }} />
              </IconButton>
              <ProfileMenu
                anchorEl={anchorEl}
                menuOpen={menuOpen}
                handleProfileMenuClose={handleProfileMenuClose}
                handleLogout={handleLogout}
              />
            </>
          )}
        </Toolbar>
      </AppBar>

      {!isDesktop && (
        <MobileDrawer
          navItems={navItems}
          drawerOpen={drawerOpen}
          toggleDrawer={toggleDrawer}
          handleLogout={handleLogout}
        />
      )}
    </>
  );
}

export default ResponsiveNavBar;
