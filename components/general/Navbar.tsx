"use client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
];

const Navbar = () => {
  const { user, isLoading } = useKindeBrowserClient();

  return (
    <nav className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 px-4 py-2 bg-amber-500 mb-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-6">
          <Link href="/">
            <h1 className="text-3xl text-amber-50">
              Blog<span className="text-amber-700 font-bold">Place</span>
            </h1>
          </Link>
          <div className="hidden sm:flex gap-6 items-center">
            <MenuBar />
          </div>
        </div>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <p>{user.given_name}</p>
              <LogoutLink className={buttonVariants({ variant: "secondary" })}>
                Logout
              </LogoutLink>
            </>
          ) : isLoading ? null : (
            <>
              <LoginLink className={buttonVariants()}>Login</LoginLink>

              <RegisterLink
                className={buttonVariants({ variant: "secondary" })}
              >
                Sign up
              </RegisterLink>
            </>
          )}
        </div>
      </div>

      <div className="flex sm:hidden gap-6 items-center">
        <MenuBar />
      </div>
    </nav>
  );
};

export default Navbar;

const MenuBar = () => {
  const pathname = usePathname();
  return (
    <>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "text-sm lg:text-[18px] font-medium transition-colors px-2 py-1 rounded-sm",
              isActive
                ? "text-blue-50 bg-amber-700 border border-amber-50"
                : "text-black hover:text-blue-50"
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </>
  );
};
