import type { Metadata } from "next";
import Portfolio from "@/components/sections/Portfolio";

export const metadata: Metadata = {
  title: "Our Work — Dnyxstudios",
  description:
    "Motion graphics projects we have produced for early stage SaaS companies.",
};

export default function WorksPage() {
  return <Portfolio />;
}
