import { api } from '../../lib/api/client';
import { ENDPOINTS } from '../../lib/api/endpoints';
import type { Result } from '../../lib/api/types';
import { setAccessToken, clearSession } from '../../lib/storage';
import type { LoginRequest, LoginResponse } from './types';

export async function login(body: LoginRequest): Promise<Result<LoginResponse>> {
  const res = await api.post<LoginResponse>(ENDPOINTS.auth.login(), body);
  if (res.ok && res.data?.accessToken) setAccessToken(res.data.accessToken);
  return res;
}

export async function logout(): Promise<void> {
  await api.post<void>(ENDPOINTS.auth.logout(), {});
  clearSession();
}

export async function me() {
  return api.get<{ id: string; name: string; email: string }>(ENDPOINTS.me());
}
