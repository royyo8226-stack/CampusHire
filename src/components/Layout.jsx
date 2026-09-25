// src/components/Layout.jsx
// Shared authenticated layout: Sidebar + Navbar + routed page content.
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      <Sidebar open={sidebarOpen} onNavigate={() => setSidebarOpen(false)} />
      <div className="layout-main">
        <Navbar onToggleSidebar={() => setSidebarOpen((o) => !o)} />
        <main className="page">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
