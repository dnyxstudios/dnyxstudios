"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How does your process work?",
    a: "After your 60% deposit, we send a structured intake form where you share your brief, brand assets, UI references (Figma links or screenshots), and any inspiration videos. Script is optional at this stage. We then build a full Figma storyboard and refine the script with you. Before production begins, we hop on a short finalization call to confirm everything looks right. We then edit the full video, you get one revision round via Frame.io, and we deliver the final file.",
  },
  {
    q: "How long does a video take to produce?",
    a: "Each video is delivered within 10 business days of receiving your completed assets. Rush delivery in 5 business days is available for an additional flat fee.",
  },
  {
    q: "What do you need from us to get started?",
    a: "Your brief, brand assets (logo, fonts, colors, brand guidelines), any UI references such as Figma links or screenshots of your product, and inspiration videos that match the style you are after. A script is optional. If you do not have one, we will write it together.",
  },
  {
    q: "How many revisions are included?",
    a: "One revision round is included on every project. You review the draft via Frame.io and leave timestamped comments. We apply your changes and deliver the final file. Additional revision rounds are available for a flat fee.",
  },
  {
    q: "What does it cost?",
    a: "Project-based pricing runs from $800 to $5,500 per video depending on complexity and the editor assigned. Retainer plans start at $6,000 per month for four videos per month with priority turnaround. Get in touch for a quote.",
  },
  {
    q: "Do you work with early stage startups?",
    a: "Yes. We built this service specifically for pre Series A SaaS companies that need premium looking content without enterprise budgets or long agency timelines.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#E6E6E6] last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span
          className={cn(
            "text-base font-medium transition-colors",
            open ? "text-[#007AFF]" : "text-[#191919] group-hover:text-[#007AFF]"
          )}
        >
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDownIcon className="w-5 h-5 text-[#98989A]" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[#4C4C4D] leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-[#007AFF] text-sm font-semibold uppercase tracking-widest mb-3">
              FAQ
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#191919] leading-tight tracking-tight">
              Questions we get asked a lot
            </h2>
            <p className="mt-4 text-[#4C4C4D] leading-relaxed">
              Still have questions?{" "}
              <Link
                href="/contact"
                className="text-[#007AFF] hover:underline"
              >
                Get in touch
              </Link>
              .
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            {faqs.map((f) => (
              <FAQItem key={f.q} q={f.q} a={f.a} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
