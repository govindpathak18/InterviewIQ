// src/features/ai/hooks/useGenerateInterviewPack.js
import { useMutation } from "@tanstack/react-query";
import { aiApi } from "../api/ai.api";

export function useGenerateInterviewPack() {
  return useMutation({
    mutationFn: aiApi.generateInterviewPack,
  });
}
