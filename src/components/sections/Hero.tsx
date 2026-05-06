"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon, StarIcon } from "@heroicons/react/24/solid";
import Button from "@/components/ui/Button";

const testimonials = [
  {
    quote: "Awesome. Thanks, love your work man, appreciate you getting things across the finish line for us.",
    name: "Andrew",
    handle: "@adlabs",
    avatar: "/Testimonial-pfp/Andrew.jpg",
  },
  {
    quote: "really really happy with how the video turned out. high-quality work and quick turnaround 🙏",
    name: "Matthias",
    handle: "@editwithava",
    avatar: "/Testimonial-pfp/Matthias.jpg",
  },
  {
    quote: "Done mate 🙏 amazing work man, really liked it, and appreciate you for letting Yochai watch you work and learn, great experience and amazing results👑",
    name: "Mordehai",
    handle: "@tracebackusa",
    avatar: "/Testimonial-pfp/Mordehai.jpg",
  },
];

const companies = [
  "Edit With Ava", "Trade Work Sation", "Interqo", "Engain.io",
  "Blabber AI", "AdLabs", "ProPickz", "Excela", "The Rumor",
];

function StarRating() {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} className="w-3.5 h-3.5 text-[#FFB400]" />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  delay,
  className,
}: {
  testimonial: (typeof testimonials)[0];
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={`bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-[#F0F0F0] p-5 w-[280px] ${className ?? ""}`}
    >
      <StarRating />
      <p className="mt-2.5 text-sm text-[#333333] leading-relaxed">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-3.5 flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-8 h-8 rounded-full object-cover shrink-0"
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        <div>
          <p className="text-sm font-semibold text-[#191919] leading-none">{testimonial.name}</p>
          <p className="text-xs text-[#98989A] mt-0.5">{testimonial.handle}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative bg-[#F8F9FA] overflow-hidden pt-16">
      <div className="max-w-7xl mx-auto px-10 lg:px-16 w-full py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — copy */}
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.1 }}
            className="flex flex-col gap-4"
          >
            {/* Badge */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 bg-white border border-[#E6E6E6] text-[#4C4C4D] text-sm font-medium px-4 py-1.5 rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#007AFF] shrink-0" />
                Helping SaaS Founders Grow
                <ArrowRightIcon className="w-3.5 h-3.5 text-[#007AFF]" />
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="text-[42px] sm:text-[52px] font-bold text-[#191919] leading-[1.1] tracking-tight"
            >
              Motion Graphics that Make You
              <br />
              <span className="text-[#007AFF]">Impossible to Ignore</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="text-base text-[#4C4C4D] leading-relaxed max-w-md"
            >
              We help early stage SaaS founders get premium motion graphics
              videos produced, revised, and delivered in under 2 weeks. No
              briefing calls. No back and forth.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-start gap-3 mt-1"
            >
              <Button
                size="md"
                className="rounded-xl"
                data-cal-link="forms/a6ec7dce-a533-4f8f-a563-3a0f33e8b0ca"
                data-cal-namespace="apply"
                data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light"}'
              >
                Start Your Project
              </Button>
              <a
                href="/works"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-[#191919] border border-[#E6E6E6] rounded-xl bg-white hover:border-[#007AFF] hover:text-[#007AFF] transition-colors"
              >
                View Our Work
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </a>
            </motion.div>

            {/* Trust bar — scrolling marquee */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col gap-2 pt-1"
            >
              <p className="text-xs text-[#98989A] uppercase tracking-wide font-medium">
                Trusted by SaaS teams at
              </p>
              <div className="overflow-hidden w-full">
                <div className="flex items-center gap-10 animate-marquee w-max">
                  {[...companies, ...companies].map((name, i) => (
                    <span
                      key={i}
                      className="text-sm font-bold text-[#4C4C4D] tracking-tight opacity-50 whitespace-nowrap shrink-0"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — floating testimonial cards */}
          <div className="hidden lg:flex relative h-[480px] items-center justify-center">
            <div className="absolute top-0 left-0 rotate-[-2deg]">
              <TestimonialCard testimonial={testimonials[0]} delay={0.3} />
            </div>
            <div className="absolute top-[140px] right-0 z-10 rotate-[1.5deg]">
              <TestimonialCard testimonial={testimonials[1]} delay={0.45} />
            </div>
            <div className="absolute bottom-0 left-[30px] rotate-[-1deg]">
              <TestimonialCard testimonial={testimonials[2]} delay={0.6} />
            </div>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] bg-[#007AFF]/6 rounded-full blur-[80px]" />
            </div>
          </div>

          {/* Mobile testimonials — stacked */}
          <div className="flex lg:hidden flex-col gap-3">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} testimonial={t} delay={0.2 + i * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
