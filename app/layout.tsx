import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StartApp",
  description: "Your native React+Flutter+Android project generation engine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-800 text-zinc-50 font-semibold">{children}</body>
    </html>
  );
}
