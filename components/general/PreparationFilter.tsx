"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { PREPARATION_TIME } from "@/lib/constants";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { isSameRange } from "@/lib/helper";
import { useMemo } from "react";

type TimeRange = [number, number];

const TIME_OPTIONS: { label: string; value: TimeRange }[] = [
  { label: "less15min", value: [PREPARATION_TIME.MIN, 15] },
  { label: "1530min", value: [15, 30] },
  { label: "3060min", value: [30, 60] },
  { label: "1+h", value: [60, PREPARATION_TIME.MAX] },
];

const PreparationFilter = () => {
  const t = useTranslations("Filters");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const currentRange = useMemo<TimeRange>(() => {
    return [
      Number(searchParams.get("timeMin")) || PREPARATION_TIME.MIN,
      Number(searchParams.get("timeMax")) || PREPARATION_TIME.MAX,
    ];
  }, [searchParams]);

  const handleSort = ([min, max]: TimeRange) => {
    const params = new URLSearchParams(searchParams.toString());
    if (isSameRange(currentRange, [min, max])) {
      params.delete("timeMin");
      params.delete("timeMax");
    } else {
      params.set("timeMin", String(min));
      params.set("timeMax", String(max));
    }
    params.set("page", "1");

    push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[16px] font-semibold uppercase">
        {t("preparationTimeSort")}
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {TIME_OPTIONS.map((option) => {
          const [min, max] = option.value;
          const isSameValue = isSameRange(currentRange, [min, max]);
          return (
            <Button
              variant={isSameValue ? "ghost" : "secondary"}
              key={option.label}
              onClick={() => handleSort(option.value)}
              className={cn(
                `cursor-pointer hover:${isSameValue && "bg-transparent"}`,
              )}
            >
              {t(option.label)}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default PreparationFilter;
