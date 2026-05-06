import type { Metadata } from "next";
import AboutUs from "@/components/sections/AboutUs";
import CTABanner from "@/components/sections/CTABanner";
import PageHeader from "@/components/sections/PageHeader";

export const metadata: Metadata = {
  title: "About — Dnyxstudios",
  description:
    "We are a motion graphics studio built specifically for early stage SaaS companies.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About Us"
        title="We built this for founders, not agencies"
        subtitle="Dnyxstudios is a motion graphics studio built from the ground up for SaaS companies that need to look bigger than they are."
      />
      <AboutUs />
      <CTABanner
        headline="Want to work with us?"
        subtext="Get your first premium motion graphics video delivered in under 2 weeks."
        secondaryLabel="See Our Process"
        secondaryHref="/process"
      />
    </>
  );
}
