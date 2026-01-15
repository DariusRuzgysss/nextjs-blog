"use client";
import { CategoryFilter } from "@/app/types";
import { recipeCategoryOptions } from "@/utils/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import AnimationWrapperClient from "./AnimationWrapperClient";
import { useTranslations } from "next-intl";

const Categories = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const category = searchParams.get("category");

  const onSelect = useCallback(
    (val: CategoryFilter) => {
      const params = new URLSearchParams(searchParams);

      if (val === "all") {
        params.delete("category");
      } else {
        params.set("category", val);
      }
      params.set("page", "1");
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, replace, searchParams]
  );

  const categoryList = useCallback(() => {
    return recipeCategoryOptions.map((recipe) => {
      const isActive =
        recipe.value === "all" ? category === null : category === recipe.value;
      return (
        <div
          key={recipe.value}
          onClick={() => onSelect(recipe.value)}
          className={`uppercase cursor-pointer rounded-3xl border px-6 py-3 transition active:bg-active lg:active:bg-transparent ${
            isActive
              ? "text-(--dark) bg-(--primaryColor1) border-(--dark)"
              : "border-(--dark)/40  text-(--dark)/40 hover:text-(--dark)"
          } hover:border-(--dark)`}
        >
          <p>{t(recipe.label).toUpperCase()}</p>
        </div>
      );
    });
  }, [onSelect, category, t]);

  return (
    <AnimationWrapperClient
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex flex-col items-center gap-10 mb-10">
        <div className="flex flex-col items-center mt-20 max-w-[426px]">
          <p className="font-bold text-[26px] lg:text-[40px] uppercase text-center">
            {t("HomePage.embarkOnJourney")}
          </p>
          <p className="font-light lg:text-[16px] text-[14px] text-center text-(--dark)/80">
            {t("HomePage.embarkOnJourneyDesc")}
          </p>
        </div>
        <div className="flex-wrap flex flex-row gap-4">{categoryList()}</div>
      </div>
    </AnimationWrapperClient>
  );
};

export default Categories;
