"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Intake Form",
    description:
      "We send a structured intake form. You share your brief, brand assets, UI references (Figma links, screenshots), and inspiration videos. If you have a script ready, include it. If not, we write it together.",
  },
  {
    number: "02",
    title: "Storyboard and Script",
    description:
      "We build a full Figma storyboard and refine the script with you until the concept is locked. Every scene is mapped and approved before a single frame is animated.",
  },
  {
    number: "03",
    title: "Finalization Call",
    description:
      "A short call to walk through the storyboard together and confirm the creative direction is exactly right. No surprises once production begins.",
  },
  {
    number: "04",
    title: "Production",
    description:
      "Our team edits the full video: motion graphics, UI animation, sound design, and voiceover sync, all matched to your brand. Delivered within 10 business days of asset receipt.",
  },
  {
    number: "05",
    title: "One Revision Round and Delivery",
    description:
      "You review the draft via Frame.io and leave timestamped comments. We apply one round of revisions, then deliver the final file in your required format.",
  },
];

/* ── Mockup: Intake Form ── */
function IntakeMockup() {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E5E7] shadow-sm overflow-hidden">
      <div className="bg-[#007AFF] px-6 py-4">
        <p className="text-white text-xs font-semibold uppercase tracking-widest">Project Intake Form</p>
      </div>
      <div className="p-6 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <div className="h-3 w-16 bg-[#E5E5E7] rounded-full" />
            <div className="h-9 bg-[#F2F2F7] rounded-lg border border-[#E5E5E7]" />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="h-3 w-12 bg-[#E5E5E7] rounded-full" />
            <div className="h-9 bg-[#F2F2F7] rounded-lg border border-[#E5E5E7]" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="h-3 w-20 bg-[#E5E5E7] rounded-full" />
          <div className="h-9 bg-[#F2F2F7] rounded-lg border border-[#E5E5E7]" />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="h-3 w-28 bg-[#E5E5E7] rounded-full" />
          <div className="h-24 bg-[#F2F2F7] rounded-lg border border-[#E5E5E7]" />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="h-3 w-24 bg-[#E5E5E7] rounded-full" />
          <div className="h-9 bg-[#F2F2F7] rounded-lg border border-[#E5E5E7] flex items-center px-3 gap-2">
            <div className="w-4 h-4 rounded bg-[#E5E5E7]" />
            <div className="h-2.5 w-20 bg-[#D1D1D6] rounded-full" />
          </div>
        </div>
        <div className="h-10 bg-[#007AFF] rounded-xl flex items-center justify-center mt-1">
          <span className="text-white text-sm font-semibold">Submit</span>
        </div>
      </div>
    </div>
  );
}

/* ── Mockup: Storyboard ── */
const scenes = [
  { bg: "#2C2C2E", label: "Opening" },
  { bg: "#1C1C1E", label: "Problem" },
  { bg: "#2C2C2E", label: "Solution" },
  { bg: "#1C1C1E", label: "Feature 1" },
  { bg: "#2C2C2E", label: "Feature 2" },
  { bg: "#1C1C1E", label: "CTA" },
];

