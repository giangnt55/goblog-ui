import { api } from '../../lib/api/client';
import { ENDPOINTS } from '../../lib/api/endpoints';
import type { Result } from '../../lib/api/types';
import { setAccessToken, clearSession } from '../../lib/storage';
import type { LoginRequest, LoginResponse } from './types';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// export async function login(body: LoginRequest): Promise<Result<LoginResponse>> { const res = await api.post<LoginResponse>(ENDPOINTS.auth.login(), body); if (res.ok && res.data?.accessToken) setAccessToken(res.data.accessToken); return res; }

export async function login(body: LoginRequest): Promise<Result<LoginResponse>> {
  await delay(500); 

  if (body.email === 'GiangNTSE150747@fpt.edu.vn' && body.password === '123456') {
    const data: LoginResponse = {
      user: { id: '1', name: 'Giang Nguyen', email: body.email },
      accessToken: 'fake_access_token_123',
      refreshToken: 'fake_refresh_token_456', 
    };
    setAccessToken(data.accessToken); 
    return { ok: true, data };
  } else {
    return { ok: false, error: 'Invalid email or password' };
  }
}

export async function logout(): Promise<void> {
  await delay(300); // giả lập network
  clearSession(); // giữ logic hiện tại
}

// export async function logout(): Promise<void> {
//   await api.post<void>(ENDPOINTS.auth.logout(), {});
//   clearSession();
// }

// export async function me() {
//   return api.get<{ id: string; name: string; email: string }>(ENDPOINTS.me());
// }

export async function me(): Promise<Result<{ id: string; name: string; email: string }>> {
  await delay(300); // giả lập network
  return {
    ok: true,
    data: {
      id: '1',
      name: 'Giang Nguyen',
      email: 'GiangNTSE150747@fpt.edu.vn',
    },
  };
}