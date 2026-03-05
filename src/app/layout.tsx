import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "./AppShell";

export const metadata: Metadata = {
  title: "Vish Studio",
  description: "Design & Development Studio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
