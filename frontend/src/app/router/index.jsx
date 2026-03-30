import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import AppShell from "../layouts/AppShell";
import AuthLayout from "../layouts/AuthLayout";
import { ProtectedRoute, AdminRoute } from "./protected-routes";
import LandingPage from "../../pages/LandingPage";
import NotFoundPage from "../../pages/NotFoundPage";
import LoginPage from "../../features/auth/pages/LoginPage";
import RegisterPage from "../../features/auth/pages/RegisterPage";
import ForgotPasswordPage from "../../features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "../../features/auth/pages/ResetPasswordPage";
import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import ResumePage from "../../features/resume/pages/ResumePage";
import InterviewPlanPage from "../../features/interview/pages/InterviewPlanPage";
import ProfilePage from "../../features/profile/pages/ProfilePage";
import AdminUsersPage from "../../features/admin/pages/AdminUsersPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <AppShell />,
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "resumes",
            element: <ResumePage />,
          },
          {
            path: "interview-plan",
            element: <InterviewPlanPage />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
  {
    element: <AdminRoute />,
    children: [
      {
        path: "/",
        element: <AppShell />,
        children: [
          {
            path: "admin/users",
            element: <AdminUsersPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
