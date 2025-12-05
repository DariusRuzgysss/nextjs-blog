"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";

type Props = {
  totalPages: number;
};

const PaginationComponent = ({ totalPages }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage <= 1}
        className="cursor-pointer"
        onClick={() => goToPage(currentPage - 1)}
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
        onClick={() => goToPage(currentPage + 1)}
        className="cursor-pointer"
      >
        <Icon icon="material-symbols:chevron-right" fontSize={24} />
      </Button>
    </div>
  );
};

export default PaginationComponent;
