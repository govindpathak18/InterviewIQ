// src/lib/constants/nav-items.js
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  UserCircle2,
  Shield,
} from "lucide-react";

export const navItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Resumes",
    to: "/resumes",
    icon: FileText,
  },
  {
    label: "Interview Plan",
    to: "/interview-plan",
    icon: Sparkles,
  },
  {
    label: "Profile",
    to: "/profile",
    icon: UserCircle2,
  },
  {
    label: "Admin Users",
    to: "/admin/users",
    icon: Shield,
  },
];
