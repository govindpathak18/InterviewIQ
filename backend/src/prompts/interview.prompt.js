const buildInterviewPrompt = ({ resumeText, jdText, selfDescription = "" }) => {
  return `You are an interview preparation assistant.

Use the resume and job description to produce strict JSON with this shape:
{
  "questions": [{"type":"technical|behavioral|hr","difficulty":"easy|medium|hard","question":"string"}],
  "matchScore": number,
  "skillGap": {"missingSkills": ["string"], "weakAreas": ["string"], "strengths": ["string"]},
  "preparationPlan": [{"day": number, "focus": "string", "tasks": ["string"]}],
  "summary": "string"
}

Rules:
- questions must include technical + behavioral coverage.
- matchScore must be between 0 and 100.
- preparationPlan should be day-wise and actionable.
- Treat SELF DESCRIPTION as session-specific context for this job and prioritize it while generating questions/plan.
- Return ONLY valid JSON, no markdown.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jdText}

SELF DESCRIPTION:
${selfDescription}`;
};

module.exports = {
  buildInterviewPrompt,
};
