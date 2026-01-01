import { getQueryClient } from "@/utils/getQueryClient";
import { useMutation } from "@tanstack/react-query";

const queryClient = getQueryClient();

export function useQueryMutate<TId, TData, TResponse>(
  createFn?: (data: TData) => Promise<TResponse>,
  updateFn?: (id: TId, data: TData) => Promise<TResponse>,
  queryKey?: readonly string[]
) {
  return useMutation<TResponse, Error, { id: TId; data: TData }>({
    mutationFn: (vars) => {
      if (updateFn && "id" in vars) {
        return updateFn(vars.id, vars.data);
      }

      if (createFn && "data" in vars) {
        return createFn(vars.data);
      }

      throw new Error("Invalid mutation variables");
    },
    onSuccess: () => {
      if (!queryKey) return;
      for (const key of queryKey) {
        queryClient.invalidateQueries({ queryKey: [key] });
      }
    },
    onError: (error: Error) => {
      console.error("Error in mutation:", error);
    },
  });
}
