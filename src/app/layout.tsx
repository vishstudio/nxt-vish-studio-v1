import type { Metadata } from "next";
import { Inter, Prompt, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AppShell } from "./AppShell";
import { GoogleAnalytics } from "../components/google-analytics";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

const prompt = Prompt({
  subsets: ["latin"],
  weight: ["300", "400", "900"],
  display: "swap",
  variable: "--font-logo",
});

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
  icons: {
    icon: [
      { url: "/assets/favicon.png", type: "image/png" },
      // { url: "/assets/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/assets/icon.svg",
    shortcut: "/assets/favicon.png",
  },
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
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${prompt.variable}`} style={{ overflowX: 'clip' }}>
        <GoogleAnalytics />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
