import { refreshTokenIfNeeded, getAccessToken } from '../storage';
import { ApiError } from './types';
import { config } from '../config';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

async function request<T>(path: string, method: HttpMethod, body?: any): Promise<{ ok: boolean; data: T }> {
  await refreshTokenIfNeeded();
  const token = getAccessToken();

  const res = await fetch(`${config.apiBaseUrl}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let errMsg = 'Request failed';
    try {
      const errJson = await res.json();
      errMsg = errJson.message || JSON.stringify(errJson);
    } catch {/* ignore */}
    throw new ApiError(res.status, errMsg);
  }

  const data = (await res.json()) as T;
  return { ok: true, data };
}

export const api = {
  get: <T>(url: string) => request<T>(url, 'GET'),
  post: <T>(url: string, body?: any) => request<T>(url, 'POST', body),
  put: <T>(url: string, body?: any) => request<T>(url, 'PUT', body),
  patch: <T>(url: string, body?: any) => request<T>(url, 'PATCH', body),
  delete: <T>(url: string) => request<T>(url, 'DELETE'),
};
