import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  Bell,
  ChevronRight,
  PanelLeft,
  Search,
  Sparkles,
} from "lucide-react";
import BrandLogo from "../../components/common/BrandLogo";
import { navItems } from "../../lib/constants/nav-items";
import { useAuth } from "../../features/auth/hooks/useAuth";
import UserMenu from "../../components/common/UserMenu";

function NavItem({ item }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        [
          "group relative flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300",
          isActive
            ? "bg-white/12 text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
            : "text-white/65 hover:bg-white/8 hover:text-white",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          <div className="flex items-center gap-3">
            <div
              className={[
                "grid h-10 w-10 place-items-center rounded-xl border transition-all duration-300",
                isActive
                  ? "border-cyan-300/30 bg-cyan-300/12 text-cyan-200"
                  : "border-white/10 bg-white/5 text-white/70 group-hover:border-white/20",
              ].join(" ")}
            >
              <Icon size={18} />
            </div>

            <span className="text-sm font-medium tracking-wide">{item.label}</span>
          </div>

          <ChevronRight
            size={16}
            className={isActive ? "text-cyan-200" : "text-white/25 group-hover:text-white/50"}
          />
        </>
      )}
    </NavLink>
  );
}

function getPageTitle(pathname) {
  if (pathname.startsWith("/dashboard")) return "Dashboard";
  if (pathname.startsWith("/resumes")) return "Resumes";
  if (pathname.startsWith("/interview-plan")) return "Interview Plan";
  if (pathname.startsWith("/profile")) return "Profile";
  if (pathname.startsWith("/admin/users")) return "Admin Users";
  return "Workspace";
}

export default function AppShell() {
  const { data } = useAuth();
  const location = useLocation();
  const user = data?.data;
  const pageTitle = getPageTitle(location.pathname);

  return (
    <div className="app-grid min-h-screen text-white">
      <div className="flex min-h-screen">
        <aside className="glass-panel glow-ring hidden w-80 flex-col border-r border-white/10 p-5 md:flex">
          <BrandLogo />

          <div className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-2">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/45">
              <Search size={16} />
              <span>Search workspace</span>
            </div>
          </div>

          <nav className="mt-8 flex flex-1 flex-col gap-2">
            {navItems.map((item) => (
              <NavItem key={item.to} item={item} />
            ))}
          </nav>

          <div className="glass-panel mt-6 rounded-3xl p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/6 text-cyan-200">
                <Sparkles size={18} />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                  AI Workspace
                </p>
                <h3 className="mt-1 text-lg font-semibold">Interview readiness</h3>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-white/60">
              Generate ATS-friendly resumes, analyze skill gaps, and build interview plans.
            </p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-black/20 backdrop-blur-xl">
            <div className="flex h-20 items-center justify-between px-4 sm:px-6">
              <div className="flex items-center gap-3">
                <button className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 md:hidden">
                  <PanelLeft size={18} />
                </button>

                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                    Workspace
                  </p>
                  <h2 className="text-lg font-semibold tracking-tight text-white">
                    {pageTitle}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/45 lg:flex">
                  <Search size={16} />
                  <span>Search resumes, plans, users...</span>
                </div>

                <button className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10">
                  <Bell size={18} />
                </button>

                <UserMenu user={user} />
              </div>
            </div>
          </header>

          <main className="px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
