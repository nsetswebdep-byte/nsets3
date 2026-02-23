import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | N-SETS",
  description:
    "NSETS (Private) Limited — Pakistan-based engineering company. Mechanical fabrication, CNC machining, precision manufacturing, industrial equipment supply, and Wintech uPVC solutions.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
