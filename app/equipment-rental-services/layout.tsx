import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Equipment Rental Services | N-SETS",
  description:
    "Rent high-performance test and measurement equipment from N-SETS — VNAs, spectrum analyzers, probe stations. Flexible terms, calibrated and ready.",
};

export default function EquipmentRentalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
