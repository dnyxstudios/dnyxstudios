"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "/" },
  { label: "Our Work", href: "/works" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-[#E6E6E6] shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-10 lg:px-16 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-[#191919] tracking-tight">
          Dnyxstudios
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  pathname === l.href
                    ? "text-[#007AFF]"
                    : "text-[#4C4C4D] hover:text-[#191919]"
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button
            size="sm"
            data-cal-link="forms/a6ec7dce-a533-4f8f-a563-3a0f33e8b0ca"
            data-cal-namespace="apply"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light"}'
          >
            Get Started
          </Button>
        </div>

        <button
          className="md:hidden p-2 rounded-md text-[#191919]"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="md:hidden bg-white border-b border-[#E6E6E6] px-6 pb-6 pt-2"
          >
            <ul className="flex flex-col gap-4">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      "text-base font-medium",
                      pathname === l.href ? "text-[#007AFF]" : "text-[#191919]"
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Button
                  size="sm"
                  className="w-full"
                  data-cal-link="dnyxstudios/video-edit-launch"
                  data-cal-namespace="video-edit-launch"
                  data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                >
                  Get Started
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
