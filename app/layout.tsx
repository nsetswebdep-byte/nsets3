import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "N-SETS | Engineering Vision & Smart Systems",
  description: "A cinematic scrollytelling showcase of N-SETS engineering prowess and smart building solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#0b0b0b]">
        {children}
      </body>
    </html>
  );
}
