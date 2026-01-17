import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // Settings rarely change, cache for 1 hour
      gcTime: 1000 * 60 * 60 * 24, // Keep in garbage collection for 24 hours
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
