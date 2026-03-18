import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lost & Found Canada — National Transit Recovery",
  description: "Report lost items across Canadian transit networks. AI-powered matching.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
