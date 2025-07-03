import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import AuthWrapper from "@/components/AuthWrapper";

export const metadata: Metadata = {
  title: "Help Chain",
  description: "Job search app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="h-full">
        <AuthWrapper>
          <Header />
          {children}
        </AuthWrapper>
      </body>
    </html>
  );
}
