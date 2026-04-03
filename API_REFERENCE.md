# 🚀 Backend API Quick Reference for Frontend

## Base URL
```
http://localhost:5000/api      (Development)
https://your-production-domain (Production)
```

---

## 🔐 Authentication Endpoints

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}

Response: 201
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "...",
    "email": "john@example.com",
    "fullName": "John Doe",
    "role": "user"
  }
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123"
}

Response: 200
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {...},
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}

Cookies Set:
- accessToken (15 minutes, HttpOnly)
- refreshToken (7 days, HttpOnly)
```

### Get Current User
```http
GET /auth/me
Authorization: Bearer {accessToken}

Response: 200
{
  "success": true,
  "message": "Current user fetched successfully",
  "data": {
    "_id": "...",
    "email": "john@example.com",
    "fullName": "John Doe",
    "role": "user",
    "skills": [],
    "headline": "",
    "bio": "",
    "profilePhoto": "",
    ...
  }
}
```

### Logout
```http
POST /auth/logout
Authorization: Bearer {accessToken}

Response: 200
{
  "success": true,
  "message": "Logout successful"
}
```

---

## 📄 Resume Endpoints

### Create Manual Resume
```http
POST /resume
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "My Software Engineer Resume",
  "originalText": "John Doe\n\nSoftware Engineer...",
  "parsedData": {} (optional)
}

Response: 201
{
  "success": true,
  "message": "Resume created successfully",
  "data": {
    "_id": "...",
    "userId": "...",
    "title": "My Software Engineer Resume",
    "source": "manual",
    "createdAt": "2024-04-03T..."
  }
}
```

### Upload Resume (PDF, DOC, DOCX)
```http
POST /resume/upload
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data

Form Data:
- resume: <File>
- title: "Resume Title" (optional)

Response: 201
{
  "success": true,
  "message": "Resume uploaded and parsed successfully",
  "data": {
    "_id": "...",
    "title": "resume.pdf",
    "source": "upload",
    "fileName": "resume.pdf",
    "mimeType": "application/pdf"
  }
}

Error: 400 if file parsing fails
{
  "success": false,
  "message": "Failed to extract resume text..."
}
```

### Get My Resumes
```http
GET /resume/my
Authorization: Bearer {accessToken}

Response: 200
{
  "success": true,
  "message": "Resumes fetched successfully",
  "data": [
    {
      "_id": "...",
      "title": "My Resume",
      "source": "manual",
      "createdAt": "2024-04-03T..."
    }
  ]
}
```

### Get Resume by ID
```http
GET /resume/{id}
Authorization: Bearer {accessToken}

Response: 200
{
  "success": true,
  "message": "Resume fetched successfully",
  "data": {
    "_id": "...",
    "title": "My Resume",
    "originalText": "...",
    "source": "manual",
    "createdAt": "2024-04-03T..."
  }
}
```

### Update Resume
```http
PATCH /resume/{id}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "Updated Title",
  "originalText": "Updated content..." (optional)
}

Response: 200
{
  "success": true,
  "message": "Resume updated successfully",
  "data": {...}
}
```

### Delete Resume
```http
DELETE /resume/{id}
Authorization: Bearer {accessToken}

Response: 200
{
  "success": true,
  "message": "Resume deleted successfully"
}
```

---

## 💼 Job Description Endpoints

### Create Job Description
```http
POST /job-description
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "roleTitle": "Senior Developer",
  "companyName": "Tech Corp",
  "jobPostUrl": "https://example.com/jobs/123",
  "jdText": "We are looking for...", (min 50 chars)
  "experienceLevel": "senior", (optional)
  "employmentType": "full-time", (optional)
  "location": "Remote", (optional)
  "resumeId": "..." (optional)
}

Response: 201
{
  "success": true,
  "message": "Job description created successfully",
  "data": {...}
}
```

### Get My Job Descriptions
```http
GET /job-description/my
Authorization: Bearer {accessToken}

Response: 200
{
  "success": true,
  "message": "Job descriptions fetched successfully",
  "data": [...]
}
```

### Get Job Description by ID
```http
GET /job-description/{id}
Authorization: Bearer {accessToken}

Response: 200
{
  "success": true,
  "message": "Job description fetched successfully",
  "data": {...}
}
```

### Update Job Description
```http
PATCH /job-description/{id}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "roleTitle": "Updated Title",
  "jdText": "Updated content..."
  // ... other optional fields
}

Response: 200
{
  "success": true,
  "message": "Job description updated successfully",
  "data": {...}
}
```

### Delete Job Description
```http
DELETE /job-description/{id}
Authorization: Bearer {accessToken}

Response: 200
{
  "success": true,
  "message": "Job description deleted successfully"
}
```

---

## 🤖 AI Interview Generation Endpoints

### Generate Interview Pack
```http
POST /ai/interview-pack
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "resumeId": "...",
  "jobDescriptionId": "...",
  "selfDescription": "I am a backend developer with 5 years experience..." (optional)
}

RATE LIMIT: 10 requests per hour per user
Response: 201
{
  "success": true,
  "message": "Interview pack generated successfully",
  "data": {
    "questions": [
      {
        "type": "technical",
        "difficulty": "medium",
        "question": "Explain microservices architecture..."
      },
      {
        "type": "behavioral",
        "difficulty": "easy",
        "question": "Tell me about a challenging project..."
      }
    ],
    "matchScore": 78,
    "skillGap": {
      "missingSkills": ["Kubernetes", "Docker"],
      "weakAreas": ["System Design"],
      "strengths": ["Backend Development", "Database Design"]
    },
    "preparationPlan": [
      {
        "day": 1,
        "focus": "System Design Fundamentals",
        "tasks": ["Review system design patterns", "Study load balancing"]
      }
    ],
    "summary": "You are well-suited for this role...",
    "aiMeta": {
      "model": "gemini-2.0-flash",
      "usageMetadata": {...}
    }
  }
}

