
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "API Explorer 🎉",
  description: "Una app divertida que consume una API externa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}