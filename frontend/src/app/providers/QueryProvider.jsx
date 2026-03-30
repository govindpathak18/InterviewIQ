// src/app/providers/QueryProvider.jsx
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../lib/query/query-client";

export function AppQueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
