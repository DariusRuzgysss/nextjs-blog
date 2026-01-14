"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { User } from "lucide-react";
import { useTranslations } from "next-intl";
import { buttonVariants } from "../ui/button";
import { Activity } from "react";
import { Spinner } from "../ui/spinner";
import LanguageMenuDesktop from "./LanguageMenuDesktop";
import { useLocaleSwitcher } from "@/hooks/api/useLocaleSwitcher";

export default function ProfileDropdown() {
  const t = useTranslations();
  const { user, isLoading } = useKindeBrowserClient();
  const { locale, isPending, changeLanguage } = useLocaleSwitcher();

  if (isLoading) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 rounded-full bg-active/80 cursor-pointer flex flex-row items-center justify-center">
          <Activity mode={isPending ? "visible" : "hidden"}>
            <Spinner className="size-6" />
          </Activity>
          {!isPending &&
            (user ? (
              <strong className="text-[20px]">
                {user?.given_name?.charAt(0)}
              </strong>
            ) : (
              <User />
            ))}
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <LanguageMenuDesktop locale={locale} onChange={changeLanguage} />
        <DropdownMenuSeparator />

        {user ? (
          <DropdownMenuItem className="flex flex-col items-center gap-2">
            <p className="font-semibold">{user.given_name}</p>
            <LogoutLink
              className={`${buttonVariants({
                variant: "primary",
              })} w-full text-center`}
            >
              {t("Actions.logout")}
            </LogoutLink>
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem>
              <LoginLink
                className={`${buttonVariants({
                  variant: "secondary",
                })} w-full text-center`}
              >
                {t("Actions.login")}
              </LoginLink>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RegisterLink
                className={`${buttonVariants({
                  variant: "primary",
                })} w-full text-center`}
              >
                {t("Actions.signUp")}
              </RegisterLink>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
