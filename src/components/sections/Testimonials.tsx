"use client";

import { motion, type Variants } from "framer-motion";
import { StarIcon } from "@heroicons/react/24/solid";

const testimonials = [
  {
    name: "Andrew",
    handle: "@adlabs",
    avatar: "/Testimonial-pfp/Andrew.jpg",
    quote: "Awesome. Thanks, love your work man, appreciate you getting things across the finish line for us.",
  },
  {
    name: "Matthias",
    handle: "@editwithava",
    avatar: "/Testimonial-pfp/Matthias.jpg",
    quote: "really really happy with how the video turned out. high-quality work and quick turnaround 🙏",
  },
  {
    name: "Mordehai",
    handle: "@tracebackusa",
    avatar: "/Testimonial-pfp/Mordehai.jpg",
    quote: "Done mate 🙏 amazing work man, really liked it, and appreciate you for letting Yochai watch you work and learn, great experience and amazing results👑",
  },
];

function StarRating() {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} className="w-4 h-4 text-[#FFB400]" />
      ))}
    </div>
  );
}

function XIcon() {
  return (
    <svg className="w-4 h-4 text-[#C7C7CC]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Testimonials() {
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
          <motion.div variants={fadeUp}>
            <span className="inline-block bg-white border border-[#E5E5E7] text-[#4C4C4D] text-xs font-semibold px-3 py-1 rounded-full mb-4">
              Testimonials
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#191919] leading-tight tracking-tight">
              Trusted by SaaS founders
              <br />
              <span className="text-[#007AFF] font-bold">who needed results fast.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-[#E5E5E7] p-6 flex flex-col gap-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                      onError={(e) => {
                        const el = e.target as HTMLImageElement;
                        el.style.display = "none";
                        el.parentElement!.insertAdjacentHTML(
                          "afterbegin",
                          `<div class="w-10 h-10 rounded-full bg-[#E6E6E6] shrink-0 flex items-center justify-center text-xs font-bold text-[#4C4C4D]">${t.name[0]}</div>`
                        );
                      }}
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#191919] leading-none">{t.name}</p>
                      <p className="text-xs text-[#98989A] mt-0.5">{t.handle}</p>
                    </div>
                  </div>
                  <XIcon />
                </div>

                <p className="flex-1 text-[#191919] text-sm leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="pt-3 border-t border-[#F2F2F7]">
                  <StarRating />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
