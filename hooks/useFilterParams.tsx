import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useFilterParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawMin = searchParams.get("timeMin");
  const rawMax = searchParams.get("timeMax");
  const rawSort = searchParams.get("sort");

  const isSet = rawMin !== null || rawMax !== null || rawSort !== null;

  const reset = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("timeMin");
    params.delete("timeMax");
    params.delete("sort");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, pathname, searchParams]);

  return {
    isSet,
    reset,
  };
}
