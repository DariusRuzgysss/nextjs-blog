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

const SortSelect = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { user } = useKindeBrowserClient();

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("sort", value);
      if (value === SortOptions.FAVORITE) {
        params.set("page", "1");
      }
    } else {
      params.delete("sort");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Select
      value={searchParams.get("sort")?.toString()}
      onValueChange={handleSort}
      defaultValue={SortOptions.NEWEST_FIRST}
    >
      <SelectTrigger className="w-[130px] md:w-[180px] border-gray-400">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by</SelectLabel>
          <SelectItem value={SortOptions.NEWEST_FIRST}>Newest first</SelectItem>
          <SelectItem value={SortOptions.OLDEST_FIRST}>Oldest first</SelectItem>
          {user && (
            <SelectItem value={SortOptions.FAVORITE}>Favorite</SelectItem>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortSelect;
