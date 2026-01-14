"use client";
import { navItems } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useTranslations } from "next-intl";

const MenuBar = () => {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  return (
    <div className="hidden lg:flex flex-row gap-6">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "text-[18px] font-medium",
              isActive
                ? "text-(--dark) border-b-4 border-(--primary-color-3)"
                : "text-(--dark)/24 hover:text-active"
            )}
          >
            {t(item.name)}
          </Link>
        );
      })}
    </div>
  );
};

export default MenuBar;
