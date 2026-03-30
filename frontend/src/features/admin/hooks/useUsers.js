// src/features/admin/hooks/useUsers.js
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../api/admin.api";
import { queryKeys } from "../../../lib/query/query-keys";

export function useUsers(params) {
  return useQuery({
    queryKey: queryKeys.users.list(params),
    queryFn: () => adminApi.getUsers(params),
  });
}
