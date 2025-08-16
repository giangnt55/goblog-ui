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
    return useQuery({
        queryKey: ['me'],
        queryFn: () => meFn().then(r => r.ok ? r.data : Promise.reject((r as any).error ?? 'Unknown error')),
        enabled: enabled && isAccessTokenValid(),
    });
}
