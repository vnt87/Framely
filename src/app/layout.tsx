import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/lib/theme-provider";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Framely",
  description: "The Open-Source Website Builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" className={inter.className}>
        <body>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <SidebarProvider>
              {children}
              <Toaster />
            </SidebarProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
