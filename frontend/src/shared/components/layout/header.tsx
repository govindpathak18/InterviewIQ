import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, User, LogOut } from 'lucide-react'
import { useTheme } from '../../../app/providers/theme.provider'
import { useAuth } from '../../../app/providers/auth.provider'

const Header = () => {
  const { colors } = useTheme()
  const { user, logout } = useAuth()
  const heroImg = 'https://images.unsplash.com/photo-1404749040-462e645c5f34?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80'

  return (
    <header className="relative">
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <img
          src={heroImg}
          alt="AI interview planning"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.25) contrast(1.1) saturate(1.15)' }}
        />
      </div>

      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 w-full z-50 backdrop-blur-md bg-black/40 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8" style={{ color: colors.accent }} />
              <span className="text-xl font-bold" style={{ color: colors.text }}>
                InterviewIQ
              </span>
            </Link>

            <nav className="hidden md:flex space-x-8">
              <Link to="/dashboard" className="hover:text-indigo-300 transition-colors" style={{ color: colors.text }}>
                Dashboard
              </Link>
              <Link to="/resumes" className="hover:text-indigo-300 transition-colors" style={{ color: colors.text }}>
                Resumes
              </Link>
              <Link to="/interviews" className="hover:text-indigo-300 transition-colors" style={{ color: colors.text }}>
                Interviews
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span style={{ color: colors.secondary }}>{user.name}</span>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-1 px-3 py-1 rounded-md hover:bg-white/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-1 px-4 py-2 rounded-md"
                  style={{ backgroundColor: colors.primary, color: colors.text }}
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </header>
  )
}

export default Header