// src/features/resume/hooks/useCreateResume.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resumeApi } from "../api/resume.api";
import { queryKeys } from "../../../lib/query/query-keys";

export function useCreateResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resumeApi.createResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.resumes.mine });
    },
  });
}
