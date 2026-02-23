import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Equipment & Tools | N-SETS",
  description:
    "Industrial and educational equipment and precision tools from N-SETS — machinery, fabrication, lab equipment, and R&D solutions across Pakistan.",
};

export default function EquipmentToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
