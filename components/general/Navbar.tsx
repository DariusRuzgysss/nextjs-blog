import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-amber-500 mb-4">
      <div className="flex items-center gap-6">
        <Link href="/">
          <h1 className="text-3xl text-amber-50">
            Logo<span className="text-blue-500">Place</span>
          </h1>
        </Link>
        <div className="flex gap-6">
          <Link
            href="/"
            className="sm:text-sm lg:text-[18px] font-medium hover:text-blue-500 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="sm:text-sm lg:text-[18px] font-medium hover:text-blue-500 transition-colors"
          >
            Dashboard
          </Link>
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
        ) : (
          <>
            <LoginLink className={buttonVariants()}>Login</LoginLink>
            <RegisterLink className={buttonVariants({ variant: "secondary" })}>
              Sign up
            </RegisterLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
