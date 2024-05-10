import type { Metadata } from "next";
import { Poppins as FontSans } from "next/font/google";
import "@styles/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@components/shared/Theme/theme-provider";
import Navbar from "@components/layout/Navbar";
import { Toaster } from "@components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "parcel delivery system",
  description: "A parcel delivery system for agents and sellers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen px-[5%]  pt-24">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
