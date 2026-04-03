import { apiRequest } from "../../../core/api/client";
import { ENDPOINTS } from "../../../core/api/endpoints";

export async function getMyResumes() {
  const payload = await apiRequest(ENDPOINTS.resume.my, { method: "GET" });
  return payload?.data || [];
}

export async function createManualResume(input) {
  const payload = await apiRequest(ENDPOINTS.resume.base, {
    method: "POST",
    body: JSON.stringify(input),
  });

  return payload?.data;
}

export async function getResumeById(id) {
  const payload = await apiRequest(ENDPOINTS.resume.byId(id), { method: "GET" });
  return payload?.data;
}

export async function updateResume(id, input) {
  const payload = await apiRequest(ENDPOINTS.resume.byId(id), {
    method: "PATCH",
    body: JSON.stringify(input),
  });

  return payload?.data;
}

export async function deleteResume(id) {
  await apiRequest(ENDPOINTS.resume.byId(id), { method: "DELETE" });
  return true;
}
