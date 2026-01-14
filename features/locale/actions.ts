"use server";

import { cookies } from "next/headers";

export async function setCookieLocale(lang: string) {
  (await cookies()).set("LOCALE", lang);
}
