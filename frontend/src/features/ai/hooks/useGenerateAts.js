// src/features/ai/hooks/useGenerateAts.js
import { useMutation } from "@tanstack/react-query";
import { aiApi } from "../api/ai.api";

export function useGenerateAts() {
  return useMutation({
    mutationFn: aiApi.generateAtsResume,
  });
}
