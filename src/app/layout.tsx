import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import UserSync from "@/components/UserSync";
import TanStackProvider from "@/components/providers/TanStackProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DentalAI - Modern Dental Care & Triage",
  description:
    "Instant dental symptom triage, clinical voice guidance, and appointment booking with verified dentists.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased text-foreground bg-background selection:bg-primary/15 selection:text-primary min-h-screen`}>
        <TanStackProvider>
          <ClerkProvider
            appearance={{
              variables: {
                colorPrimary: "#0F766E",
                colorDanger: "#dc2626",
                colorSuccess: "#16a34a",
                colorWarning: "#ca8a04",
                colorNeutral: "#1e293b",
                colorText: "#1e293b",
                colorTextOnPrimaryBackground: "#ffffff",
                colorTextSecondary: "#64748b",
                colorBackground: "#ffffff",
                colorInputBackground: "#ffffff",
                colorInputText: "#1e293b",
              },
              elements: {
                userButtonPopoverCard: "shadow-lg border border-[#e2e8f0]",
                userButtonPopoverFooter: "hidden",
              },
            }}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <UserSync />
              <Toaster position="top-right" />
              {children}
            </ThemeProvider>
          </ClerkProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
