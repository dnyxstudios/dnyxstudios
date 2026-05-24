"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";
import { isTestMode, resolveWebhookUrl } from "@/lib/webhook";

const QUALIFICATION_WEBHOOK_URL =
  "https://n8n.srv1617364.hstgr.cloud/webhook/sop004-qualification";
const CAL_BOOKING_URL = "https://cal.com/dnyxstudios/video-edit-launch";

const BUDGET_OPTIONS = [
  "Less than $800",
  "$800-$1,500",
  "$1,500-$3,000",
  "$3,000-$4,500",
  "$4,500+",
] as const;

const UNQUALIFIED_BUDGETS: readonly string[] = ["Less than $800"];

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-[#E5E5E7] bg-white text-[#191919] text-sm placeholder:text-[#98989A] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/30 focus:border-[#007AFF] transition-colors";
const labelCls = "text-sm font-semibold text-[#191919]";

interface ApplyFormProps {
  onSuccess?: () => void;
}

export default function ApplyForm({ onSuccess }: ApplyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testMode, setTestMode] = useState(false);

  useEffect(() => {
    setTestMode(isTestMode());
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const fullName = ((data.get("full_name") as string) ?? "").trim();
    const email = ((data.get("email") as string) ?? "").trim();
    const budget = (data.get("budget") as string) ?? "";

    const source =
      typeof window !== "undefined"
        ? new URL(window.location.href).searchParams.get("source") ?? ""
        : "";

    const payload = {
      event: "qualification_form_submitted",
      full_name: fullName,
      email,
      budget,
      source,
    };

    try {
      const res = await fetch(resolveWebhookUrl(QUALIFICATION_WEBHOOK_URL), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Webhook responded with ${res.status}`);
    } catch {
      setLoading(false);
      setError("Something went wrong sending your application. Please try again in a moment.");
      return;
    }

    const qualified = !UNQUALIFIED_BUDGETS.includes(budget);
    if (posthog.__loaded) {
      posthog.capture("qualification_submitted", { budget, qualified });
    }

    onSuccess?.();
    if (!qualified) {
      router.push("/not-a-fit");
    } else {
      const calUrl = `${CAL_BOOKING_URL}?name=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}`;
      window.location.href = calUrl;
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      <div className="flex flex-col gap-1.5">
        <label htmlFor="af-name" className={labelCls}>Full Name <span className="text-[#007AFF]">*</span></label>
        <input id="af-name" name="full_name" type="text" required placeholder="Your name" className={inputCls} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="af-email" className={labelCls}>Email <span className="text-[#007AFF]">*</span></label>
        <input id="af-email" name="email" type="email" required placeholder="you@example.com" className={inputCls} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="af-budget" className={labelCls}>Budget <span className="text-[#007AFF]">*</span></label>
        <select id="af-budget" name="budget" required defaultValue="" className={inputCls}>
          <option value="" disabled>Select...</option>
          {BUDGET_OPTIONS.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>

      <p className="text-xs text-[#6E6E73] leading-relaxed">
        Qualified projects go straight to our booking page. Use the same email there so we can match your details.
      </p>

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
          TEST MODE — POSTing to <code>/webhook-test/sop004-qualification</code>. Make sure &quot;Listen for test event&quot; is active in n8n.
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#007AFF] text-white text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-[#1E6EF4] transition-colors duration-200 disabled:opacity-60 mt-2"
      >
        {loading ? "Submitting..." : "Apply for a Project"}
      </button>

    </form>
  );
}
