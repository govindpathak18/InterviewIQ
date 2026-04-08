import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  PlusCircle,
  History,
  FileSearch,
  User,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/interview', label: 'Create Interview', icon: PlusCircle },
  { to: '/past-interviews', label: 'Past Interviews', icon: History },
  { to: '/resume-analyzer', label: 'Resume Analyzer', icon: FileSearch },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export const Sidebar = ({ collapsed, setCollapsed }) => (
  <motion.aside animate={{ width: collapsed ? 84 : 250 }} className="glass sticky top-20 h-[calc(100vh-6rem)] rounded-2xl p-3">
    <button
      onClick={() => setCollapsed((prev) => !prev)}
      className="mb-3 flex w-full items-center justify-end rounded-lg p-2 hover:bg-white/10"
    >
      {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
    </button>
    <div className="space-y-1">
      {links.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${isActive ? 'bg-cyan-400/20 text-cyan-300' : 'text-slate-300 hover:bg-white/10'}`
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {!collapsed ? <span>{item.label}</span> : null}
          </NavLink>
        );
      })}
    </div>
  </motion.aside>
);
