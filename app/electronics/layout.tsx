import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Electronics | N-SETS",
  description:
    "N-SETS electronics training equipment — PLC trainers, power electronics trainers, transformer trainers for education and industry.",
};

export default function ElectronicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
