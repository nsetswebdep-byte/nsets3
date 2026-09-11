import type { Metadata } from "next";
import localFont from "next/font/local";
import SiteDownPage from "@/components/SiteDownPage";
import { SITE_DOWN_MODE } from "@/lib/siteConfig";
import "./globals.css";

const montserrat = localFont({
  src: [
    {
      path: "../public/font/Montserrat/Montserrat-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../public/font/Montserrat/Montserrat-Italic-VariableFont_wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "N-SETS | Engineering Vision & Smart Systems",
  description:
    "A cinematic scrollytelling showcase of N-SETS engineering prowess and smart building solutions.",
  icons: {
    icon: "/images/logos/Nsets logo_icon colored.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={SITE_DOWN_MODE ? undefined : `${montserrat.variable} antialiased bg-[#0b0b0b]`}>
        {SITE_DOWN_MODE ? <SiteDownPage /> : children}
      </body>
    </html>
  );
}
