// src/features/admin/pages/AdminUsersPage.jsx
import { Search, Shield, SlidersHorizontal, UserRoundCheck, UserRoundX } from "lucide-react";

const users = [
  {
    name: "Govind Pathak",
    email: "govind655@gmail.com",
    role: "admin",
    status: "active",
    location: "India",
  },
  {
    name: "Aarav Sharma",
    email: "aarav@example.com",
    role: "user",
    status: "active",
    location: "Delhi",
  },
  {
    name: "Riya Verma",
    email: "riya@example.com",
    role: "user",
    status: "inactive",
    location: "Mumbai",
  },
  {
    name: "Kunal Singh",
    email: "kunal@example.com",
    role: "user",
    status: "active",
    location: "Bengaluru",
  },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <section className="glass-panel glow-ring rounded-[2rem] p-6 sm:p-8">
        <div className="grid gap-8 xl:grid-cols-[1fr_0.95fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
              Admin Workspace
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Manage users, account roles, and platform access from one control surface.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-white/62 sm:text-base">
              View user records, filter by role and status, and manage account state with a
              cleaner administrative workflow.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                Total Users
              </p>
              <h3 className="mt-4 text-5xl font-semibold text-white">24</h3>
            </div>

            <div className="rounded-[1.5rem] border border-lime-300/20 bg-lime-300/10 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-lime-100/70">
                Active
              </p>
              <h3 className="mt-4 text-5xl font-semibold text-white">21</h3>
            </div>

            <div className="rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/70">
                Admins
              </p>
              <h3 className="mt-4 text-5xl font-semibold text-white">02</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <article className="glass-panel rounded-[2rem] p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                User Directory
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Platform users</h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white/45">
                <Search size={16} />
                <span>Search users</span>
              </div>

              <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10">
                <SlidersHorizontal size={16} />
                Filters
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {users.map((user) => {
              const isActive = user.status === "active";
              const isAdmin = user.role === "admin";

              return (
                <div
                  key={user.email}
                  className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5 transition hover:bg-white/8"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-300/20 via-white/10 to-lime-300/15 text-sm font-semibold text-white">
                        {user.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-white">{user.name}</h3>
                        <p className="mt-1 text-sm text-white/50">{user.email}</p>
                        <p className="mt-2 text-sm text-white/55">{user.location}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          isAdmin
                            ? "border border-cyan-300/20 bg-cyan-300/10 text-cyan-100"
                            : "border border-white/10 bg-white/8 text-white/75"
                        }`}
                      >
                        {user.role}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          isActive
                            ? "border border-lime-300/20 bg-lime-300/10 text-lime-100"
                            : "border border-orange-300/20 bg-orange-300/10 text-orange-100"
                        }`}
                      >
                        {user.status}
                      </span>

                      <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10">
                        Open
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <aside className="glass-panel rounded-[2rem] p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/6 text-cyan-200">
              <Shield size={20} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                User Action Panel
              </p>
              <h2 className="mt-1 text-2xl font-semibold">Selected user</h2>
            </div>
          </div>

          <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-black/25 p-5">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-cyan-300/20 via-white/10 to-lime-300/15 text-lg font-semibold text-white">
                GP
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white">Govind Pathak</h3>
                <p className="mt-1 text-sm text-white/50">govind655@gmail.com</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                  Role
                </p>
                <p className="mt-2 text-sm text-cyan-100">admin</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                  Status
                </p>
                <p className="mt-2 text-sm text-lime-100">active</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 transition hover:bg-white/10">
                <UserRoundCheck size={16} />
                Promote / Update Role
              </button>

              <button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-orange-300/15 bg-orange-300/10 px-4 py-3 text-sm text-orange-100 transition hover:bg-orange-300/15">
                <UserRoundX size={16} />
                Deactivate Account
              </button>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
