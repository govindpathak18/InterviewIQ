// src/features/interview/hooks/useInterviewPlans.js
import { useQuery } from "@tanstack/react-query";
import { interviewApi } from "../api/interview.api";
import { queryKeys } from "../../../lib/query/query-keys";

export function useInterviewPlans() {
  return useQuery({
    queryKey: queryKeys.interviews.mine,
    queryFn: interviewApi.getMyInterviews,
  });
}
