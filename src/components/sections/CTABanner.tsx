"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { useApplyModal } from "@/contexts/ApplyModalContext";

interface CTABannerProps {
  headline?: string;
  subtext?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTABanner({
  headline = "Ready to look like you have raised a Series A?",
  subtext = "Get your first premium motion graphics video delivered in under 2 weeks. No calls. No waiting. Just results.",
  primaryLabel = "Start Your Project",
  primaryHref = "/contact",
  secondaryLabel = "View Our Work",
  secondaryHref = "/works",
}: CTABannerProps) {
  const { setOpen } = useApplyModal();
  return (
    <section className="py-10 bg-[#007AFF] overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-white/10 rounded-full blur-[80px]" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight">
            {headline}
          </h2>
          <p className="text-lg text-white/80 max-w-xl leading-relaxed">
            {subtext}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Button variant="white" size="lg" onClick={() => setOpen(true)}>
              {primaryLabel}
            </Button>
            <a
              href={secondaryHref}
              className="text-white/80 hover:text-white text-base font-medium underline underline-offset-2 transition-colors"
            >
              {secondaryLabel}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
