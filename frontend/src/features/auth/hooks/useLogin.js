import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { queryKeys } from "../../../lib/query/query-keys";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await authApi.login(payload);
      const accessToken = response?.data?.accessToken;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }

      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
    },
  });
}
