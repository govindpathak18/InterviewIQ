import { apiRequest } from "../../../core/api/client";
import { ENDPOINTS } from "../../../core/api/endpoints";

export async function loginUser(payload) {
  return apiRequest(ENDPOINTS.auth.login, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function registerUser(payload) {
  return apiRequest(ENDPOINTS.auth.register, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
