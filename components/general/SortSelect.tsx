"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { SortOptions } from "@/app/types";
import { useTranslations } from "next-intl";

const SortSelect = () => {
  const t = useTranslations("Filters");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { user } = useKindeBrowserClient();
  const sort = searchParams.get("sort") ?? SortOptions.NEWEST_FIRST;

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
    <Select
      value={sort}
      onValueChange={handleSort}
      defaultValue={SortOptions.NEWEST_FIRST}
    >
      <SelectTrigger className="w-[130px] md:w-[180px] border-gray-400 truncate">
        <SelectValue placeholder="Sort by" className="truncate" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{t("sortBy")}</SelectLabel>
          <SelectItem value={SortOptions.NEWEST_FIRST}>
            {t("newest")}
          </SelectItem>
          <SelectItem value={SortOptions.OLDEST_FIRST}>
            {t("oldest")}
          </SelectItem>
          {user && (
            <SelectItem value={SortOptions.FAVORITE}>
              {t("favorite")}
            </SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortSelect;
