"use client";

import { languages } from "@/utils/constants";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { useLocaleSwitcher } from "@/hooks/useLocaleSwitcher";
import { Activity } from "react";
import { Spinner } from "../ui/spinner";

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
            variant={locale === lang.code ? "ghost" : "default"}
            onClick={() => changeLanguage(lang.code)}
            className={"w-full"}
          >
            {lang.label.toUpperCase()}
          </Button>
        ))}
      </div>
    </main>
  );
}
