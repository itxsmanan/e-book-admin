import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';

export const AdminDashboardLayout: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar isMobileOpen={isMobileSidebarOpen} setIsMobileOpen={setIsMobileSidebarOpen} />

      {/* Main View Area */}
      <div className="flex flex-col h-screen min-w-0 w-full overflow-hidden">
        <Header setIsMobileOpen={setIsMobileSidebarOpen} />
        
        <main className="admin-main-scroll w-full flex-grow overflow-y-auto overflow-x-hidden p-4 sm:p-5 lg:p-8">
          {/* Renders the child routes (e.g. DashboardTab, UsersTab) dynamically */}
          <div className="mx-auto w-full max-w-[1400px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
