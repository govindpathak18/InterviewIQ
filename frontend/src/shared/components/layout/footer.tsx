import { motion } from 'framer-motion'
import { GitBranch, Bird, Mail } from 'lucide-react'
import { useTheme } from '../../../app/providers/theme.provider'

const Footer = () => {
  const { colors } = useTheme()

  return (
    <motion.footer
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="bg-black/20 backdrop-blur-md border-t border-white/10 mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full" style={{ backgroundColor: colors.accent }} />
              <span className="text-xl font-bold" style={{ color: colors.text }}>
                InterviewIQ
              </span>
            </div>
            <p style={{ color: colors.secondary }}>
              AI-powered interview preparation for the modern professional.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
              Product
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-indigo-400 transition-colors" style={{ color: colors.secondary }}>Features</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors" style={{ color: colors.secondary }}>Pricing</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors" style={{ color: colors.secondary }}>API</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
              Company
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-indigo-400 transition-colors" style={{ color: colors.secondary }}>About</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors" style={{ color: colors.secondary }}>Blog</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors" style={{ color: colors.secondary }}>Careers</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: colors.text }}>
              Connect
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-indigo-400 transition-colors">
                <GitBranch className="w-5 h-5" style={{ color: colors.secondary }} />
              </a>
              <a href="#" className="hover:text-indigo-400 transition-colors">
                <Bird className="w-5 h-5" style={{ color: colors.secondary }} />
              </a>
              <a href="#" className="hover:text-indigo-400 transition-colors">
                <Mail className="w-5 h-5" style={{ color: colors.secondary }} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p style={{ color: colors.secondary }}>
            © 2026 InterviewIQ. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer