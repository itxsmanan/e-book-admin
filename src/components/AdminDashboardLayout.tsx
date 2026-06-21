import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';

export const AdminDashboardLayout: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="admin-dashboard-layout">
      {/* Sidebar Navigation */}
      <Sidebar isMobileOpen={isMobileSidebarOpen} setIsMobileOpen={setIsMobileSidebarOpen} />

      {/* Main View Area */}
      <div className="admin-main-wrapper">
        <Header setIsMobileOpen={setIsMobileSidebarOpen} />
        
        <main className="admin-main-content">
          {/* Renders the child routes (e.g. DashboardTab, UsersTab) dynamically */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
