import { Search, Shield, SlidersHorizontal, UserRoundCheck, UserRoundX } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useUsers } from "../hooks/useUsers";
import { adminApi } from "../api/admin.api";

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");

  const queryParams = useMemo(() => {
    const params = {};

    if (search.trim()) params.search = search.trim();
    if (role) params.role = role;
    if (status) params.isActive = status === "active" ? "true" : "false";

    return params;
  }, [search, role, status]);

  const { data, isLoading, refetch } = useUsers(queryParams);

  const users = data?.data || [];
  const meta = data?.meta || {};

  const totalUsers = meta.total || users.length;
  const totalAdmins = users.filter((user) => user.role === "admin").length;
  const totalActive = users.filter((user) => user.isActive).length;

  const [selectedUser, setSelectedUser] = useState(null);
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleToggleStatus = async () => {
    if (!selectedUser) return;

    try {
      setIsUpdatingStatus(true);

      await adminApi.updateUserStatus({
        id: selectedUser._id,
        isActive: !selectedUser.isActive,
      });

      toast.success("User status updated");
      setSelectedUser((current) =>
        current ? { ...current, isActive: !current.isActive } : current
      );
      refetch();
    } catch (error) {
      const message =
        error?.response?.data?.message || "Unable to update user status";
      toast.error(message);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleToggleRole = async () => {
    if (!selectedUser) return;

    const nextRole = selectedUser.role === "admin" ? "user" : "admin";

    try {
      setIsUpdatingRole(true);

      await adminApi.updateUserRole({
        id: selectedUser._id,
        role: nextRole,
      });

      toast.success("User role updated");
      setSelectedUser((current) =>
        current ? { ...current, role: nextRole } : current
      );
      refetch();
    } catch (error) {
      const message =
        error?.response?.data?.message || "Unable to update user role";
      toast.error(message);
    } finally {
      setIsUpdatingRole(false);
    }
  };

  if (isLoading) {
    return (
      <div className="grid min-h-[50vh] place-items-center">
        <p className="text-sm tracking-wide text-white/60">Loading users...</p>
      </div>
    );
  }

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
              View user records, filter by role and status, and manage account state
              with a cleaner administrative workflow.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                Total Users
              </p>
              <h3 className="mt-4 text-5xl font-semibold text-white">{totalUsers}</h3>
            </div>

            <div className="rounded-[1.5rem] border border-lime-300/20 bg-lime-300/10 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-lime-100/70">
                Active
              </p>
              <h3 className="mt-4 text-5xl font-semibold text-white">{totalActive}</h3>
            </div>

            <div className="rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/70">
                Admins
              </p>
              <h3 className="mt-4 text-5xl font-semibold text-white">{totalAdmins}</h3>
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
                <input
                  type="text"
                  placeholder="Search users"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent text-white outline-none placeholder:text-white/35"
                />
              </div>

              <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10">
                <SlidersHorizontal size={16} />
                Filters
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none"
            >
              <option value="" className="bg-zinc-900">
                All Roles
              </option>
              <option value="user" className="bg-zinc-900">
                User
              </option>
              <option value="admin" className="bg-zinc-900">
                Admin
              </option>
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white outline-none"
            >
              <option value="" className="bg-zinc-900">
                All Status
              </option>
              <option value="active" className="bg-zinc-900">
                Active
              </option>
              <option value="inactive" className="bg-zinc-900">
                Inactive
              </option>
            </select>
          </div>

          <div className="mt-6 space-y-4">
            {users.length ? (
              users.map((user) => {
                const isActive = user.isActive;
                const isAdmin = user.role === "admin";

                return (
                  <button
                    key={user._id}
                    type="button"
                    onClick={() => handleSelectUser(user)}
                    className="w-full rounded-[1.5rem] border border-white/10 bg-white/6 p-5 text-left transition hover:bg-white/8"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-start gap-4">
                        {user.profilePhoto ? (
                          <img
                            src={user.profilePhoto}
                            alt={user.fullName}
                            className="h-14 w-14 rounded-2xl border border-white/10 object-cover"
                          />
                        ) : (
                          <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-300/20 via-white/10 to-lime-300/15 text-sm font-semibold text-white">
                            {user.fullName
                              ?.split(" ")
                              .map((part) => part[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>
                        )}

                        <div>
                          <h3 className="text-lg font-medium text-white">{user.fullName}</h3>
                          <p className="mt-1 text-sm text-white/50">{user.email}</p>
                          <p className="mt-2 text-sm text-white/55">
                            {user.location || "No location added"}
                          </p>
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
                          {isActive ? "active" : "inactive"}
                        </span>

                        <span className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75">
                          Open
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="rounded-[1.5rem] border border-white/10 bg-white/6 p-4 text-sm text-white/60">
                No users found for the selected filters.
              </div>
            )}
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

          {selectedUser ? (
            <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-black/25 p-5">
              <div className="flex items-center gap-4">
                {selectedUser.profilePhoto ? (
                  <img
                    src={selectedUser.profilePhoto}
                    alt={selectedUser.fullName}
                    className="h-16 w-16 rounded-[1.5rem] border border-white/10 object-cover"
                  />
                ) : (
                  <div className="grid h-16 w-16 place-items-center rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-cyan-300/20 via-white/10 to-lime-300/15 text-lg font-semibold text-white">
                    {selectedUser.fullName
                      ?.split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {selectedUser.fullName}
                  </h3>
                  <p className="mt-1 text-sm text-white/50">{selectedUser.email}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                    Role
                  </p>
                  <p className="mt-2 text-sm capitalize text-cyan-100">
                    {selectedUser.role}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                    Status
                  </p>
                  <p className="mt-2 text-sm text-lime-100">
                    {selectedUser.isActive ? "active" : "inactive"}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/6 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-white/40">
                  Location
                </p>
                <p className="mt-2 text-sm text-white/75">
                  {selectedUser.location || "No location added"}
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={handleToggleRole}
                  disabled={isUpdatingRole}
                  className="btn-3d btn-3d-dark inline-flex w-full items-center justify-center gap-2 px-4 py-3 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <UserRoundCheck size={16} />
                  {isUpdatingRole
                    ? "Updating Role..."
                    : selectedUser.role === "admin"
                    ? "Change To User"
                    : "Promote To Admin"}
                </button>

                <button
                  onClick={handleToggleStatus}
                  disabled={isUpdatingStatus}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-orange-300/15 bg-orange-300/10 px-4 py-3 text-sm text-orange-100 transition hover:bg-orange-300/15 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <UserRoundX size={16} />
                  {isUpdatingStatus
                    ? "Updating Status..."
                    : selectedUser.isActive
                    ? "Deactivate Account"
                    : "Activate Account"}
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-black/25 p-5 text-sm leading-7 text-white/60">
              Select a user from the left panel to inspect role, status, and account details.
            </div>
          )}
        </aside>
      </section>
    </div>
  );
}
