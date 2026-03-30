import { ArrowRight, FileText, Sparkles, Target } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Resume Intelligence",
    description:
      "Upload or create resumes, refine them, and keep versions organized in one sleek workspace.",
    icon: FileText,
  },
  {
    title: "ATS Optimization",
    description:
      "Generate ATS-friendly resumes with AI and preview polished output before export.",
    icon: Target,
  },
  {
    title: "Interview Planning",
    description:
      "Match your resume with job descriptions, uncover skill gaps, and prepare smarter.",
    icon: Sparkles,
  },
];

export default function LandingPage() {
  return (
    <main className="relative overflow-hidden">
      <section className="px-6 pt-24 pb-16 sm:pt-28 lg:px-10 lg:pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-cyan-200">
                InterviewIQ Platform
              </p>

              <h1 className="mt-8 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-8xl">
                Build a resume that clears ATS and prepares you for the interview.
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
                A modern AI-powered career workspace that helps you shape resumes,
                align them with job descriptions, and generate interview plans that
                actually feel actionable.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:scale-[1.02]"
                >
                  Get Started
                  <ArrowRight size={16} className="text-black" />
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Sign In
                </Link>
              </div>

              <div className="mt-14 grid gap-4 sm:grid-cols-3">
                <div className="glass-panel rounded-3xl p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                    ATS
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold">92%</h3>
                  <p className="mt-2 text-sm text-white/55">
                    Target-ready resume score preview
                  </p>
                </div>

                <div className="glass-panel rounded-3xl p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                    Interview
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold">24</h3>
                  <p className="mt-2 text-sm text-white/55">
                    Personalized questions generated
                  </p>
                </div>

                <div className="glass-panel rounded-3xl p-5">
                  <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                    Skills
                  </p>
                  <h3 className="mt-3 text-3xl font-semibold">8</h3>
                  <p className="mt-2 text-sm text-white/55">
                    Gap areas highlighted for prep
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="glow-ring glass-panel rounded-[2rem] p-5">
                <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                        Interview Plan
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold">
                        Frontend Engineer
                      </h3>
                    </div>

                    <div className="rounded-2xl border border-lime-300/20 bg-lime-300/10 px-4 py-2 text-sm font-medium text-lime-200">
                      Match 88
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                        JD Section
                      </p>
                      <p className="mt-3 text-sm leading-7 text-white/65">
                        React, system design fundamentals, performance optimization,
                        TypeScript, collaboration, accessibility, and component architecture.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                          ATS Resume
                        </p>
                        <p className="mt-3 text-sm text-white/65">
                          AI-ready resume draft generated with optimized keyword density.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                          Skill Gap
                        </p>
                        <p className="mt-3 text-sm text-white/65">
                          Testing strategy, caching patterns, and accessibility audits.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                      <p className="text-xs uppercase tracking-[0.25em] text-cyan-100/70">
                        AI Summary
                      </p>
                      <p className="mt-3 text-sm leading-7 text-cyan-50/85">
                        Strong match for frontend product teams. Prioritize performance stories,
                        accessibility examples, and measurable UI impact before interviews.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-6 top-10 hidden w-52 rounded-3xl border border-white/10 bg-black/35 p-4 shadow-2xl backdrop-blur-xl xl:block">
                <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                  Actions
                </p>
                <button className="mt-4 w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black">
                  Generate ATS Resume
                </button>
                <button className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                  Open Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-18 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
              Core Capabilities
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              One workspace for resumes, job context, and interview preparation.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="glass-panel rounded-[2rem] p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.08]"
                >
                  <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/8 text-cyan-200">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/60">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