Error: 429 if rate limit exceeded
{
  "success": false,
  "message": "AI request limit exceeded. Maximum 10 requests per hour"
}
```

---

## 📋 Interview Management Endpoints

### Get My Interviews
```http
GET /interview/my?page=1&limit=20
Authorization: Bearer {accessToken}

Query Parameters:
- page: 1 (default)
- limit: 20 (default, max 50)

Response: 200
{
  "success": true,
  "message": "Interviews fetched successfully",
  "data": [
    {
      "_id": "...",
      "resumeId": "...",
      "jobDescriptionId": "...",
      "matchScore": 78,
      "status": "generated",
      "createdAt": "2024-04-03T..."
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
```

### Get Interview by ID
```http
GET /interview/{id}
Authorization: Bearer {accessToken}

Response: 200
{
  "success": true,
  "message": "Interview fetched successfully",
  "data": {
    "_id": "...",
    "questions": [...],
    "matchScore": 78,
    "skillGap": {...},
    "preparationPlan": [...],
    "summary": "...",
    "status": "generated",
    "notes": ""
  }
}
```

### Update Interview
```http
PATCH /interview/{id}
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "status": "in-progress", (or "completed")
  "notes": "Completed day 1 preparation"
}

Response: 200
{
  "success": true,
  "message": "Interview updated successfully",
  "data": {...}
}
```

### Delete Interview
```http
DELETE /interview/{id}
Authorization: Bearer {accessToken}

Response: 200
{
  "success": true,
  "message": "Interview deleted successfully"
}
```

---

## 📄 ATS Resume Generation Endpoints

### Generate ATS Resume (HTML)
```http
POST /ai/ats-resume
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "resumeId": "...",
  "jobDescriptionId": "..."
}

RATE LIMIT: 10 requests per hour per user
Response: 201
{
  "success": true,
  "message": "ATS resume generated successfully",
  "data": {
    "html": "<html>...</html>",
    "aiMeta": {...}
  }
}
```

### Generate ATS Resume (PDF)
```http
POST /ai/ats-resume/pdf
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "resumeId": "...",
  "jobDescriptionId": "..."
}

RATE LIMIT: 10 requests per hour per user
Response: 201 (Content-Type: application/pdf)
[PDF Binary Data]

Header:
- Content-Disposition: attachment; filename="ats-resume.pdf"
```

---

## ⚠️ Common Error Responses

### 400 - Validation Error
```json
{
  "success": false,
  "message": "Email is required",
  "errors": ["email"]
}
```

### 401 - Unauthorized
```json
{
  "success": false,
  "message": "Access token missing"
}
```

### 403 - Forbidden
```json
{
  "success": false,
  "message": "You are not allowed to access this resume"
}
```

### 404 - Not Found
```json
{
  "success": false,
  "message": "Resume not found"
}
```

### 429 - Rate Limited
```json
{
  "success": false,
  "message": "AI request limit exceeded. Maximum 10 requests per hour"
}
```

### 502 - AI Generation Failed
```json
{
  "success": false,
  "message": "AI generation failed: Invalid response format"
}
```

---

## 🔄 Token Refresh

Tokens are stored in HttpOnly cookies automatically. When access token expires:

```javascript
// Automatic refresh happens in middleware
// Frontend doesn't need to handle manually
// Just keep making requests with valid cookies
```

---

## 📌 Important Notes for Frontend

### 1. **Credentials in Requests**
```javascript
// Always include credentials for cookie-based auth
fetch('/api/interview/my', {
  credentials: 'include',
  headers: { 'Authorization': `Bearer ${token}` }
})
```

### 2. **Rate Limiting**
- AI endpoints: 10/hour per user
- Auth endpoints: 5/15 mins
- Resume upload: 20/day
- General API: 100/15 mins

### 3. **File Upload**
- Max file size: 5MB
- Supported formats: PDF, DOC, DOCX
- Use FormData for multipart requests

### 4. **Pagination**
- Default page: 1
- Default limit: 20 (max 50)
- Always handle `meta` in response

### 5. **Error Handling**
- Always check `success` field
- Display `message` to user
- Log full error for debugging
- Handle 429 gracefully on frontend

---

## 🎯 Complete Interview Workflow Example

```javascript
// 1. Upload/Create Resume
POST /resume/upload → resume._id

// 2. Create Job Description
POST /job-description → jobDesc._id

// 3. Generate Interview
POST /ai/interview-pack
{
  "resumeId": resume._id,
  "jobDescriptionId": jobDesc._id,
  "selfDescription": "I have 5 years experience..."
}
→ interview object with questions, matchScore, preparationPlan

// 4. Get Interview (with pagination)
GET /interview/my?page=1&limit=20
→ List of interviews with pagination meta

// 5. Update Interview Progress
PATCH /interview/{id}
{
  "status": "in-progress",
  "notes": "Completed preparation plan day 1"
}

// 6. Generate ATS Resume
POST /ai/ats-resume
{
  "resumeId": resume._id,
  "jobDescriptionId": jobDesc._id
}
→ HTML formatted ATS resume

// 7. Download ATS Resume as PDF
POST /ai/ats-resume/pdf → PDF file
```

---

**All Endpoints Are Production-Ready! ✅**

Your backend is secure, fast, and scalable. Happy coding! 🚀

