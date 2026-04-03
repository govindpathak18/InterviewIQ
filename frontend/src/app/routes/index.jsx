import { Link, Navigate, useRoutes } from "react-router-dom";
import ProtectedRoute from "./protected.route";
import LoginPage from "../../features/auth/pages/login.page";
import RegisterPage from "../../features/auth/pages/register.page";
import ResumesPage from "../../features/resumes/pages/resumes.page";
import ResumeDetailsPage from "../../features/resumes/pages/resume-details.page";

function DashboardPage() {
  return (
    <section className="page-wrap">
      <div className="panel">
        <h1>InterviewIQ Dashboard</h1>
        <p>Feature 1 complete: auth pages + protected route shell.</p>
        <p>Feature 2 started: resumes module with create/list/edit flows.</p>

        <nav className="quick-links">
          <Link to="/resumes">Go to resumes</Link>
        </nav>
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
    {
      path: "/resumes",
      element: (
        <ProtectedRoute>
          <ResumesPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/resumes/:id",
      element: (
        <ProtectedRoute>
          <ResumeDetailsPage />
        </ProtectedRoute>
      ),
    },
    { path: "*", element: <Navigate to="/login" replace /> },
  ]);
}
