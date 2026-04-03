import { Link } from "react-router-dom";
import ThemeToggle from "../../../shared/components/ui/theme-toggle";

const FLOATING_PAGES = [
  { title: "Dashboard", tone: "violet" },
  { title: "Resumes", tone: "cyan" },
  { title: "Job Descriptions", tone: "amber" },
  { title: "AI Interview", tone: "violet" },
  { title: "ATS Resume", tone: "cyan" },
  { title: "Interviews", tone: "amber" },
  { title: "Profile", tone: "violet" },
  { title: "Admin Users", tone: "cyan" },
];

export default function LandingPage() {
  return (
    <section className="landing-wrap">
      <div className="landing-floating-grid" aria-hidden="true">
        {FLOATING_PAGES.map((item, index) => (
          <article
            className={`floating-page-card tone-${item.tone}`}
            style={{
              animationDelay: `${index * 0.35}s`,
              transform: `translateY(${(index % 3) * 6}px)`,
            }}
            key={`${item.title}-${index}`}
          >
            <div className="floating-page-header" />
            <div className="floating-page-line short" />
            <div className="floating-page-line" />
            <div className="floating-page-line" />
            <p>{item.title}</p>
          </article>
        ))}
      </div>

      <div className="landing-overlay" />

      <div className="landing-card panel glass-panel">
        <div className="row-between">
          <div>
            <p className="eyebrow">InterviewIQ</p>
            <h1>Welcome to Play</h1>
          </div>
          <ThemeToggle />
        </div>

        <p className="muted">Practice smarter with AI-driven interview prep and ATS optimization.</p>

        <div className="landing-actions">
          <Link to="/login" className="cta-btn">
            Sign in
          </Link>
          <Link to="/register" className="ghost-btn cta-ghost">
            Create account
          </Link>
        </div>

        <p className="muted center-text mt-16">Explore upcoming pages floating behind this card ✨</p>
      </div>
    </section>
  );
}
