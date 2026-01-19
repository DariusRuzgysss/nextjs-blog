import { getQueryClient } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const queryClient = getQueryClient();

export function useQueryMutate<TId, TData, TResponse>(
  createFn?: (data: TData) => Promise<TResponse>,
  updateFn?: (id: TId, data: TData) => Promise<TResponse>,
  queryKey?: readonly string[],
  onSuccess?: () => void,
  successMessage?: string,
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
      if (successMessage) {
        toast.success(successMessage);
      }
      if (queryKey?.length) {
        for (const key of queryKey) {
          queryClient.invalidateQueries({ queryKey: [key] });
        }
      }
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error("Something wrong happened", {
        description: error.message,
      });
    },
  });
}
