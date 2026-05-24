"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SimpleContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data as any).toString(),
    }).catch(() => {});

    setLoading(false);
    setSubmitted(true);
  }

  return (
    <section className="min-h-[calc(100vh-64px)] bg-[#F8F9FA] flex items-center justify-center px-6 py-16">
      <div className="max-w-lg w-full">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center"
          >
            <div className="w-14 h-14 rounded-full bg-[#34C759]/15 flex items-center justify-center mx-auto mb-6">
              <svg className="w-7 h-7 text-[#34C759]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#191919] mb-3">Message received</h2>
            <p className="text-[#4C4C4D] leading-relaxed mb-8">
              We have received your message and will get back to you as soon as possible.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#191919] text-white text-sm font-semibold px-5 py-3 rounded-full hover:bg-[#333333] transition-colors duration-200"
            >
              Back to Home
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <p className="text-[#007AFF] text-sm font-semibold uppercase tracking-widest mb-3">
              Contact
            </p>
            <h1 className="text-4xl font-bold text-[#191919] leading-tight tracking-tight mb-8">
              Get in touch
            </h1>

            <form
              name="contact"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              <input type="hidden" name="form-name" value="contact" />

              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-semibold text-[#191919]">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E5E7] bg-white text-[#191919] text-sm placeholder:text-[#98989A] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/30 focus:border-[#007AFF] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-semibold text-[#191919]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E5E7] bg-white text-[#191919] text-sm placeholder:text-[#98989A] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/30 focus:border-[#007AFF] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-semibold text-[#191919]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us what you have in mind..."
                  className="w-full px-4 py-3 rounded-xl border border-[#E5E5E7] bg-white text-[#191919] text-sm placeholder:text-[#98989A] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/30 focus:border-[#007AFF] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#007AFF] text-white text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-[#1E6EF4] transition-colors duration-200 disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
}
