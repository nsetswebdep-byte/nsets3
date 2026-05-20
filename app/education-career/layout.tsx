import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education & Career | N-SETS",
  description:
    "N-SETS supports universities and training institutes with lab equipment, electronics trainers, and technical partnerships — plus career opportunities in engineering and smart systems across Pakistan.",
};

export default function EducationCareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
