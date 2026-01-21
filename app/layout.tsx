import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/general/Navbar";
import { AuthProvider } from "@/providers/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { ProgressProvider } from "@/providers/ProgressProvider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skonių pasaulis",
  description: "Culinary recipes",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <AuthProvider>
      <html lang={locale}>
        <body
          className={`${roboto.variable} antialiased
          mx-auto`}
        >
          <QueryProvider>
            <ProgressProvider>
              <NextIntlClientProvider messages={messages} locale={locale}>
                <div className="min-h-screen max-w-7xl mx-auto flex flex-col py-4 px-4 lg:px-16 font-(family-name:--font-roboto)">
                  <Navbar />
                  <main className="flex-1">{children}</main>
                </div>
              </NextIntlClientProvider>
              <Toaster />
            </ProgressProvider>
          </QueryProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
