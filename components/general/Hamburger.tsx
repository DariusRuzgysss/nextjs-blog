"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";

import Logo from "./Logo";
import { navItems } from "@/utils/constants";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";

export function Hamburger() {
  const { user } = useKindeBrowserClient();
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-(--dark) [&>button]:hidden">
        <SheetHeader>
          <SheetTitle>
            <Logo titleColor="text-(--background)" />
          </SheetTitle>
          <SheetClose>
            <Button
              variant="primary"
              size="icon"
              className="absolute right-4 top-4"
            >
              <X className="h-4 w-4" />
            </Button>
          </SheetClose>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-8 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={clsx(
                    "text-[18px] font-medium px-4",
                    isActive ? "text-(--primary-color-3)" : "text-background"
                  )}
                >
                  {item.name.toUpperCase()}
                </Link>
                <div className="h-px bg-(--light)/16 mt-4" />
              </div>
            );
          })}
        </div>
        <SheetFooter>
          <p className="text-background text-center">{user?.given_name}</p>
          <LogoutLink className={buttonVariants({ variant: "primary" })}>
            Logout
          </LogoutLink>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
