export const mockInterviewResult = {
  matchScore: 82,
  questions: [
    {
      type: 'technical',
      difficulty: 'medium',
      question: 'How would you optimize React performance in a large dashboard app?',
    },
    {
      type: 'behavioral',
      difficulty: 'easy',
      question: 'Tell me about a time you handled conflicting priorities in a sprint.',
    },
    {
      type: 'system-design',
      difficulty: 'hard',
      question: 'Design a scalable interview scheduling platform.',
    },
  ],
  skillGap: {
    missingSkills: ['System design tradeoffs', 'Monitoring and observability'],
    weakAreas: ['Behavioral storytelling', 'Scalable caching strategies'],
    strengths: ['React architecture', 'Problem solving'],
  },
  preparationPlan: [
    { day: 1, focus: 'Technical depth', tasks: ['Review React rendering model', 'Practice hooks interview questions'] },
    { day: 2, focus: 'System design', tasks: ['Learn CAP theorem basics', 'Design API rate limiter'] },
    { day: 3, focus: 'Communication', tasks: ['Practice STAR format', 'Mock behavioral round'] },
  ],
};

export const mockInterviews = [
  { id: 'int-101', role: 'Frontend Engineer', score: 78, createdAt: '2026-03-28' },
  { id: 'int-102', role: 'Backend Engineer', score: 84, createdAt: '2026-04-02' },
  { id: 'int-103', role: 'Full Stack Engineer', score: 88, createdAt: '2026-04-06' },
];

export const mockResumeAnalysis = {
  atsScore: 74,
  suggestions: ['Add measurable impact to your project bullets', 'Include Kubernetes and CI/CD keywords'],
  improvements: ['Rewrite summary with job-aligned keywords', 'Add system design project highlights'],
  keywordCoverage: [
    { label: 'React', value: 92 },
    { label: 'TypeScript', value: 70 },
    { label: 'System Design', value: 48 },
    { label: 'Testing', value: 61 },
  ],
};
