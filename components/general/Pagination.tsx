"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTranslations } from "next-intl";
import { PAGINATION } from "@/lib/constants";

type Props = {
  totalPages: number;
};

const PAGE_SIZE_OPTIONS = [6, 12, 60, 120];

const PaginationComponent = ({ totalPages }: Props) => {
  const t = useTranslations("General");
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const setUrlParams = (
    value: string,
    urlName: string,
    isResetPage?: boolean,
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set(urlName, value);
    if (isResetPage) {
      params.set("page", "1");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center gap-4 mb-6">
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage <= 1}
        className="cursor-pointer border-ring/20"
        onClick={() => setUrlParams((currentPage - 1).toString(), "page")}
      >
        <Icon icon="material-symbols:chevron-left" fontSize={24} />
      </Button>

      <span className="px-4 text-sm">
        {t("page")} {currentPage} {t("of")} {totalPages}
      </span>

      <Button
        variant="outline"
        size="icon"
        disabled={currentPage >= totalPages}
        onClick={() => setUrlParams((currentPage + 1).toString(), "page")}
        className="cursor-pointer border-ring/20"
      >
        <Icon icon="material-symbols:chevron-right" fontSize={24} />
      </Button>

      <Select
        onValueChange={(val) => setUrlParams(val, "limit", true)}
        defaultValue={PAGINATION.DEFAULT_PAGE_SIZE.toString()}
      >
        <SelectTrigger className="w-20 border-ring/20">
          <SelectValue placeholder="Posts per page" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {PAGE_SIZE_OPTIONS.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PaginationComponent;
