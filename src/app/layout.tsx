import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PostHogPageView from "@/components/PostHogPageView";

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
        <PostHogPageView />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />

        <Script id="cal-embed" strategy="afterInteractive">{`
          (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
          Cal("init", "apply", {origin:"https://app.cal.com"});
          Cal.ns.apply("ui", {"theme":"light","cssVarsPerTheme":{"light":{"cal-brand":"#007AFF"}},"hideEventTypeDetails":false,"layout":"month_view"});
          Cal.ns.apply("floatingButton", {"calLink":"forms/a6ec7dce-a533-4f8f-a563-3a0f33e8b0ca","config":{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light"},"buttonColor":"#007AFF","buttonTextColor":"#ffffff","buttonText":"Apply for a Project","buttonPosition":"bottom-right"});
        `}</Script>
      </body>
    </html>
  );
}
