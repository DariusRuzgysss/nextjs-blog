"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { SortOptions } from "@/types";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { SORT_FILTER } from "@/lib/constants";

const SortSelect = () => {
  const t = useTranslations("Filters");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { user } = useKindeBrowserClient();
  const sort = searchParams.get("sort") ?? SortOptions.NEWEST_FIRST;
  const isLogged = !!user;

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === SortOptions.NEWEST_FIRST) {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    if (value === SortOptions.FAVORITE) {
      params.set("page", "1");
    }

    replace(`${pathname}?${params}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[16px] font-semibold uppercase">{t("sortBy")}</h3>
      <div className="grid grid-cols-3 gap-2">
        {SORT_FILTER.filter((item) => isLogged || !item.onlyLogged).map(
          (sortItem) => (
            <Button
              variant={sort === sortItem.value ? "ghost" : "secondary"}
              key={sortItem.title}
              onClick={() => handleSort(sortItem.value)}
              className={cn(
                `hover:${sort === sortItem.value && "bg-transparent"}`,
              )}
            >
              {t(sortItem.title)}
            </Button>
          ),
        )}
      </div>
    </div>
  );
};

export default SortSelect;
