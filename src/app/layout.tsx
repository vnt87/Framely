import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/lib/theme-provider";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import PlausibleProvider from "next-plausible";

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
    <PlausibleProvider
      domain="framely.site"
      customDomain={process.env.NEXT_PUBLIC_ANALYTICS_URL}
      trackOutboundLinks
      selfHosted
      enabled
    >
      <ClerkProvider>
        <SpeedInsights />
        <html lang="en" className={inter.className} suppressHydrationWarning>
          <body suppressHydrationWarning>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </PlausibleProvider>
  );
}
