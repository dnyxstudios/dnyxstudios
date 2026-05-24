import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PostHogPageView from "@/components/PostHogPageView";
import AppProviders from "@/components/AppProviders";

export const metadata: Metadata = {
  title: "Dnyxstudios — Motion Graphics for SaaS",
  description:
    "Premium motion graphics videos produced, revised, and delivered in under 2 weeks. Built for early stage SaaS founders who want to look like they have raised a Series A.",
  openGraph: {
    title: "Dnyxstudios — Motion Graphics for SaaS",
    description:
      "Premium motion graphics videos produced, revised, and delivered in under 2 weeks.",
    siteName: "Dnyxstudios",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#F8F9FA] text-[#191919]">
        <AppProviders>
          <PostHogPageView />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
