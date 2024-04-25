import type { Metadata } from "next";
import { MyProvider } from "@/context";
import Head from "next/head";

export const metadata: Metadata = {
  title: "shorX",
  description: "Link shortening service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="flex  flex-col min-h-screen">
      <Head>
        <link
          rel="preload"
          href="https://api.qrserver.com/v1/create-qr-code/"
          as="image"
        />
        <link
          rel="preload"
          href={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON"`}
        />
      </Head>

      <body className="flex-1 flex flex-col">
        <MyProvider>{children}</MyProvider>
      </body>
    </html>
  );
}
