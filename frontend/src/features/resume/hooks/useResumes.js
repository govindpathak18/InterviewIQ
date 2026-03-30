// src/features/resume/hooks/useResumes.js
import { useQuery } from "@tanstack/react-query";
import { resumeApi } from "../api/resume.api";
import { queryKeys } from "../../../lib/query/query-keys";

export function useResumes() {
  return useQuery({
    queryKey: queryKeys.resumes.mine,
    queryFn: resumeApi.getMyResumes,
  });
}
