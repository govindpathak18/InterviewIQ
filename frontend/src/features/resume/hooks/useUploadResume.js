// src/features/resume/hooks/useUploadResume.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resumeApi } from "../api/resume.api";
import { queryKeys } from "../../../lib/query/query-keys";

export function useUploadResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resumeApi.uploadResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.resumes.mine });
    },
  });
}
