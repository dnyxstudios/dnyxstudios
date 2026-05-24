import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dnyxstudios",
  robots: { index: false, follow: false },
};

export default function NotAFitPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-6">
      <div className="max-w-lg w-full py-16">
        <p className="text-[#007AFF] text-sm font-semibold uppercase tracking-widest mb-4">
          Dnyxstudios
        </p>

        <h1 className="text-4xl font-bold text-[#191919] leading-tight tracking-tight mb-6">
          We&apos;re not the right fit for this one.
        </h1>

        <div className="text-[#4C4C4D] leading-relaxed space-y-4 mb-8">
          <p>
            Thanks for reaching out. Based on your budget, we can&apos;t take this project on: our minimum sits at $800 because that&apos;s where we can produce work we&apos;re proud of.
          </p>
          <p>
            If your budget grows, the door&apos;s open. In the meantime:
          </p>
          <p>
            <a
              href="https://www.instagram.com/dnyxstudios"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#007AFF] font-semibold hover:underline"
            >
              Follow us
            </a>
            {" "}for motion design tips and breakdowns.
          </p>
          <p>Best of luck with your project.</p>
          <p className="font-semibold text-[#191919]">dnyxstudios</p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#191919] text-white text-sm font-semibold px-5 py-3 rounded-full hover:bg-[#333333] transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
