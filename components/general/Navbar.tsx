"use client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const Navbar = () => {
  const { getUser, isLoading } = useKindeBrowserClient();
  const user = getUser();

  return (
    <nav className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 px-4 py-2 bg-amber-500 mb-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-6">
          <Link href="/">
            <h1 className="text-3xl text-amber-50">
              Blog<span className="text-blue-500">Place</span>
            </h1>
          </Link>
          <div className="hidden sm:flex gap-6">
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

      <div className="flex sm:hidden gap-6">
        <MenuBar />
      </div>
    </nav>
  );
};

export default Navbar;

const MenuBar = () => {
  return (
    <>
      <Link
        href="/"
        className="text-sm lg:text-[18px] font-medium hover:text-blue-500 transition-colors"
      >
        Home
      </Link>
      <Link
        href="/dashboard"
        className="text-sm lg:text-[18px] font-medium hover:text-blue-500 transition-colors"
      >
        Dashboard
      </Link>
    </>
  );
};
