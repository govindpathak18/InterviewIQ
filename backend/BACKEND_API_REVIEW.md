# Backend API & Module Review (Frontend Handoff)

This review summarizes the current backend API surface and module behavior so frontend implementation can start immediately.

## 1) Platform Baseline

- **Health endpoint**: `GET /health`
- **API base prefix**: from `API_PREFIX` env (default in example is `/api/v1`)
- **Auth transport**:
  - Access token can be sent in `Authorization: Bearer <token>` **or** via `accessToken` cookie.
  - Login/refresh set both `accessToken` and `refreshToken` cookies.
- **Global response format (success)**:

```json
{
  "success": true,
  "message": "...",
  "data": {},
  "meta": {}
}
```

- **Global response format (error)**:

```json
{
  "success": false,
  "message": "...",
  "errors": ["..."],
  "stack": "(dev only)"
}
```

## 2) Route Map for Frontend

> Assume base URL is: `${SERVER_URL}${API_PREFIX}`. With `.env.example`, this is `http://localhost:5000/api/v1`.

### Auth (`/auth`)

- `POST /register` (public)
  - body: `{ fullName, email, password }`
- `POST /login` (public)
  - body: `{ email, password }`
  - returns user + access token and sets cookies
- `POST /refresh` (public)
  - body optional: `{ refreshToken }` (cookie-first)
- `POST /logout` (public-ish; no auth middleware)
  - consumes access/refresh from cookie/header/body if present
- `POST /forgot-password` (public)
  - body: `{ email }`
- `POST /reset-password` (public)
  - body: `{ token, password }`
- `POST /send-verification-email` (auth required)
  - body optional: `{ email? }` (current user context used if omitted)
- `POST /verify-email` (public)
  - body: `{ token }`
- `GET /me` (auth required)

### Users (`/users`)

- `GET /me` (auth required)
- `PATCH /me` (auth required)
  - profile fields, at least one required
- `PATCH /me/change-password` (auth required)
  - body: `{ currentPassword, newPassword }`
- `GET /` (admin only)
  - query: `role`, `isActive`, `search`, `page`, `limit`
- `GET /:id` (admin only)
- `PATCH /:id/role` (admin only)
  - body: `{ role: "user" | "admin" }`
- `PATCH /:id/status` (admin only)
  - body: `{ isActive: boolean }`

### Resume (`/resume`)

- `POST /` (auth required)
  - manual create with `originalText` (min 50 chars)
- `POST /upload` (auth required, multipart)
  - form-data: `resume` file + optional `title`
- `GET /my` (auth required)
- `GET /:id` (auth required)
- `PATCH /:id` (auth required)
- `DELETE /:id` (auth required, soft delete)

### Job Description (`/job-description`)

- `POST /` (auth required)
- `GET /my` (auth required)
- `GET /:id` (auth required)
- `PATCH /:id` (auth required)
- `DELETE /:id` (auth required, soft delete)

### AI (`/ai`)

- `POST /interview-pack` (auth required)
  - provide either `resumeId` or `resumeText`, and either `jobDescriptionId` or `jdText`
- `POST /ats-resume` (auth required)
  - same input rule as above
  - returns generated HTML in `data.html`
- `POST /ats-resume/pdf` (auth required)
  - same input rule
  - returns raw PDF download (`application/pdf`)

### Interview (`/interview`)

- `POST /generate` (auth required)
  - body: `{ resumeId, jobDescriptionId, selfDescription? }`
- `GET /my` (auth required)
- `GET /:id` (auth required)
- `PATCH /:id` (auth required)
  - body: `{ status?, notes? }`
- `DELETE /:id` (auth required, soft delete)

## 3) Module Review (What Frontend Should Assume)

- **Ownership controls are enforced server-side** for resumes, JDs, and interviews.
- **Delete endpoints are soft delete** (`isActive=false`), so removed records disappear from list endpoints but persist in DB.
- **AI generation paths** depend on either stored docs (`resumeId/jobDescriptionId`) or direct text payloads.
- **Pagination currently only exists in admin users list** (`/users`). Other lists return full collections.

## 4) Frontend Integration Guidance

1. Use a single API client with:
   - `withCredentials: true`
   - bearer fallback for access token during migration/debug.
2. Build auth guard around `GET /auth/me` and/or `GET /users/me`.
3. Normalize error handling to display `message` first and `errors[0]` when needed.
4. Treat ATS PDF endpoint as file response (blob download), not JSON.
5. For create flows, enforce minimum text lengths in UI to match zod constraints and reduce 400s.

## 5) API Gaps / Risks to Track Before Full Frontend Build

1. **No OpenAPI/Swagger spec yet**
   - Frontend contract is code-derived; consider generating formal spec next.
2. **Inconsistent auth ergonomics**
   - `/auth/logout` has no auth middleware but accepts optional token inputs.
3. **Potential token schema mismatch risk**
   - blacklist entries for access/refresh token upserts do not include `userId`, while token schema marks `userId` required.
4. **List endpoints without pagination** (`/resume/my`, `/job-description/my`, `/interview/my`)
   - could become expensive as user data grows.


---
