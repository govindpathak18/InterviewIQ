// src/App.jsx
import { Toaster } from "sonner";
import { AppRouterProvider } from "./app/providers/RouterProvider";
import { AppQueryProvider } from "./app/providers/QueryProvider";

export default function App() {
  return (
    <AppQueryProvider>
      <AppRouterProvider />
      <Toaster
        position="top-right"
        richColors
        theme="dark"
        toastOptions={{
          style: {
            background: "rgba(12, 12, 14, 0.88)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#f4f4f5",
            backdropFilter: "blur(18px)",
          },
        }}
      />
    </AppQueryProvider>
  );
}
