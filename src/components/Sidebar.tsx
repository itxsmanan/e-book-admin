import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AuthContext';
import {
  DashboardIcon,
  UsersIcon,
  EventsIcon,
  SubscriptionIcon,
  BooksIcon,
  InquiriesIcon,
  LogOutIcon
} from './Icons';

interface SidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, setIsMobileOpen }) => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <DashboardIcon size={20} /> },
    { path: '/users', name: 'Users List', icon: <UsersIcon size={20} /> },
    { path: '/events', name: 'Events CRUD', icon: <EventsIcon size={20} /> },
    { path: '/subscriptions', name: 'Subscriptions', icon: <SubscriptionIcon size={20} /> },
    { path: '/books', name: 'Books Catalog', icon: <BooksIcon size={20} /> },
    { path: '/inquiries', name: 'Inquiries', icon: <InquiriesIcon size={20} /> },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(10, 14, 39, 0.6)',
            zIndex: 99,
            backdropFilter: 'blur(4px)'
          }}
          onClick={closeMobileSidebar}
        />
      )}

      <aside className={`admin-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="admin-sidebar-logo">
          <div className="admin-sidebar-logo-urdu">کتابوں کی دولت</div>
          <div className="admin-sidebar-logo-eng">Admin Panel</div>
        </div>

        <ul className="admin-sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.path} className="admin-sidebar-menu-item" onClick={closeMobileSidebar}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="admin-sidebar-footer">
          <button className="admin-sidebar-logout-btn" onClick={handleLogout}>
            <LogOutIcon size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
