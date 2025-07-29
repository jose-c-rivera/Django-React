// MainLayout.js
import React from 'react';
import ResponsiveNavBar from '../components/ResponsiveNavBar';
import { Outlet, Navigate } from 'react-router-dom';

export default function MainLayout({ user, setUser }) {
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <ResponsiveNavBar onLogout={() => setUser(null)} />
      {/* The Outlet renders the matched child route */}
      <main style={{ padding: 20 }}>
        <Outlet />
      </main>
    </>
  );
}
