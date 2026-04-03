import { Toaster } from "sonner";
import AppRoutes from "./routes";

export default function App() {
  return (
    <div className="neo-app min-h-screen text-brand-text bg-brand-bg">
      <AppRoutes />
      <Toaster richColors position="top-right" />
    </div>
  );
}