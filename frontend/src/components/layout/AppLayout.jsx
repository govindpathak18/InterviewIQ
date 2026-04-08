import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Sidebar } from '../dashboard/Sidebar';
import { useAuth } from '../../context/AuthContext';

const dashboardRoutes = ['/dashboard', '/interview', '/past-interviews', '/resume-analyzer', '/profile', '/settings'];

export const AppLayout = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const showSidebar = isAuthenticated && dashboardRoutes.some((route) => location.pathname.startsWith(route));

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 bg-aurora text-slate-100">
      <Navbar />
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-4 px-4 py-6">
        {showSidebar ? <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} /> : null}
        <div className="min-w-0 flex-1">
          <AnimatePresence mode="wait">
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
};
