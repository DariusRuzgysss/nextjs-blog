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

type Props = {
  totalPages: number;
};

const PaginationComponent = ({ totalPages }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const setUrlParams = (
    value: string,
    urlName: string,
    isResetPage?: boolean
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
        className="cursor-pointer"
        onClick={() => setUrlParams((currentPage - 1).toString(), "page")}
      >
        <Icon icon="material-symbols:chevron-left" fontSize={24} />
      </Button>

      <span className="px-4 text-sm">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant="outline"
        size="icon"
        disabled={currentPage >= totalPages}
        onClick={() => setUrlParams((currentPage + 1).toString(), "page")}
        className="cursor-pointer"
      >
        <Icon icon="material-symbols:chevron-right" fontSize={24} />
      </Button>

      <Select
        onValueChange={(val) => setUrlParams(val, "limit", true)}
        defaultValue="5"
      >
        <SelectTrigger className="w-20  border-gray-400">
          <SelectValue placeholder="Posts per page" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PaginationComponent;