function StoryboardMockup() {
  return (
    <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-sm">
      {/* Figma toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#2C2C2E] border-b border-[#3A3A3C]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[#98989A] text-xs font-medium">DNYX — Storyboard v2.fig</span>
        <div className="flex items-center gap-1.5">
          <div className="h-5 w-14 bg-[#007AFF] rounded text-white text-[10px] flex items-center justify-center font-semibold">Share</div>
        </div>
      </div>
      {/* Canvas */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-[#98989A] text-xs">Page 1</div>
          <div className="w-px h-3 bg-[#3A3A3C]" />
          <div className="text-white text-xs font-medium">Storyboard</div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {scenes.map((s, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <div
                className="aspect-video rounded-lg border border-[#3A3A3C] flex flex-col items-center justify-center gap-1"
                style={{ backgroundColor: s.bg }}
              >
                <div className="w-8 h-1 bg-[#48484A] rounded-full" />
                <div className="w-6 h-1 bg-[#48484A] rounded-full" />
                <div className="w-10 h-1 bg-[#48484A] rounded-full" />
              </div>
              <span className="text-[#98989A] text-[10px] text-center">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Mockup: Finalization Call ── */
const participants = [
  { name: "Danny · Dnyxstudios", muted: false, active: true },
  { name: "Alex · Client", muted: true, active: false },
  { name: "Jordan · Client", muted: false, active: false },
];

function FinalizationMockup() {
  return (
    <div className="bg-[#202124] rounded-2xl overflow-hidden shadow-sm">
      {/* Meet header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#3C4043]">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[#34A853] flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14l4-4h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
          </div>
          <span className="text-white text-xs font-medium">Finalization Call · Dnyxstudios</span>
        </div>
        <span className="text-[#9AA0A6] text-xs">15:24</span>
      </div>
      {/* Participants grid */}
      <div className="grid grid-cols-3 gap-2 p-4">
        {participants.map((p, i) => (
          <div
            key={i}
            className={cn(
              "aspect-video rounded-xl flex flex-col items-center justify-center gap-2 relative border",
              p.active ? "border-[#34A853]" : "border-[#3C4043]",
              "bg-[#2D2E30]"
            )}
          >
            <div className="w-10 h-10 rounded-full bg-[#4A4A4A] flex items-center justify-center">
              <span className="text-white text-sm font-bold">{p.name[0]}</span>
            </div>
            <span className="text-[#9AA0A6] text-[9px] text-center px-1 leading-tight">{p.name.split("·")[0].trim()}</span>
            {p.muted && (
              <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#EA4335] flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-sm" />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Controls */}
      <div className="flex items-center justify-center gap-3 py-4 px-5 border-t border-[#3C4043]">
        <div className="w-10 h-10 rounded-full bg-[#3C4043] flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#3C4043] flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
        </div>
        <div className="w-12 h-10 rounded-full bg-[#EA4335] flex items-center justify-center">
          <svg className="w-4 h-4 text-white rotate-[135deg]" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#3C4043] flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
        </div>
      </div>
    </div>
  );
}

/* ── Mockup: Production / Video Editor ── */
const tracks = [
  { color: "#007AFF", label: "Motion Graphics", width: "75%" },
  { color: "#34C759", label: "Voiceover", width: "60%" },
  { color: "#FF9500", label: "Music", width: "90%" },
  { color: "#AF52DE", label: "SFX", width: "45%" },
];

function ProductionMockup() {
  return (
    <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-sm">
      {/* Preview */}
      <div className="relative aspect-video bg-[#000] flex items-center justify-center border-b border-[#2C2C2E]">
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
          <svg className="w-5 h-5 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <span className="absolute bottom-2 right-3 text-[#98989A] text-[10px] font-mono">00:34 / 01:45</span>
        <div className="absolute bottom-2 left-3 right-16 h-0.5 bg-[#3A3A3C] rounded-full">
          <div className="h-full w-[30%] bg-[#007AFF] rounded-full" />
        </div>
      </div>
      {/* Timeline */}
      <div className="p-4 flex flex-col gap-2">
        {tracks.map((t) => (
          <div key={t.label} className="flex items-center gap-3">
            <span className="text-[#98989A] text-[9px] w-20 shrink-0 truncate">{t.label}</span>
            <div className="flex-1 h-5 bg-[#2C2C2E] rounded-md overflow-hidden">
              <div
                className="h-full rounded-md opacity-80"
                style={{ width: t.width, backgroundColor: t.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Mockup: Revision Round ── */
const comments = [
  { name: "Alex M.", time: "0:15", text: "Can we nudge the logo slightly to the left here?", replies: 1, date: "MON · 12 MAY" },
  { name: "Jordan K.", time: "0:42", text: "Love this transition — keep exactly as is.", replies: 0, date: null },
  { name: "Alex M.", time: "1:14", text: "The headline text feels a touch small. Can we go up one size?", replies: 2, date: "TUE · 13 MAY" },
  { name: "Jordan K.", time: "1:38", text: "Sound design is perfect. No notes.", replies: 0, date: null },
];

function RevisionMockup() {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E5E7] shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E5E5E7]">
        <span className="text-sm font-bold text-[#191919]">Revision Comments</span>
        <span className="text-xs font-semibold text-[#007AFF] bg-[#007AFF]/10 px-2 py-0.5 rounded-full">4 comments</span>
      </div>
      <div className="flex flex-col divide-y divide-[#F2F2F7]">
        {comments.map((c, i) => (
          <div key={i}>
            {c.date && (
              <div className="flex items-center justify-between px-5 py-2 bg-[#F8F9FA]">
                <span className="text-[10px] font-semibold text-[#98989A] uppercase tracking-wide">{c.date.split("·")[0].trim()}</span>
                <span className="text-[10px] text-[#98989A]">{c.date.split("·")[1]?.trim()}</span>
              </div>
            )}
            <div className="flex items-start gap-3 px-5 py-3.5">
              <div className="w-8 h-8 rounded-full bg-[#E6E6E6] shrink-0 flex items-center justify-center">
                <span className="text-[10px] font-bold text-[#4C4C4D]">{c.name[0]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs font-semibold text-[#191919]">{c.name}</span>
                  <span className="text-[10px] text-[#007AFF] font-mono font-semibold">{c.time}</span>
                </div>
                <p className="text-xs text-[#4C4C4D] leading-relaxed">{c.text}</p>
                {c.replies > 0 && (
                  <span className="text-[10px] text-[#98989A] mt-1 inline-block">{c.replies} {c.replies === 1 ? "reply" : "replies"}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const mockups = [
  <IntakeMockup key="intake" />,
  <StoryboardMockup key="storyboard" />,
  <FinalizationMockup key="finalization" />,
  <ProductionMockup key="production" />,
  <RevisionMockup key="revision" />,
];

export default function ProcessSteps() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-10 lg:px-16">
        <div className="mb-8">
          <p className="text-[#007AFF] text-sm font-semibold uppercase tracking-widest mb-3">
            How It Works
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#191919] leading-tight tracking-tight">
            Five steps from brief to final file
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Step list */}
          <div className="flex flex-col gap-2">
            {steps.map((step, i) => (
              <button
                key={step.title}
                onClick={() => setActive(i)}
                className={cn(
                  "w-full text-left rounded-2xl px-5 py-4 transition-all duration-200 focus:outline-none",
                  active === i
                    ? "bg-[#007AFF] shadow-md"
                    : "bg-[#F8F9FA] hover:bg-[#F0F0F7]"
                )}
              >
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0",
                      active === i
                        ? "bg-white/20 text-white"
                        : "bg-[#007AFF]/10 text-[#007AFF]"
                    )}
                  >
                    {step.number}
                  </span>
                  <h3
                    className={cn(
                      "text-base font-bold",
                      active === i ? "text-white" : "text-[#191919]"
                    )}
                  >
                    {step.title}
                  </h3>
                </div>
                <AnimatePresence initial={false}>
                  {active === i && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-white/80 text-sm leading-relaxed pl-11 overflow-hidden"
                    >
                      {step.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>

          {/* Right: Mockup panel */}
          <div className="lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              >
                {mockups[active]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
