"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

const ApplyModalContext = createContext({
  open: false,
  setOpen: (_: boolean) => {},
});

export function ApplyModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <ApplyModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ApplyModalContext.Provider>
  );
}

export function useApplyModal() {
  return useContext(ApplyModalContext);
}
