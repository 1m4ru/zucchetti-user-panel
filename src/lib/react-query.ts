import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.error("Erro global de query:", error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      console.error("Erro global de mutation:", error);
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
