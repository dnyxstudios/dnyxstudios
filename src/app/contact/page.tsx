import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";
import FAQ from "@/components/sections/FAQ";
import PageHeader from "@/components/sections/PageHeader";

export const metadata: Metadata = {
  title: "Contact — Dnyxstudios",
  description:
    "Start your motion graphics project. Tell us about your product and goals and we will be back within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact"
        title="Let us build something great together"
        subtitle="Tell us about your product and goals. We will respond within 24 hours with a plan and pricing."
      />
      <ContactForm />
      <FAQ />
    </>
  );
}
