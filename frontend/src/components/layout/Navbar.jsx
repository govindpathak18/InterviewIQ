import { motion, useScroll } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Logo } from './Logo';

export const Navbar = () => {
  const { scrollY } = useScroll();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();

  const navLinks = [
    { label: 'Home', to: '/' },
    ...(isAuthenticated ? [{ label: 'Dashboard', to: '/dashboard' }] : []),
    { label: 'Profile', to: '/profile' },
  ];

  return (
    <motion.header
      style={{
        boxShadow: scrollY.get() > 10 ? '0 10px 40px rgba(15, 23, 42, 0.5)' : 'none',
      }}
      className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-4 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm transition ${isActive ? 'text-cyan-300' : 'text-slate-300 hover:text-white'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="rounded-lg p-2 hover:bg-white/10">
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {isAuthenticated ? (
            <Button variant="secondary" onClick={logout}>Logout</Button>
          ) : (
            <>
              <Link to="/login"><Button variant="ghost">Login</Button></Link>
              <Link to="/register"><Button>Register</Button></Link>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
};
