import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Logic Design | N-SETS",
  description:
    "Digital logic design trainers and FPGA solutions from N-SETS — combinational and sequential logic, microprocessor circuits for education and labs.",
};

export default function DigitalLogicDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
