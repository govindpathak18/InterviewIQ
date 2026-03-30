import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";

export function ProtectedRoute() {
  const location = useLocation();
  const token = localStorage.getItem("accessToken");
  const { data, isLoading, isError } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-items-center bg-zinc-950 text-white">
        <p className="text-sm tracking-wide text-white/60">Loading workspace...</p>
      </div>
    );
  }

  if (isError || !data?.data) {
    localStorage.removeItem("accessToken");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export function AdminRoute() {
  const location = useLocation();
  const token = localStorage.getItem("accessToken");
  const { data, isLoading, isError } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-items-center bg-zinc-950 text-white">
        <p className="text-sm tracking-wide text-white/60">Checking access...</p>
      </div>
    );
  }

  if (isError || !data?.data) {
    localStorage.removeItem("accessToken");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (data.data.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
