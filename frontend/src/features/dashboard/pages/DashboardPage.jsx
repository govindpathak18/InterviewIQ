import { ArrowRight, FileText, Sparkles, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useResumes } from "../../resume/hooks/useResumes";
import { useInterviewPlans } from "../../interview/hooks/useInterviewPlans";

export default function DashboardPage() {
  const { data: resumesResponse, isLoading: isLoadingResumes } = useResumes();
  const { data: interviewsResponse, isLoading: isLoadingInterviews } = useInterviewPlans();

  const resumes = resumesResponse?.data || [];
  const interviews = interviewsResponse?.data || [];

  const averageMatchScore = interviews.length
    ? Math.round(
        interviews.reduce((total, item) => total + (item.matchScore || 0), 0) /
          interviews.length
      )
    : 0;

  const recentResumes = resumes.slice(0, 3);
  const recentPlans = interviews.slice(0, 3);

  const isLoading = isLoadingResumes || isLoadingInterviews;

  if (isLoading) {
    return (
      <div className="grid min-h-[50vh] place-items-center">
        <p className="text-sm tracking-wide text-white/60">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="glass-panel glow-ring overflow-hidden rounded-[2rem] p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/75">
              Dashboard Overview
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Turn your profile into a targeted interview strategy.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-white/62 sm:text-base">
              Track resume quality, view recent ATS-ready drafts, and jump back into
              interview plans with a more focused, high-signal workflow.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/resumes"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.01]"
              >
                Open Resumes
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/interview-plan"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10"
              >
                Open Interview Plan
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[1.75rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-100/70">
                Focus Today
              </p>
              <h3 className="mt-3 text-xl font-semibold text-white">
                Strengthen ATS match with more targeted job context
              </h3>
              <p className="mt-3 text-sm leading-7 text-cyan-50/75">
                Select a strong resume, add a full job description, and generate an interview plan.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                Quick Signal
              </p>
              <div className="mt-4 flex items-end gap-3">
                <span className="text-5xl font-semibold text-white">
                  {averageMatchScore || "--"}
                </span>
                <span className="mb-1 rounded-full border border-lime-300/20 bg-lime-300/10 px-2.5 py-1 text-xs font-medium text-lime-200">
                  Match Score
                </span>
              </div>
              <p className="mt-3 text-sm text-white/58">
                Average match quality across your generated interview plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-4">
        <article className="glass-panel rounded-[1.75rem] bg-gradient-to-br from-cyan-300/25 to-cyan-500/5 p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.25em] text-white/42">
              Active Resumes
            </p>
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/6 text-white/80">
              <FileText size={18} />
            </div>
          </div>
          <h3 className="mt-6 text-4xl font-semibold tracking-tight text-white">
            {resumes.length}
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/58">
            Resume drafts ready for ATS optimization and interview planning.
          </p>
        </article>

        <article className="glass-panel rounded-[1.75rem] bg-gradient-to-br from-lime-300/25 to-lime-500/5 p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.25em] text-white/42">
              Interview Plans
            </p>
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/6 text-white/80">
              <Sparkles size={18} />
            </div>
          </div>
          <h3 className="mt-6 text-4xl font-semibold tracking-tight text-white">
            {interviews.length}
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/58">
            Generated plans with questions, skill gaps, and timelines.
          </p>
        </article>

        <article className="glass-panel rounded-[1.75rem] bg-gradient-to-br from-orange-300/25 to-orange-500/5 p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.25em] text-white/42">
              ATS Readiness
            </p>
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/6 text-white/80">
              <Target size={18} />
            </div>
          </div>
          <h3 className="mt-6 text-4xl font-semibold tracking-tight text-white">
            {resumes.length ? "Ready" : "--"}
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/58">
            You can generate ATS-friendly resumes from the interview workspace.
          </p>
        </article>

        <article className="glass-panel rounded-[1.75rem] bg-gradient-to-br from-fuchsia-300/20 to-fuchsia-500/5 p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.25em] text-white/42">
              Profile Growth
            </p>
            <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/6 text-white/80">
              <TrendingUp size={18} />
            </div>
          </div>
          <h3 className="mt-6 text-4xl font-semibold tracking-tight text-white">
            {averageMatchScore ? `${averageMatchScore}%` : "--"}
          </h3>
          <p className="mt-3 text-sm leading-7 text-white/58">
            Match quality snapshot based on your current interview planning activity.
          </p>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-panel rounded-[2rem] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                Recent Resumes
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Resume snapshots</h2>
            </div>

            <Link to="/resumes" className="text-sm text-cyan-200 hover:text-cyan-100">
              View all
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {recentResumes.length ? (
              recentResumes.map((resume) => (
                <div
                  key={resume._id}
                  className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4 transition hover:bg-white/8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        {resume.title || "Untitled Resume"}
                      </h3>
                      <p className="mt-1 text-sm text-white/50">
                        Updated {new Date(resume.updatedAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-sm font-medium text-cyan-100">
                      {resume.source === "upload" ? "Upload" : "Manual"}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4 text-sm text-white/60">
                No resumes available yet.
              </div>
            )}
          </div>
        </div>

        <div className="glass-panel rounded-[2rem] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                Interview Plans
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Recent preparation flows</h2>
            </div>

            <Link
              to="/interview-plan"
              className="text-sm text-cyan-200 hover:text-cyan-100"
            >
              Open workspace
            </Link>
          </div>

          <div className="mt-6 grid gap-4">
            {recentPlans.length ? (
              recentPlans.map((plan) => (
                <div
                  key={plan._id}
                  className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5 transition hover:bg-white/8"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-xl font-medium text-white">
                        Interview Plan
                      </h3>
                      <p className="mt-1 text-sm text-white/50">
                        Created {new Date(plan.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="rounded-full border border-lime-300/20 bg-lime-300/10 px-3 py-1 text-sm font-medium text-lime-200">
                        Match {plan.matchScore || 0}
                      </div>

                      <Link
                        to="/interview-plan"
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 hover:bg-white/10"
                      >
                        Open
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4 text-sm text-white/60">
                No interview plans generated yet.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
