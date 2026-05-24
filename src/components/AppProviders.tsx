"use client";

import type { ReactNode } from "react";
import { ApplyModalProvider, useApplyModal } from "@/contexts/ApplyModalContext";
import ApplyModal from "@/components/ApplyModal";

function FloatingApplyButton() {
  const { setOpen } = useApplyModal();
  return (
    <button
      onClick={() => setOpen(true)}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#007AFF] text-white text-sm font-semibold px-5 py-3 rounded-full shadow-lg hover:bg-[#1E6EF4] transition-colors duration-200"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      Apply for a Project
    </button>
  );
}

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ApplyModalProvider>
      {children}
      <ApplyModal />
      <FloatingApplyButton />
    </ApplyModalProvider>
  );
}
