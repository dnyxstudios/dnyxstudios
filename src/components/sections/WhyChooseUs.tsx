"use client";

import { motion, type Variants } from "framer-motion";
import {
  ClockIcon,
  DocumentCheckIcon,
  ArrowPathIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

const reasons = [
  {
    icon: ClockIcon,
    stat: "Under 10 business days",
    title: "From asset receipt to final file",
    description:
      "Once we have your assets, we deliver the finished video within 10 business days. No delays, no scope creep, just results.",
  },
  {
    icon: DocumentCheckIcon,
    stat: "Aligned before production",
    title: "Storyboard approved before we touch a frame",
    description:
      "We build a full Figma storyboard and walk you through it on a short finalization call. Once you approve, we execute exactly that. No surprises mid-production.",
  },
  {
    icon: ArrowPathIcon,
    stat: "One revision round",
    title: "Clean process, clean feedback",
    description:
      "We do the hard thinking upfront so revisions stay minimal. One round of changes via Frame.io timestamped comments. That is all you need.",
  },
  {
    icon: BuildingOfficeIcon,
    stat: "Series A quality",
    title: "At a seed stage budget",
    description:
      "Our videos make early stage SaaS products look like they have raised a Series A. Premium output at a fraction of what agencies charge.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function WhyChooseUs() {
  return (
    <section className="py-10 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-10 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.1 }}
          className="flex flex-col gap-8"
        >
          <motion.div variants={fadeUp} className="max-w-2xl">
            <p className="text-[#007AFF] text-sm font-semibold uppercase tracking-widest mb-3">
              Why Dnyxstudios
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#191919] leading-tight tracking-tight">
              Built for founders who are already doing too much
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                variants={fadeUp}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-8 flex flex-col gap-4 border border-[#E6E6E6] hover:border-[#007AFF]/30 transition-colors duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#007AFF]/10 flex items-center justify-center shrink-0">
                    <r.icon className="w-5 h-5 text-[#007AFF]" />
                  </div>
                  <span className="text-sm font-semibold text-[#007AFF]">
                    {r.stat}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#191919]">{r.title}</h3>
                <p className="text-[#4C4C4D] leading-relaxed">{r.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
