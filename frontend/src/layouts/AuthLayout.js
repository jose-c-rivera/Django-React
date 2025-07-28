// AuthLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div>
      {/* No nav bar here */}
      <Outlet />
    </div>
  );
}
