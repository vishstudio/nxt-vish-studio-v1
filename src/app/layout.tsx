import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "./AppShell";

export const metadata: Metadata = {
  title: "VISH Studio | Creative Web Agency Mauritius",
  description:
    "Premium web agency in Mauritius engineering high-performance custom software, immersive frontend platforms, strategic brand architecture, and premium UI/UX web systems globally.",
  keywords: [
    "Creative web agency Mauritius",
    "Custom React and Next.js developer",
    "Digital product strategy",
    "Premium UI/UX web systems",
  ],
  openGraph: {
    title: "VISH Studio | Creative Web Agency Mauritius",
    description:
      "Premium web agency in Mauritius engineering high-performance custom software, immersive frontend platforms, strategic brand architecture, and premium UI/UX web systems globally.",
    url: "https://vish.studio",
    siteName: "VISH Studio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ overflowX: 'clip' }}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
