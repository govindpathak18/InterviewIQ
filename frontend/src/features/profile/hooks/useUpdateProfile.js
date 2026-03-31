import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "../api/profile.api";
import { queryKeys } from "../../../lib/query/query-keys";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: profileApi.updateMyProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
    },
  });
}
