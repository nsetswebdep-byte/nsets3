import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Automation | N-SETS",
  description:
    "N-SETS smart home solutions — MixPad, ORVIBO locks, smart cameras, sensors, and lighting. HomeAI OS, Jie Tech and ORVIBO catalogs.",
};

export default function HomeAutomationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
