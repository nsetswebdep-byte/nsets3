import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trading Profile | N-SETS",
  description:
    "N-SETS (Pvt.) Ltd. trading profile — CNC machines, electronics & automation, cables, electrical equipment, industrial instruments, and metals. Chip to Ship solutions across Pakistan.",
};

export default function TradingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
