"use client";

import { motion } from "framer-motion";
import ApplyForm from "@/components/sections/ApplyForm";

const stats = [
  {
    label: "Projects completed this month",
    value: "16",
    sub: "+3 this week",
    subColor: "#34C759",
    trend: "↑ 56.4%  Past 30 days",
    trendColor: "#34C759",
  },
  {
    label: "Average delivery time",
    value: "10",
    unit: " days",
    sub: "per project",
    subColor: "#98989A",
    trend: "Consistent",
    trendColor: "#98989A",
  },
  {
    label: "Satisfaction rate",
    value: "96%",
    sub: "↑ from last quarter",
    subColor: "#34C759",
    trend: "↑ 4%  vs last month",
    trendColor: "#34C759",
  },
  {
    label: "Avg revision rounds",
    value: "0.9",
    sub: "per project",
    subColor: "#98989A",
    trend: "Industry avg: 2.4",
    trendColor: "#98989A",
  },
];

export default function ContactForm() {
  return (
    <section className="py-10 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-[#007AFF] text-sm font-semibold uppercase tracking-widest mb-3">
              Apply to Work With Us
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#191919] leading-tight tracking-tight mb-4">
              Let&apos;s talk about your project.
            </h2>
            <p className="text-[#4C4C4D] leading-relaxed mb-8">
              Fill out a quick form and book a time directly. We will walk through your goals, the type of video you need, and what the process looks like from there.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white rounded-xl border border-[#E5E5E7] p-4 flex flex-col gap-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] text-[#98989A] leading-tight">{s.label}</span>
                    <span className="text-[10px] font-semibold whitespace-nowrap shrink-0" style={{ color: s.trendColor }}>
                      {s.trend}
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-[#191919] leading-none">
                    {s.value}{s.unit ?? ""}
                  </p>
                  <p className="text-xs font-semibold" style={{ color: s.subColor }}>
                    {s.sub}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="bg-white rounded-2xl border border-[#E6E6E6] p-6"
          >
            <ApplyForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
