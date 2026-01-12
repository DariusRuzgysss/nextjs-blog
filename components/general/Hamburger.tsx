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
  LoginLink,
  LogoutLink,
  RegisterLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";

export function Hamburger() {
  const { user, isLoading } = useKindeBrowserClient();
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-(--dark) [&>button]:hidden">
        <SheetHeader className="flex flex-row justify-between">
          <SheetTitle>
            <Logo titleColor="text-(--background)" />
          </SheetTitle>
          <SheetClose className="bg-(--primary-color-3) p-2 rounded-xl">
            <X className="h-4 w-4" />
          </SheetClose>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-8 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <div key={item.href}>
                <SheetClose asChild>
                  <Link
                    href={item.href}
                    className={clsx(
                      "text-[18px] font-medium px-4 active:text-amber-200 lg:active:text-transparent",
                      isActive ? "text-(--primary-color-3)" : "text-background"
                    )}
                  >
                    {item.name.toUpperCase()}
                  </Link>
                </SheetClose>
                <div className="h-px bg-(--light)/16 mt-4" />
              </div>
            );
          })}
        </div>
        <SheetFooter>
          {user ? (
            <>
              <p className="text-background text-center">{user.given_name}</p>
              <LogoutLink
                className={clsx(
                  buttonVariants({ variant: "primary" }),
                  "active:bg-active lg:active:bg-transparent"
                )}
              >
                Logout
              </LogoutLink>
            </>
          ) : isLoading ? null : (
            <>
              <LoginLink
                className={clsx(
                  buttonVariants({ variant: "default" }),
                  "active:bg-active lg:active:bg-transparent"
                )}
              >
                Login
              </LoginLink>

              <RegisterLink
                className={clsx(
                  buttonVariants({ variant: "primary" }),
                  "active:bg-active lg:active:bg-transparent"
                )}
              >
                Sign up
              </RegisterLink>
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
