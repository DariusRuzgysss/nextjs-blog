"use client";
import { buttonVariants } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Hamburger } from "./Hamburger";
import Logo from "./Logo";
import MenuBar from "./MenuBarClient";
import { LanguageSelect } from "./LanguageSelect";
import { useTranslations } from "next-intl";

const Navbar = () => {
  const t = useTranslations();
  const { user, isLoading } = useKindeBrowserClient();

  return (
    <div className="mb-4">
      <nav className="border border-(--dark)/24 rounded-4xl px-4 lg:px-6 py-[18px]">
        <div className="flex justify-between">
          <Logo />
          <MenuBar />
          <div className="hidden lg:flex flex-row gap-4 items-center">
            {user ? (
              <>
                <p>{user.given_name}</p>
                <LogoutLink className={buttonVariants({ variant: "primary" })}>
                  {t("Actions.logout")}
                </LogoutLink>
              </>
            ) : isLoading ? null : (
              <div className="flex flex-row gap-4 items-center">
                <LoginLink className={buttonVariants({ variant: "secondary" })}>
                  {t("Actions.login")}
                </LoginLink>

                <RegisterLink
                  className={buttonVariants({ variant: "primary" })}
                >
                  {t("Actions.signUp")}
                </RegisterLink>
              </div>
            )}
            <LanguageSelect />
          </div>

          <div className="flex lg:hidden">
            <Hamburger />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
