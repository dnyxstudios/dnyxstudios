import type { Metadata } from "next";
import ServicesList from "@/components/sections/ServicesList";
import CTABanner from "@/components/sections/CTABanner";
import PageHeader from "@/components/sections/PageHeader";

export const metadata: Metadata = {
  title: "Services — Dnyxstudios",
  description:
    "Motion graphics services for SaaS companies: product demos, explainer videos, social ads, and onboarding sequences.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        label="Services"
        title="Every type of video your SaaS needs"
        subtitle="From product launches to onboarding sequences. We cover every stage of your customer journey."
      />
      <ServicesList />
      <CTABanner
        headline="Ready to get your first video?"
        subtext="Start your project today and have your video delivered in under 2 weeks."
      />
    </>
  );
}
