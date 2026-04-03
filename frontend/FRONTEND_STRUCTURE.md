# Frontend Folder Structure (InterviewIQ)

Use a **feature-first** React structure so UI, state, and API calls for each domain stay together.

## Recommended Tree

```text
frontend/
├─ public/
│  ├─ favicon.ico
│  └─ index.html
├─ src/
│  ├─ app/
│  │  ├─ App.tsx
│  │  ├─ main.tsx
│  │  ├─ routes/
│  │  │  ├─ index.tsx
│  │  │  ├─ protected.route.tsx
│  │  │  └─ admin.route.tsx
│  │  └─ providers/
│  │     ├─ query.provider.tsx
│  │     ├─ auth.provider.tsx
│  │     └─ theme.provider.tsx
│  │
│  ├─ core/
│  │  ├─ api/
│  │  │  ├─ client.ts
│  │  │  ├─ endpoints.ts
│  │  │  └─ error.ts
│  │  ├─ config/
│  │  │  ├─ env.ts
│  │  │  └─ constants.ts
│  │  ├─ hooks/
│  │  │  ├─ useAuth.ts
│  │  │  ├─ useDebounce.ts
│  │  │  └─ useToast.ts
│  │  ├─ types/
│  │  │  ├─ api.types.ts
│  │  │  └─ common.types.ts
│  │  └─ utils/
│  │     ├─ format.ts
│  │     ├─ validators.ts
│  │     └─ download.ts
│  │
│  ├─ features/
│  │  ├─ auth/
│  │  │  ├─ api/
│  │  │  │  └─ auth.api.ts
│  │  │  ├─ components/
│  │  │  │  ├─ login-form.tsx
│  │  │  │  ├─ register-form.tsx
│  │  │  │  └─ forgot-password-form.tsx
│  │  │  ├─ pages/
│  │  │  │  ├─ login.page.tsx
│  │  │  │  ├─ register.page.tsx
│  │  │  │  ├─ reset-password.page.tsx
│  │  │  │  └─ verify-email.page.tsx
│  │  │  ├─ store/
│  │  │  │  └─ auth.store.ts
│  │  │  ├─ schemas/
│  │  │  │  └─ auth.schema.ts
│  │  │  └─ types/
│  │  │     └─ auth.types.ts
│  │  │
│  │  ├─ profile/
│  │  │  ├─ api/profile.api.ts
│  │  │  ├─ components/
│  │  │  ├─ pages/profile.page.tsx
│  │  │  ├─ schemas/profile.schema.ts
│  │  │  └─ types/profile.types.ts
│  │  │
│  │  ├─ resumes/
│  │  │  ├─ api/resume.api.ts
│  │  │  ├─ components/
│  │  │  │  ├─ resume-upload.tsx
│  │  │  │  ├─ resume-editor.tsx
│  │  │  │  └─ resume-list.tsx
│  │  │  ├─ pages/
│  │  │  │  ├─ resumes.page.tsx
│  │  │  │  └─ resume-details.page.tsx
│  │  │  ├─ schemas/resume.schema.ts
│  │  │  └─ types/resume.types.ts
│  │  │
│  │  ├─ job-descriptions/
│  │  │  ├─ api/job-description.api.ts
│  │  │  ├─ components/
│  │  │  ├─ pages/
│  │  │  │  ├─ job-descriptions.page.tsx
│  │  │  │  └─ job-description-details.page.tsx
│  │  │  ├─ schemas/job-description.schema.ts
│  │  │  └─ types/job-description.types.ts
│  │  │
│  │  ├─ ai/
│  │  │  ├─ api/ai.api.ts
│  │  │  ├─ components/
│  │  │  │  ├─ ats-generator-form.tsx
│  │  │  │  ├─ interview-pack-form.tsx
│  │  │  │  └─ ats-preview.tsx
│  │  │  ├─ pages/
│  │  │  │  ├─ ats-resume.page.tsx
│  │  │  │  └─ interview-generator.page.tsx
│  │  │  ├─ schemas/ai.schema.ts
│  │  │  └─ types/ai.types.ts
│  │  │
│  │  ├─ interviews/
│  │  │  ├─ api/interview.api.ts
│  │  │  ├─ components/
│  │  │  │  ├─ interview-list.tsx
│  │  │  │  ├─ interview-card.tsx
│  │  │  │  └─ interview-notes.tsx
│  │  │  ├─ pages/
│  │  │  │  ├─ interviews.page.tsx
│  │  │  │  └─ interview-details.page.tsx
│  │  │  ├─ schemas/interview.schema.ts
│  │  │  └─ types/interview.types.ts
│  │  │
│  │  └─ admin-users/
│  │     ├─ api/admin-users.api.ts
│  │     ├─ components/
│  │     ├─ pages/admin-users.page.tsx
│  │     ├─ schemas/admin-users.schema.ts
│  │     └─ types/admin-users.types.ts
│  │
│  ├─ shared/
│  │  ├─ components/
│  │  │  ├─ ui/
│  │  │  ├─ layout/
│  │  │  └─ feedback/
│  │  ├─ styles/
│  │  │  ├─ globals.css
│  │  │  └─ tokens.css
│  │  └─ assets/
│  │     ├─ images/
│  │     └─ icons/
│  │
│  └─ tests/
│     ├─ unit/
│     ├─ integration/
│     └─ e2e/
│
├─ .env.example
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
└─ README.md
```

