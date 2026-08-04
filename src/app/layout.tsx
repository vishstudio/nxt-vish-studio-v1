import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import { AppShell } from "./AppShell";
import { GoogleAnalytics } from "../components/google-analytics";

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

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <html lang="en" style={{ backgroundColor: "#000000", color: "#ffffff" }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alien+Block&family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&family=Outfit:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={prompt.variable}
        style={{ backgroundColor: "#000000", color: "#ffffff", overflowX: "clip" }}
      >
        <GoogleAnalytics />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

export default RootLayout;
