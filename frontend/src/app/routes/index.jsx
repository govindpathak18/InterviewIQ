import { Navigate, useRoutes } from "react-router-dom";
import ProtectedRoute from "./protected.route";
import LoginPage from "../../features/auth/pages/login.page";
import RegisterPage from "../../features/auth/pages/register.page";

function DashboardPage() {
  return (
    <section className="page-wrap">
      <div className="panel">
        <h1>InterviewIQ Dashboard</h1>
        <p>Feature 1 complete: auth pages + protected route shell.</p>
      </div>
    </section>
  );
}

export default function AppRoutes() {
  return useRoutes([
    { path: "/", element: <Navigate to="/login" replace /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      ),
    },
    { path: "*", element: <Navigate to="/login" replace /> },
  ]);
}
