import { Link } from "react-router-dom";
import { motion } from 'framer-motion'
import { Sparkles, Target, Users, Zap, ChevronRight } from 'lucide-react'
import ThemeToggle from "../../../shared/components/ui/theme-toggle";
import { useTheme } from '../../../app/providers/theme.provider'

const FLOATING_PAGES = [
  { title: "Dashboard", tone: "violet", icon: Target },
  { title: "Resumes", tone: "cyan", icon: Users },
  { title: "Job Descriptions", tone: "amber", icon: Sparkles },
  { title: "AI Interview", tone: "violet", icon: Zap },
  { title: "ATS Resume", tone: "cyan", icon: Target },
  { title: "Interviews", tone: "amber", icon: Users },
  { title: "Profile", tone: "violet", icon: Sparkles },
  { title: "Admin Users", tone: "cyan", icon: Zap },
];

export default function LandingPage() {
  const { colors } = useTheme()

  return (
    <section className="landing-wrap" style={{ backgroundColor: colors.background }}>
      <div className="landing-floating-grid" aria-hidden="true">
        {FLOATING_PAGES.map((item, index) => (
          <motion.article
            className={`floating-page-card tone-${item.tone} card-3d`}
            style={{
              animationDelay: `${index * 0.35}s`,
              transform: `translateY(${(index % 3) * 6}px)`,
            }}
            key={`${item.title}-${index}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
          >
            <div className="floating-page-header">
              <item.icon className="w-6 h-6" style={{ color: colors.primary }} />
            </div>
            <div className="floating-page-line short" />
            <div className="floating-page-line" />
            <div className="floating-page-line" />
            <p style={{ color: colors.text }}>{item.title}</p>
          </motion.article>
        ))}
      </div>

      <div className="landing-overlay" />

      <motion.div
        className="landing-card panel glass-panel"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="row-between">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="eyebrow" style={{ color: colors.accent }}>InterviewIQ</p>
              <h1 style={{ color: colors.text }}>Welcome to Play</h1>
            </motion.div>
          </div>
          <ThemeToggle />
        </div>

        <motion.p
          className="muted"
          style={{ color: colors.secondary }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Practice smarter with AI-driven interview prep and ATS optimization.
        </motion.p>

        <motion.div
          className="mt-8 rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="AI meets professional interview planning"
            className="w-full h-80 object-cover"
          />
          <div className="p-4 bg-black/40">
            <p className="text-white text-sm">AI-powered interview planning with persona matching and skill gap analysis.</p>
          </div>
        </motion.div>

        <motion.div
          className="landing-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Link to="/login" className="cta-btn classic-btn">
            Launch AI Planner
          </Link>
          <Link to="/register" className="ghost-btn cta-ghost classic-btn">
            Create account
          </Link>
        </motion.div>

        <p className="muted center-text mt-16">Explore upcoming pages floating behind this card ✨</p>
      </div>
    </section>
  );
}
