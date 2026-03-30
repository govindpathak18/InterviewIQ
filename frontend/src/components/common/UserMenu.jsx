import { LogOut, Settings, UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authApi } from "../../features/auth/api/auth.api";
import { queryClient } from "../../lib/query/query-client";

export default function UserMenu({ user }) {
  const navigate = useNavigate();

  const initials =
    user?.fullName
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const handleLogout = async () => {
    try {
      await authApi.logout();
      localStorage.removeItem("accessToken");
      queryClient.clear();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      localStorage.removeItem("accessToken");
      queryClient.clear();
      navigate("/login");
    }
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 transition hover:bg-white/10">
        {user?.profilePhoto ? (
          <img
            src={user.profilePhoto}
            alt={user.fullName || "User"}
            className="h-10 w-10 rounded-xl border border-white/10 object-cover"
          />
        ) : (
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-300/30 via-white/10 to-lime-300/20 text-sm font-bold text-white">
            {initials}
          </div>
        )}

        <div className="hidden text-left sm:block">
          <p className="text-sm font-medium text-white">{user?.fullName || "User"}</p>
          <p className="text-xs text-white/45">{user?.email || "Workspace user"}</p>
        </div>
      </button>

      <div className="invisible absolute right-0 top-[calc(100%+10px)] z-40 w-60 translate-y-2 rounded-2xl border border-white/10 bg-black/80 p-2 opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <button
          onClick={() => navigate("/profile")}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          <UserCircle2 size={16} />
          Profile
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
        >
          <Settings size={16} />
          Settings
        </button>

        <div className="my-2 h-px bg-white/10" />

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-300 transition hover:bg-red-400/10"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}
