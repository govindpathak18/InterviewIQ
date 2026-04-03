import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../core/hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isBootstrapping } = useAuth();
  const location = useLocation();

  if (isBootstrapping) return <div className="p-6 text-white">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />;

  return children;
}