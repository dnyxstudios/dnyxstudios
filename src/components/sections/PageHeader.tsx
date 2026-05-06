"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function PageHeader({ label, title, subtitle }: PageHeaderProps) {
  return (
    <section className="pt-24 pb-6 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl flex flex-col gap-4"
        >
          <p className="text-[#007AFF] text-sm font-semibold uppercase tracking-widest">
            {label}
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#191919] leading-tight tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg text-[#4C4C4D] leading-relaxed max-w-2xl">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
