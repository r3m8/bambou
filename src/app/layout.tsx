import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: process.env.PAGES_TITLE,
  description: process.env.PAGES_DESC,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
