import type { Metadata } from "next";
import { Suspense } from "react";
import PreCallBriefForm from "@/components/sections/PreCallBriefForm";

export const metadata: Metadata = {
  title: "Pre-Call Brief — Dnyxstudios",
  robots: { index: false, follow: false },
};

export default function PreCallPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <p className="text-[#007AFF] text-sm font-semibold uppercase tracking-widest mb-4">
          Before our call
        </p>

        <h1 className="text-4xl font-bold text-[#191919] leading-tight tracking-tight mb-4">
          You&apos;re booked in.
        </h1>

        <p className="text-[#4C4C4D] leading-relaxed mb-10">
          Fill out the brief below so we walk into the call already aligned. Takes about three minutes.
        </p>

        <div className="bg-white border border-[#E5E5E7] rounded-2xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-[#191919] mb-2">Pre-call brief</h2>
          <p className="text-sm text-[#4C4C4D] mb-6">
            Five quick questions. Two are optional.
          </p>

          <Suspense fallback={<div className="text-sm text-[#6E6E73]">Loading form…</div>}>
            <PreCallBriefForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
