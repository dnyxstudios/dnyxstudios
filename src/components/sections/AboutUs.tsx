"use client";

import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function AboutUs() {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-10 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ staggerChildren: 0.12 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            <p className="text-[#007AFF] text-sm font-semibold uppercase tracking-widest">
              About Dnyxstudios
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#191919] leading-tight tracking-tight">
              We built this for founders, not agencies
            </h2>
            <p className="text-[#4C4C4D] leading-relaxed text-lg">
              Dnyxstudios was created because most video agencies are built for
              enterprise clients with six figure budgets, six week timelines,
              and endless kickoff calls.
            </p>
            <p className="text-[#4C4C4D] leading-relaxed">
              We do it differently. Our process is lean, async, and optimized
              for founders who are already running at full speed. You fill out a
              form. We produce world class motion graphics. You get a video that
              makes your product look like it belongs on a Series A pitch deck.
            </p>
            <p className="text-[#4C4C4D] leading-relaxed">
              We understand SaaS. We understand your users, your metrics, and
              what it takes to get someone to stop scrolling and click
              &ldquo;sign up.&rdquo; That understanding shows in every frame we produce.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 gap-5"
          >
            {[
              { stat: "50+", label: "Videos Delivered" },
              { stat: "2 wks", label: "Average Turnaround" },
              { stat: "100%", label: "Client Satisfaction" },
              { stat: "$0", label: "Briefing Call Cost" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-[#F8F9FA] rounded-2xl p-6 border border-[#E6E6E6] flex flex-col gap-1"
              >
                <span className="text-3xl font-bold text-[#007AFF]">
                  {item.stat}
                </span>
                <span className="text-sm text-[#4C4C4D] font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
