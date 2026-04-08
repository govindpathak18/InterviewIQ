# Backend API Guide

This README is a frontend-oriented summary of the backend routes, what each module does, and the request/response shapes you will usually work with.

## Base URL

- Health check: `/health`
- API base prefix from `.env.example`: `/api/v1`
- Local example base URL: `http://localhost:5000/api/v1`

If the backend `.env` changes, the API prefix can change too. For frontend work, treat the base URL as an env value.

## Auth and Session Behavior

- Most routes are protected and require authentication.
- The backend accepts auth in either of these forms:
  - `accessToken` cookie
  - `Authorization: Bearer <token>` header
- `POST /auth/login` and `POST /auth/refresh` both:
  - set `accessToken` and `refreshToken` cookies
  - return `data.accessToken` in JSON
- For browser-based frontend apps, use `credentials: "include"` in fetch/axios requests.

Example fetch setup:

```js
fetch(`${API_BASE}/auth/me`, {
  method: "GET",
  credentials: "include",
});
```

## Common Response Shape

Most successful JSON responses follow:

```json
{
  "success": true,
  "message": "Human readable message",
  "data": {},
  "meta": null
}
```

Most error responses follow:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [],
  "stack": "only in development"
}
```

## Common Status Codes

- `200` success
- `201` created/generated
- `400` bad request or validation error
- `401` not authenticated / invalid token
- `403` authenticated but not allowed
- `404` not found
- `409` duplicate resource, usually email conflict
- `429` rate limited

## Rate Limits That Matter for Frontend

- Auth routes like login/register/forgot-password are rate limited.
- AI routes are rate limited.
- Resume upload is rate limited.
- In development mode, these limits are skipped.
- On limit hit, expect `429` with a helpful message.

## Quick Module Map

- `auth`: register, login, logout, token refresh, password reset, email verification
- `users`: current user profile and admin user management
- `resume`: manual resume entry and resume file upload
- `job-description`: save job descriptions linked to a user, optionally linked to a resume
- `ai`: generate interview packs and ATS resume output
- `interview`: persist generated interview packs and user notes/status

---

## 1. Health

| Method | Route | Auth | Purpose |
| --- | --- | --- | --- |
| `GET` | `/health` | No | Simple backend health check |

Response data:

```json
{
  "success": true,
  "message": "Server is healthy"
}
```

---

## 2. Auth Routes

Base path: `/api/v1/auth`

| Method | Route | Auth | Purpose |
| --- | --- | --- | --- |
| `POST` | `/register` | No | Create a new user account |
| `POST` | `/login` | No | Login and start session |
| `POST` | `/refresh` | No | Rotate access token using refresh token |
| `POST` | `/logout` | No | Clear current session and blacklist tokens |
| `GET` | `/me` | Yes | Get current logged-in user |
| `POST` | `/forgot-password` | No | Send reset-password email |
| `POST` | `/reset-password` | No | Reset password using reset token |
| `POST` | `/send-verification-email` | Yes | Send email verification link |
| `POST` | `/verify-email` | No | Verify email using token |

### `POST /auth/register`

Body:

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

Returns:

- created user object without password

### `POST /auth/login`

Body:

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

Returns:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {},
    "accessToken": "jwt-token"
  },
  "meta": null
}
```

Notes:

- also sets `accessToken` and `refreshToken` cookies
- frontend should usually store user state, not the refresh token

### `POST /auth/refresh`

Body:

```json
{
  "refreshToken": "optional-if-cookie-exists"
}
```

Notes:

- works with refresh token cookie or request body
- returns fresh `accessToken`
- also rotates refresh cookie

### `POST /auth/logout`

Optional body:

```json
{
  "refreshToken": "optional-if-cookie-exists"
}
```

Notes:

- clears auth cookies
- safe to call during logout flow even if frontend only uses cookies

### `GET /auth/me`

Returns current authenticated user.

Useful on:

- app boot
- page refresh
- protected route hydration

### `POST /auth/forgot-password`

Body:

```json
{
  "email": "john@example.com"
}
```

Frontend note:

- always show a generic success UI
- backend intentionally does not reveal whether the email exists

### `POST /auth/reset-password`

Body:

```json
{
  "token": "token-from-email-link",
  "password": "new-password"
}
```

### `POST /auth/send-verification-email`

Body:

```json
{
  "email": "optional@example.com"
}
```

Usually the authenticated user's email is enough.

### `POST /auth/verify-email`

Body:

```json
{
  "token": "token-from-email-link"
}
```

---

## 3. User Routes

Base path: `/api/v1/users`

### Current user routes

| Method | Route | Auth | Purpose |
| --- | --- | --- | --- |
| `GET` | `/me` | Yes | Get current user's profile |
| `PATCH` | `/me` | Yes | Update current user's profile |
| `PATCH` | `/me/change-password` | Yes | Change current user's password |

### Admin routes

| Method | Route | Auth | Purpose |
| --- | --- | --- | --- |
| `GET` | `/` | Admin | List all users with filters |
| `GET` | `/:id` | Admin | Get one user |
| `PATCH` | `/:id/role` | Admin | Change user role |
| `PATCH` | `/:id/status` | Admin | Activate/deactivate user |

