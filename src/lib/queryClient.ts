import { QueryClient } from '@tanstack/react-query';

// Create a QueryClient instance with default options
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Retry failed queries twice before throwing an error
      retry: 2,
      // Do not refetch on window focus by default
      refetchOnWindowFocus: false,
      // Cache data for 5 minutes
      staleTime: 1000 * 60 * 5,
    },
    mutations: {
      // Retry mutations once on failure
      retry: 1,
    },
  },
});
