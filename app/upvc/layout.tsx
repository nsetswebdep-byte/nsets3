import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "uPVC Windows & Doors | N-SETS",
  description:
    "Wintech by ADO Group uPVC profiles — 222, 632, and 750 series. Energy-efficient windows and doors for residential and commercial projects in Pakistan.",
};

export default function UpvcLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
