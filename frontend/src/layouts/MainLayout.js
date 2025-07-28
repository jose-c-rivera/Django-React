// MainLayout.js
import React from 'react';
import ResponsiveNavBar from '../components/ResponsiveNavBar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <ResponsiveNavBar />
      {/* The Outlet renders the matched child route */}
      <main style={{ marginLeft: 240, padding: 20 }}>
        <Outlet />
      </main>
    </>
  );
}
