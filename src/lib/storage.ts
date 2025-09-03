import { config } from './config';
import { ENDPOINTS } from './api/endpoints';


const ACCESS_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';
const EXP_KEY = 'token_exp';

let accessTokenCache: string | null = null;
let refreshTokenCache: string | null = null; 


export function getAccessToken(): string | null {
  return accessTokenCache ?? localStorage.getItem(ACCESS_KEY);
}


export function setAccessToken(token: string | null, exp?: number) {
  accessTokenCache = token;
  if (token) {
    localStorage.setItem(ACCESS_KEY, token);
    if (exp) localStorage.setItem(EXP_KEY, String(exp));
  } else {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(EXP_KEY);
  }
}


export function clearSession() {
  setAccessToken(null);
  setRefreshToken(null);
}


type JwtPayload = { exp?: number;[k: string]: unknown };


export function parseJwt(token: string): JwtPayload | null {
  try {
    const base64 = token.split('.')[1]?.replace(/-/g, '+').replace(/_/g, '/');
    if (!base64) return null;
    const json = atob(base64);
    return JSON.parse(json);
  } catch {
    return null;
  }
}


export function isAccessTokenValid(): boolean {
  // const token = getAccessToken();
  // const exp = localStorage.getItem(EXP_KEY);
  // if (!token || !exp) return false;
  // return Date.now() < Number(exp) * 1000;
  return !!getAccessToken();
}


// Cookie-first refresh strategy (recommended): backend stores refresh token in httpOnly cookie.
export async function refreshTokenIfNeeded(): Promise<boolean> {
  const token = getAccessToken();
  if (token && isAccessTokenValid()) return false; // still fresh
  try {
    const url = new URL(ENDPOINTS.auth.refresh(), config.apiBaseUrl).toString();
    const res = await fetch(url, {
      method: 'POST',
      credentials: 'include', // send refresh cookie if backend uses it
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      clearSession();
      return false;
    }
    const data = await res.json().catch(() => ({}));
    if (typeof (data as any)?.accessToken === 'string') {
      setAccessToken((data as any).accessToken);
      return true;
    }
    clearSession();
    return false;
  } catch {
    clearSession();
    return false;
  }
}

export function getRefreshToken(): string | null {
  return refreshTokenCache ?? localStorage.getItem(REFRESH_KEY);
}

export function setRefreshToken(token: string | null) {
  refreshTokenCache = token;
  if (token) {
    localStorage.setItem(REFRESH_KEY, token);
  } else {
    localStorage.removeItem(REFRESH_KEY);
  }
}
