import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { queryKeys } from "../../../lib/query/query-keys";

export function useAuth() {
  const token = localStorage.getItem("accessToken");

  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: authApi.getMe,
    retry: false,
    enabled: Boolean(token),
  });
}
