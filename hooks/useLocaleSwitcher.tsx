"use client";

import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { setCookieLocale } from "@/features/locale/actions";
import { getInitialLocale } from "@/lib/helper";

export function useLocaleSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [locale, setLocale] = useState(getInitialLocale);

  const changeLanguage = (lang: string) => {
    if (lang === locale) {
      return;
    }

    startTransition(async () => {
      setLocale(lang);
      await setCookieLocale(lang);
      router.refresh();
    });
  };

  return {
    locale,
    isPending,
    changeLanguage,
  };
}
