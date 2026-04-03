import { Navigate, useRoutes } from "react-router-dom";

const Login = () => <div className="p-6">Login</div>;
const Dashboard = () => <div className="p-6">Dashboard</div>;

export default function AppRoutes() {
  return useRoutes([
    { path: "/", element: <Navigate to="/dashboard" replace /> },
    { path: "/login", element: <Login /> },
    { path: "/dashboard", element: <Dashboard /> },
  ]);
}