import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | N-SETS",
  description:
    "Get in touch with N-SETS — offices in Islamabad, Lahore, and Rawalpindi. Phone, email, or send a message for smart homes, uPVC, and equipment inquiries.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
