"use client";

import { languages } from "@/utils/constants";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { useLocaleSwitcher } from "@/hooks/api/useLocaleSwitcher";
import { Activity } from "react";
import { Spinner } from "../ui/spinner";
import { cn } from "@/lib/utils";

export default function LanguageMenuMobile() {
  const t = useTranslations();
  const { locale, isPending, changeLanguage } = useLocaleSwitcher();

  return (
    <main className="flex flex-col gap-3">
      <div className="flex gap-3">
        <span className="text-[18px] font-medium px-4 active:text-amber-200 lg:active:text-transparent text-background">
          {t("General.language").toUpperCase()}
        </span>
        <Activity mode={isPending ? "visible" : "hidden"}>
          <Spinner className="size-6 text-background" />
        </Activity>
      </div>

      <div className="space-y-2">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            type="button"
            onClick={() => changeLanguage(lang.code)}
            className={cn(
              "w-full text-left px-4 py-2 rounded-xl text-sm font-medium",
              locale === lang.code
                ? "bg-active font-semibold text-dark"
                : "text-background hover:bg-muted"
            )}
          >
            {lang.label.toUpperCase()}
          </Button>
        ))}
      </div>
    </main>
  );
}
