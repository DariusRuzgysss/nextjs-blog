import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function requireUser() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return user;
}
