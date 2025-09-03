import { useMe } from '../features/auth/hooks';

export function useAuth() {
  const result = useMe();

  const { data: user, isLoading } = result;
  return { user, isLoading, isAuthenticated: !!user };
}
