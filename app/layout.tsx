import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dental Clinic Management System",
  description: "Dental Clinic Management System",
  generator: "Dental Clinic Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
