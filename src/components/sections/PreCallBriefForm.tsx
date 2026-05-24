"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { isTestMode, resolveWebhookUrl } from "@/lib/webhook";

const BRIEF_WEBHOOK_URL =
  "https://n8n.srv1617364.hstgr.cloud/webhook/sop004-brief";

const VIDEO_GOALS = [
  "Drive Demos",
  "Build Credibility",
  "Explain Product",
  "Launch Support",
  "Investor Pitch",
  "Other",
];

const VIDEO_PLATFORMS = [
  "Website",
  "Paid Ads",
  "Organic",
  "LinkedIn",
  "Sales Deck",
  "Investor Pitch",
  "Onboarding",
  "Other",
];

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-[#E5E5E7] bg-white text-[#191919] text-sm placeholder:text-[#98989A] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/30 focus:border-[#007AFF] transition-colors";
const labelCls = "text-sm font-semibold text-[#191919]";

export default function PreCallBriefForm() {
  const searchParams = useSearchParams();
  const prefilledEmail = (searchParams?.get("email") ?? "").trim();
  const showFallbackEmail = prefilledEmail.length === 0;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [testMode, setTestMode] = useState(false);

  useEffect(() => {
    setTestMode(isTestMode());
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const fallbackEmail = ((data.get("email_fallback") as string) ?? "").trim();

    if (!prefilledEmail && !fallbackEmail) {
      setLoading(false);
      setError("Please enter the email you used when you booked the call.");
      return;
    }

    const payload = {
      event: "precall_brief_submitted",
      email_hidden: prefilledEmail,
      email_fallback: fallbackEmail,
      product_description: ((data.get("product_description") as string) ?? "").trim(),
      video_goal: ((data.get("video_goal") as string) ?? "").trim(),
      video_platform: ((data.get("video_platform") as string) ?? "").trim(),
      client_deadline: ((data.get("client_deadline") as string) ?? "").trim(),
      reference_video: ((data.get("reference_video") as string) ?? "").trim(),
    };

    try {
      const res = await fetch(resolveWebhookUrl(BRIEF_WEBHOOK_URL), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Webhook responded with ${res.status}`);
    } catch {
      setLoading(false);
      setError("Something went wrong sending your brief. Please try again in a moment.");
      return;
    }

    if (posthog.__loaded) {
      posthog.capture("precall_brief_submitted");
    }

    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-white border border-[#E5E5E7] rounded-2xl p-8 text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#007AFF]/10 flex items-center justify-center">
          <svg className="w-6 h-6 text-[#007AFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#191919] mb-2">Brief received.</h3>
        <p className="text-[#4C4C4D] text-sm leading-relaxed">
          Thanks — we&apos;ll review your brief before the call so we can hit the ground running.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      {showFallbackEmail && (
        <div className="flex flex-col gap-1.5">
          <label htmlFor="pcb-fallback-email" className={labelCls}>
            Confirm your email <span className="text-[#007AFF]">*</span>
          </label>
          <input
            id="pcb-fallback-email"
            name="email_fallback"
            type="email"
            required
            placeholder="you@example.com"
            className={inputCls}
          />
          <p className="text-xs text-[#6E6E73]">
            Use the same email you booked the call with.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="pcb-description" className={labelCls}>
          Product description <span className="text-[#007AFF]">*</span>
        </label>
        <textarea
          id="pcb-description"
          name="product_description"
          rows={4}
          required
          placeholder="What does your product do, and who is it for?"
          className={`${inputCls} resize-none`}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="pcb-goal" className={labelCls}>
          Video goal <span className="text-[#007AFF]">*</span>
        </label>
        <select id="pcb-goal" name="video_goal" required defaultValue="" className={inputCls}>
          <option value="" disabled>Select...</option>
          {VIDEO_GOALS.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="pcb-platform" className={labelCls}>
          Video platform <span className="text-[#007AFF]">*</span>
        </label>
        <select id="pcb-platform" name="video_platform" required defaultValue="" className={inputCls}>
          <option value="" disabled>Select...</option>
          {VIDEO_PLATFORMS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="pcb-deadline" className={labelCls}>Hard deadline (optional)</label>
        <input
          id="pcb-deadline"
          name="client_deadline"
          type="date"
          className={inputCls}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="pcb-reference" className={labelCls}>Reference video URL (optional)</label>
        <input
          id="pcb-reference"
          name="reference_video"
          type="url"
          placeholder="https://..."
          className={inputCls}
        />
      </div>

      {error && (
        <div
          role="alert"
          className="text-sm text-[#B00020] bg-[#FFF0F2] border border-[#FFD6DC] rounded-xl px-4 py-3"
        >
          {error}
        </div>
      )}

      {testMode && (
        <div className="text-xs font-semibold text-[#B45309] bg-[#FEF3C7] border border-[#FDE68A] rounded-xl px-4 py-3">
          TEST MODE — POSTing to <code>/webhook-test/sop004-brief</code>. Make sure &quot;Listen for test event&quot; is active in n8n.
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#007AFF] text-white text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-[#1E6EF4] transition-colors duration-200 disabled:opacity-60 mt-2"
      >
        {loading ? "Submitting..." : "Submit Brief"}
      </button>
    </form>
  );
}
