import { getQueryClient } from "@/app/utils/getQueryClient";
import { useMutation } from "@tanstack/react-query";

export function useCreate<TData, TResponse>(
  mutationFn: (data: TData) => Promise<TResponse>,
  queryKey: string[]
) {
  const queryClient = getQueryClient();

  return useMutation<TResponse, Error, TData>({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error: Error) => {
      console.error("Error in mutation:", error);
    }
  });
}
