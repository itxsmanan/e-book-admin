import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AuthContext';
import logoImg from '../assets/logo-2-transparent.png';
import {
  DashboardIcon,
  UsersIcon,
  EventsIcon,
  SubscriptionIcon,
  BooksIcon,
  HeadphonesIcon,
  InquiriesIcon,
  DollarIcon,
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
    { path: '/events', name: 'Events', icon: <EventsIcon size={20} /> },
    { path: '/subscriptions', name: 'Subscriptions', icon: <SubscriptionIcon size={20} /> },
    { path: '/books', name: 'Books Catalog', icon: <BooksIcon size={20} /> },
    { path: '/audiobooks', name: 'Audio Books', icon: <HeadphonesIcon size={20} /> },
    { path: '/inquiries', name: 'Inquiries', icon: <InquiriesIcon size={20} /> },
    { path: '/payments', name: 'Payments', icon: <DollarIcon size={20} /> },
  ];

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-midnight/60 z-[99] backdrop-blur-sm md:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      <aside className={`bg-slate border-r border-text-main/5 flex flex-col h-screen sticky top-0 z-[100] transition-all duration-300 md:w-[260px] md:flex-none ${isMobileOpen ? 'fixed inset-y-0 left-0 w-[260px] translate-x-0' : 'max-md:-translate-x-full max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:w-[260px]'}`}>
        <div className="py-5 px-4 pb-[1.2rem] border-b border-text-main/5 text-center flex items-center justify-center min-h-[150px] relative after:content-[''] after:absolute after:left-5 after:right-5 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-gold/30 after:to-transparent">
          <img src={logoImg} alt="Kitabon Ki Dolat Logo" className="w-[180px] h-auto object-contain max-h-[120px]" />
        </div>

        <ul className="list-none py-6 px-4 flex flex-col gap-[0.4rem] flex-grow overflow-y-auto">
          {menuItems.map((item) => (
            <li key={item.path} onClick={closeMobileSidebar}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `flex items-center gap-4 w-full py-[0.85rem] px-4 border-l-[3px] rounded-lg text-[0.95rem] text-left cursor-pointer no-underline transition-all duration-200 hover:bg-text-main/10 hover:text-text-main ${isActive ? 'bg-gold/10 text-gold-bright font-semibold border-gold rounded-l-none' : 'bg-transparent border-transparent text-text-dim font-medium'}`}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="p-4 border-t border-text-main/5">
          <button className="flex items-center gap-4 w-full py-[0.8rem] px-4 bg-transparent border border-accent/20 rounded-lg text-accent-light text-[0.9rem] font-semibold cursor-pointer transition-all duration-300 hover:bg-accent/10 hover:text-text-main hover:border-accent" onClick={handleLogout}>
            <LogOutIcon size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