## Why this structure works

1. **Feature ownership is clear**: each backend module maps to one frontend feature folder.
2. **API calls are colocated** with the feature that uses them.
3. **Shared code is isolated** in `core/` and `shared/` to avoid duplication.
4. **Scales cleanly** when adding new modules/endpoints.

## Route suggestion

- Public routes:
  - `/login`, `/register`, `/forgot-password`, `/reset-password`, `/verify-email`
- Protected routes:
  - `/dashboard`, `/profile`, `/resumes`, `/job-descriptions`, `/ai/ats-resume`, `/ai/interview-pack`, `/interviews`
- Admin routes:
  - `/admin/users`

## Naming conventions

- Components: `kebab-case.tsx` (e.g., `resume-upload.tsx`)
- Pages: `*.page.tsx`
- API files: `*.api.ts`
- Validation schemas: `*.schema.ts`
- Feature types: `*.types.ts`

## Implementation starter order

1. `core/api/client.ts` with `withCredentials: true`
2. `features/auth` (login/register/me/refresh/logout)
3. Protected routing + layout
4. `features/resumes` and `features/job-descriptions`
5. `features/ai` and `features/interviews`
6. Admin users module

## What to build first (Frontend Sprint 1)

1. **Project bootstrap + theme tokens**
   - configure router, query client, auth provider, toast provider.
   - apply a single visual theme (Neo Aurora) before page work starts.
2. **Auth journey**
   - pages: login, register, forgot/reset password, verify email.
   - API integration: login/register/me/refresh/logout.
3. **Protected shell**
   - app layout (sidebar/topbar), route guards, loading skeletons.
4. **Core CRUD modules**
   - resumes + job descriptions list/create/edit/delete.
5. **AI and interview flow**
   - interview pack generation + ATS resume generation + interview list/details.

## Active theme: Neo Aurora

Use this as default design language for all pages:

- **Background**: `#0B1020`
- **Surface**: `#111827`
- **Primary**: `#7C3AED` (violet)
- **Secondary**: `#06B6D4` (cyan)
- **Accent**: `#F59E0B` (gold-amber)
- **Text**: `#E5E7EB`
- **Muted text**: `#94A3B8`

### Motion style guide

- Page enter: fade + `y: 12px` (220-280ms).
- Card hover: subtle scale (`1.01`) + soft glow.
- Hero image: gentle float loop (5-7s).
- Stagger list items for dashboards and interview cards.

### JS naming note

If you are using JavaScript (not TypeScript), keep the same structure and replace:

- `.ts` -> `.js`
- `.tsx` -> `.jsx`

## Files to change for Neo Aurora theme

If you are ready to apply Neo Aurora in the frontend codebase, start with these files:

1. `src/shared/styles/tokens.css`
   - define color tokens:
     - background `#0B1020`
     - surface `#111827`
     - primary violet `#7C3AED`
     - secondary cyan `#06B6D4`
     - accent amber `#F59E0B`
     - text `#E5E7EB`
     - muted text `#94A3B8`

2. `src/shared/styles/globals.css`
   - apply global body background/typography and gradient overlays.
   - include selection color and scrollbar styling aligned to theme.

3. `src/app/providers/theme.provider.jsx`
   - apply the app-level wrapper classes:
     - full-height background
     - default text color
     - optional theme data attribute (e.g. `data-theme="neo-aurora"`).

4. `src/shared/components/ui/button.jsx`
   - create primary/secondary/ghost variants using Neo Aurora colors.
   - add hover/focus glow styles for CTA consistency.

5. `src/shared/components/ui/card.jsx`
   - set panel background, border, and subtle glass/glow styles.

6. `src/shared/components/layout/app-shell.jsx`
   - set navbar/sidebar surface colors and active link states.

7. `src/core/utils/motion.js`
   - centralize motion presets:
     - page enter
     - card hover
     - stagger list
     - hero image float

8. `src/features/*/pages/*.page.jsx`
   - replace hardcoded colors with shared token classes.
   - apply motion presets to page sections and hero images.
