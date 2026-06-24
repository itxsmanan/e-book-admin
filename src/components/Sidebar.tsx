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

const sidebarLogoUrdu = '\u06a9\u062a\u0627\u0628\u0648\u06ba \u06a9\u06cc \u062f\u0648\u0644\u062a';

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
    { path: '/events', name: 'Events', icon: <EventsIcon size={20} /> },
    { path: '/subscriptions', name: 'Subscriptions', icon: <SubscriptionIcon size={20} /> },
    { path: '/books', name: 'Books Catalog', icon: <BooksIcon size={20} /> },
    { path: '/inquiries', name: 'Inquiries', icon: <InquiriesIcon size={20} /> },
  ];

  return (
    <>
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
          <div className="admin-sidebar-brand-mark" aria-hidden="true">
            <svg viewBox="0 0 64 64" role="img">
              <circle cx="32" cy="32" r="30" />
              <path d="M40.8 14.2c-9.7 4.8-16 12.1-16.6 21.8-.4 7.2 4.7 11.7 12.5 11.7 4.8 0 8.9-1.2 12.6-3.4-3.6 6.1-10.1 10.1-18.6 10.1-11.3 0-19.2-7.1-18.6-17.9.6-11.5 9.1-20.6 22.5-25.2l6.2 2.9Z" />
              <path d="M39.1 15.7c2.3 5.3 2.4 10.1.1 14.4 5.2-2.1 8.6-6.1 10.1-12.2l-10.2-2.2Z" />
            </svg>
          </div>
          <div className="admin-sidebar-logo-urdu" lang="ur" dir="rtl">{sidebarLogoUrdu}</div>
          <div className="admin-sidebar-logo-subtitle">KITABON KI DOLAT</div>
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
