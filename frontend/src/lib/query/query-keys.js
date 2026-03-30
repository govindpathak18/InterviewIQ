// src/lib/query/query-keys.js
export const queryKeys = {
  auth: {
    me: ["auth", "me"],
  },
  users: {
    all: ["users"],
    list: (params) => ["users", "list", params],
    detail: (id) => ["users", "detail", id],
  },
  resumes: {
    all: ["resumes"],
    mine: ["resumes", "mine"],
    detail: (id) => ["resumes", "detail", id],
  },
  jobDescriptions: {
    all: ["job-descriptions"],
    mine: ["job-descriptions", "mine"],
    detail: (id) => ["job-descriptions", "detail", id],
  },
  interviews: {
    all: ["interviews"],
    mine: ["interviews", "mine"],
    detail: (id) => ["interviews", "detail", id],
  },
  ai: {
    interviewPack: ["ai", "interview-pack"],
    atsResume: ["ai", "ats-resume"],
  },
};