### `PATCH /users/me`

Any subset of:

```json
{
  "fullName": "John Doe",
  "headline": "Frontend Developer",
  "skills": ["React", "Node.js"],
  "profilePhoto": "https://example.com/photo.jpg",
  "bio": "Short bio",
  "phone": "9999999999",
  "location": "Bangalore",
  "linkedinUrl": "https://linkedin.com/in/example",
  "githubUrl": "https://github.com/example",
  "websiteUrl": "https://example.com"
}
```

### `PATCH /users/me/change-password`

Body:

```json
{
  "currentPassword": "old-password",
  "newPassword": "new-password"
}
```

### `GET /users`

Query params:

- `role=user|admin`
- `isActive=true|false`
- `search=<text>`
- `page=1`
- `limit=10`

Returns:

- `data`: array of users
- `meta`: pagination object

---

## 4. Resume Routes

Base path: `/api/v1/resume`

| Method | Route | Auth | Purpose |
| --- | --- | --- | --- |
| `POST` | `/` | Yes | Create a resume manually from text |
| `POST` | `/upload` | Yes | Upload a PDF/DOC/DOCX and extract text |
| `GET` | `/my` | Yes | List current user's resumes |
| `GET` | `/:id` | Yes | Get one resume |
| `PATCH` | `/:id` | Yes | Update one resume |
| `DELETE` | `/:id` | Yes | Soft delete one resume |

### `POST /resume`

Body:

```json
{
  "title": "My Resume",
  "originalText": "Full resume text with at least 500 characters",
  "parsedData": {}
}
```

### `POST /resume/upload`

Content type:

- `multipart/form-data`

Fields:

- file field name: `resume`
- optional text field: `title`

Accepted file types:

- PDF
- DOC
- DOCX

### `GET /resume/my`

Query params:

- `page=1`
- `limit=10`

Returns:

- `data`: array of resume objects

Resume object includes fields like:

- `_id`
- `userId`
- `title`
- `originalText`
- `parsedData`
- `source`
- `fileName`
- `mimeType`
- `isActive`
- `createdAt`
- `updatedAt`

---

## 5. Job Description Routes

Base path: `/api/v1/job-description`

| Method | Route | Auth | Purpose |
| --- | --- | --- | --- |
| `POST` | `/` | Yes | Create a job description |
| `GET` | `/my` | Yes | List current user's job descriptions |
| `GET` | `/:id` | Yes | Get one job description |
| `PATCH` | `/:id` | Yes | Update one job description |
| `DELETE` | `/:id` | Yes | Soft delete one job description |

### `POST /job-description`

Body:

```json
{
  "roleTitle": "Frontend Developer",
  "companyName": "Acme",
  "jobPostUrl": "https://example.com/job",
  "jdText": "Full job description text",
  "experienceLevel": "mid",
  "employmentType": "full-time",
  "location": "Remote",
  "resumeId": "optional-linked-resume-id"
}
```

Enums:

- `experienceLevel`: `intern | junior | mid | senior | lead | not_specified`
- `employmentType`: `full-time | part-time | contract | internship | not_specified`

Job description object includes fields like:

- `_id`
- `userId`
- `resumeId`
- `roleTitle`
- `companyName`
- `jobPostUrl`
- `jdText`
- `extractedSkills`
- `experienceLevel`
- `employmentType`
- `location`
- `isActive`

---

## 6. AI Routes

Base path: `/api/v1/ai`

These routes help frontend generate content without manually saving an interview record first.

| Method | Route | Auth | Purpose |
| --- | --- | --- | --- |
| `POST` | `/interview-pack` | Yes | Generate interview questions, score, skill gaps, and preparation plan |
| `POST` | `/ats-resume` | Yes | Generate ATS-friendly HTML resume |
| `POST` | `/ats-resume/pdf` | Yes | Generate ATS-friendly resume as PDF download |

### Input pattern used by AI routes

The AI routes accept either:

- saved document IDs
- raw text directly from the frontend

Example body:

```json
{
  "resumeId": "optional-resume-id",
  "jobDescriptionId": "optional-job-description-id",
  "resumeText": "optional-raw-resume-text",
  "jdText": "optional-raw-job-description-text",
  "selfDescription": "optional-short-summary-about-user"
}
```

Rules:

- provide either `resumeId` or `resumeText`
- provide either `jobDescriptionId` or `jdText`
- `selfDescription` is only used by `/ai/interview-pack`

### `POST /ai/interview-pack`

Returns:

```json
{
  "success": true,
  "message": "Interview pack generated successfully",
  "data": {
    "questions": [],
    "matchScore": 78,
    "skillGap": {
      "missingSkills": [],
      "weakAreas": [],
      "strengths": []
    },
    "preparationPlan": [],
    "summary": "Summary text",
    "aiMeta": {
      "model": "gemini-model",
      "usageMetadata": {}
    }
  },
  "meta": null
}
```

### `POST /ai/ats-resume`

Returns:

```json
{
  "success": true,
  "message": "ATS resume generated successfully",
  "data": {
    "html": "<html>...</html>",
    "aiMeta": {
      "model": "gemini-model",
      "usageMetadata": {}
    }
  },
  "meta": null
}
```

