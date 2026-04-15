import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AASAP Executive Dashboard — AFCAC",
  description: "African Aerodrome Safety Action Plan — Multi-State Monitoring Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700;800&family=Barlow:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
