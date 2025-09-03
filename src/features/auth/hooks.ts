import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { login as loginFn, logout as logoutFn, me as meFn } from './api';
import type { LoginRequest } from './types';
import { isAccessTokenValid } from '../../lib/storage';

export function useLogin() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (body: LoginRequest) =>
            loginFn(body).then(r => r.ok ? r.data : Promise.reject(r.error ?? 'Unknown error')),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['me'] });
        },
    });
}

export function useLogout() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: () => logoutFn(),
        onSuccess: () => {
            qc.clear();
        },
    });
}

export function useMe(enabled = true) {
  const tokenValid = isAccessTokenValid();
  console.log("[useMe] isAccessTokenValid:", tokenValid);

  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      console.log("[useMe] fetching...");
      const r = await meFn();
      console.log("[useMe] raw result:", r);

      if (r.ok) {
        console.log("[useMe] resolved data:", r.data);
        return r.data;
      }

      return Promise.reject(r.error ?? "Unknown error");
    },
    enabled: enabled && tokenValid,
  });
}

