// src/features/profile/hooks/useProfile.js
import { useQuery } from "@tanstack/react-query";
import { profileApi } from "../api/profile.api";
import { queryKeys } from "../../../lib/query/query-keys";

export function useProfile() {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: profileApi.getMyProfile,
  });
}
