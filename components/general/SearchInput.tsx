"use client";
import { ChangeEvent, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Label } from "../ui/label";
import { useTranslations } from "next-intl";

type Props = {
  label?: string;
  placeholder?: string;
  debounce?: number;
  className?: string;
};

const SearchInput = ({
  label,
  placeholder = "searchPlaceholder",
  className,
  debounce = 400,
}: Props) => {
  const t = useTranslations("Filters");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!searchParams.get("query") && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [searchParams]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value;
    const timer = setTimeout(() => {
      if (value) {
        params.set("page", "1");
        params.set("query", value);
      } else {
        params.delete("query");
      }
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, debounce);
    return () => {
      clearTimeout(timer);
    };
  };

  return (
    <>
      {label && <Label>{label}</Label>}
      <Input
        ref={inputRef}
        type="search"
        placeholder={t(placeholder)}
        className={`border-gray-400 ${className}`}
        onChange={handleSearch}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </>
  );
};

export default SearchInput;
