"use client";
import { ChangeEvent } from "react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Label } from "../ui/label";

type Props = {
  label?: string;
  placeholder?: string;
  debounce?: number;
};

const SearchInput = ({ label, placeholder, debounce = 1000 }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value;
    setTimeout(() => {
      if (value) {
        params.set("query", value);
      } else {
        params.delete("query");
      }
      replace(`${pathname}?${params.toString()}`);
    }, debounce);
  };

  return (
    <>
      {label && <Label>{label}</Label>}
      <Input
        type="search"
        placeholder={placeholder}
        className="border-gray-400"
        onChange={handleSearch}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </>
  );
};

export default SearchInput;
