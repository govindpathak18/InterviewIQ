// src/app/layouts/AuthLayout.jsx
import { Outlet } from "react-router-dom";
import BrandLogo from "../../components/common/BrandLogo";

export default function AuthLayout() {
  return (
    <div className="min-h-screen px-6 py-10 text-white lg:px-10">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="hidden lg:block">
          <BrandLogo />

          <div className="mt-10 max-w-xl">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
              Career Workspace
            </p>
            <h1 className="mt-5 text-6xl font-semibold leading-[0.95] tracking-tight">
              Modern tools for resumes, ATS scoring, and interview planning.
            </h1>
            <p className="mt-6 text-base leading-8 text-white/62">
              Move from job discovery to interview preparation in one focused and
              animated workspace built for speed, clarity, and confidence.
            </p>
          </div>

          <div className="mt-12 grid max-w-xl gap-4 sm:grid-cols-2">
            <div className="glass-panel rounded-[1.75rem] p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                ATS Resume
              </p>
              <h3 className="mt-3 text-3xl font-semibold">AI Drafts</h3>
              <p className="mt-2 text-sm leading-7 text-white/55">
                Create cleaner, better targeted resumes from your source profile.
              </p>
            </div>

            <div className="glass-panel rounded-[1.75rem] p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                Interview Prep
              </p>
              <h3 className="mt-3 text-3xl font-semibold">Skill Gaps</h3>
              <p className="mt-2 text-sm leading-7 text-white/55">
                Highlight missing areas, questions, and day-wise preparation plans.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
