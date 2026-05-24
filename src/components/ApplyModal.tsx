"use client";

import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useApplyModal } from "@/contexts/ApplyModalContext";
import ApplyForm from "@/components/sections/ApplyForm";

export default function ApplyModal() {
  const { open, setOpen } = useApplyModal();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <motion.div
            key="modal-card"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 pt-5 pb-3 border-b border-[#F0F0F0]">
              <h2 className="text-lg font-bold text-[#191919]">Apply for a Project</h2>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#F5F5F5] transition-colors"
                aria-label="Close"
              >
                <XMarkIcon className="w-5 h-5 text-[#4C4C4D]" />
              </button>
            </div>

            <div className="px-6 py-5">
              <ApplyForm onSuccess={() => setOpen(false)} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
