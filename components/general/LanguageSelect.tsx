"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setCookieLocale } from "@/features/locale/actions";
import { languages } from "@/utils/constants";
import { getInitialLocale } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export function LanguageSelect() {
  const router = useRouter();
  const [locale, setLocale] = useState(getInitialLocale);
  const [isPending, startTransition] = useTransition();

  const changeLanguage = async (lang: string) => {
    startTransition(async () => {
      setLocale(lang);
      await setCookieLocale(lang);
      router.refresh();
    });
  };

  return (
    <Select onValueChange={changeLanguage} value={locale}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
