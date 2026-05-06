"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";

const projects = [
  {
    video: "/Portfolio/attio-example.mp4",
    title: "Attio Explainer",
    description: "30 second explainer for Attio CRM",
  },
  {
    video: "/Portfolio/explainer-example.mp4",
    title: "Google Drive Explainer",
    description: "30 second explainer for Google Drive",
  },
  {
    video: "/Portfolio/onboarding-sequence-example.mp4",
    title: "Blabber AI Video",
    description: "50 second UI animation for Blabber AI",
  },
  {
    video: "/Portfolio/revolut-example.mp4",
    title: "Revolut Explainer",
    description: "30 second explainer for Revolut",
  },
  {
    video: "/Portfolio/saas-demo-example.mp4",
    title: "AdLabs UI Animation",
    description: "25 second UI Animation for AdLabs",
  },
  {
    video: "/Portfolio/vsl-example.mp4",
    title: "Engain VSL",
    description: "3 minute VSL for engain.io",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function VideoCard({ item }: { item: typeof projects[number] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const seek = () => {
      if (!playing && v.currentTime < 1) v.currentTime = 1;
    };
    if (v.readyState >= 1) seek();
    else v.addEventListener("loadedmetadata", seek, { once: true });
    return () => v.removeEventListener("loadedmetadata", seek);
  }, [playing]);

  function handlePlay() {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play();
    setPlaying(true);
  }

  function handleEnded() {
    setPlaying(false);
    const v = videoRef.current;
    if (v) v.currentTime = 1;
  }

  return (
    <div className="rounded-[20px] overflow-hidden border border-[#E5E5E7] shadow-sm flex flex-col bg-white">
      <div className="relative w-full">
        <video
          ref={videoRef}
          src={item.video}
          muted
          playsInline
          preload="metadata"
          onEnded={handleEnded}
          className="w-full aspect-video object-cover"
        />

        {!playing && (
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors duration-200"
            aria-label={`Play ${item.title}`}
          >
            <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-[#191919] translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}
      </div>

      <div className="px-5 py-4 bg-[#F8F9FA] flex flex-col gap-1">
        <h3 className="text-base font-bold text-[#191919] leading-snug">
          {item.title}
        </h3>
        <p className="text-sm text-[#4C4C4D] leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function Portfolio() {
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
              Our Work
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#191919] leading-tight tracking-tight">
              Videos that made SaaS products look inevitable
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {projects.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                transition={{ delay: i * 0.08 }}
              >
                <VideoCard item={item} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
