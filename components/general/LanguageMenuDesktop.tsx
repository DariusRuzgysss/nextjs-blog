"use client";
import { languages } from "@/utils/constants";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { memo } from "react";

type Props = {
  locale: string;
  onChange: (lang: string) => void;
};

const LanguageMenuDesktop = ({ locale, onChange }: Props) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col  gap-2">
      <DropdownMenuItem className="flex items-center gap-2" disabled>
        <Globe className="h-4 w-4" />
        <span>{t("General.language")}</span>
      </DropdownMenuItem>

      {languages.map((lang) => (
        <DropdownMenuItem
          key={lang.code}
          className={clsx(
            "pl-6 py-1",
            locale === lang.code && "bg-active font-semibold"
          )}
          onClick={() => onChange(lang.code)}
        >
          {lang.label}
        </DropdownMenuItem>
      ))}
    </div>
  );
};

export default memo(LanguageMenuDesktop);