Use this when the frontend wants to preview rendered HTML before download.

### `POST /ai/ats-resume/pdf`

Returns:

- content type: `application/pdf`
- download filename: `ats-resume.pdf`

Use this route when the frontend wants direct download instead of HTML preview.

---

## 7. Interview Routes

Base path: `/api/v1/interview`

These routes are for saved interview records in the database.

| Method | Route | Auth | Purpose |
| --- | --- | --- | --- |
| `POST` | `/generate` | Yes | Generate and save an interview record |
| `GET` | `/my` | Yes | List current user's interview records |
| `GET` | `/:id` | Yes | Get one interview record |
| `PATCH` | `/:id` | Yes | Update interview status or notes |
| `DELETE` | `/:id` | Yes | Soft delete interview |

### `POST /interview/generate`

Body:

```json
{
  "resumeId": "required",
  "jobDescriptionId": "required",
  "selfDescription": "optional"
}
```

Returns a saved interview document that includes:

- `_id`
- `userId`
- `resumeId`
- `jobDescriptionId`
- `selfDescription`
- `summary`
- `matchScore`
- `questions`
- `skillGap`
- `preparationPlan`
- `aiMeta`
- `status`
- `notes`
- `isActive`
- `createdAt`
- `updatedAt`

### `GET /interview/my`

Query params:

- `page=1`
- `limit=20`

Returns:

- `data`: array of interviews
- `meta`: pagination object

### `PATCH /interview/:id`

Body:

```json
{
  "status": "in-progress",
  "notes": "My practice notes"
}
```

Allowed `status` values:

- `generated`
- `in-progress`
- `completed`

---

## 8. Suggested Frontend Flow

### Auth flow

1. Register or login.
2. Store user data in app state.
3. On app refresh, call `GET /auth/me`.
4. If session expires, call `POST /auth/refresh`.
5. On logout, call `POST /auth/logout` and clear frontend user state.

### Resume + job description flow

1. User uploads or manually creates a resume.
2. User saves a job description.
3. Frontend can:
   - call `/ai/interview-pack` for temporary preview data
   - call `/interview/generate` to save a reusable interview record
   - call `/ai/ats-resume` for HTML preview
   - call `/ai/ats-resume/pdf` for file download

### Admin flow

1. Admin fetches paginated user list from `GET /users`.
2. Admin can update role via `PATCH /users/:id/role`.
3. Admin can activate/deactivate via `PATCH /users/:id/status`.

---

## 9. Frontend Integration Notes

- Use `credentials: "include"` for protected routes if you rely on cookies.
- For `multipart/form-data`, do not manually set `Content-Type`; let the browser set it.
- Soft-deleted records are hidden from normal list endpoints.
- Validation errors usually come back as `400` with a readable `message`.
- If you need strict frontend typing, the most useful models to define first are:
  - `User`
  - `Resume`
  - `JobDescription`
  - `Interview`
  - `ApiResponse<T>`

## 10. Minimal TypeScript Shapes for Frontend

```ts
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  meta: null | {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
};

export type User = {
  _id: string;
  fullName: string;
  email: string;
  role: "user" | "admin";
  isEmailVerified: boolean;
  headline: string;
  skills: string[];
  profilePhoto: string;
  bio: string;
  phone: string;
  location: string;
  linkedinUrl: string;
  githubUrl: string;
  websiteUrl: string;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Resume = {
  _id: string;
  userId: string;
  title: string;
  originalText: string;
  parsedData: Record<string, unknown>;
  source: "manual" | "upload";
  fileName: string;
  mimeType: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type JobDescription = {
  _id: string;
  userId: string;
  resumeId: string | null;
  roleTitle: string;
  companyName: string;
  jobPostUrl: string;
  jdText: string;
  extractedSkills: string[];
  experienceLevel:
    | "intern"
    | "junior"
    | "mid"
    | "senior"
    | "lead"
    | "not_specified";
  employmentType:
    | "full-time"
    | "part-time"
    | "contract"
    | "internship"
    | "not_specified";
  location: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type InterviewQuestion = {
  type: "technical" | "behavioral" | "hr" | "system-design" | "other";
  difficulty: "easy" | "medium" | "hard";
  question: string;
};

export type Interview = {
  _id: string;
  userId: string;
  resumeId: string;
  jobDescriptionId: string;
  selfDescription: string;
  summary: string;
  matchScore: number;
  questions: InterviewQuestion[];
  skillGap: {
    missingSkills: string[];
    weakAreas: string[];
    strengths: string[];
  };
  preparationPlan: Array<{
    day: number;
    focus: string;
    tasks: string[];
  }>;
  aiMeta: {
    model: string;
    usageMetadata: Record<string, unknown> | null;
  };
  status: "generated" | "in-progress" | "completed";
  notes: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
```

---

## Frontend (React + Tailwind + Framer Motion)

A full InterviewIQ frontend is available in `./frontend`.

### Run locally

```bash
cd frontend
npm install
npm run dev
```

### Production build

```bash
npm run build
npm run preview
```
