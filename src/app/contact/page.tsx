import type { Metadata } from "next";
import SimpleContactForm from "@/components/sections/SimpleContactForm";

export const metadata: Metadata = {
  title: "Contact — Dnyxstudios",
  description:
    "Get in touch with Dnyxstudios. Send us a message and we will get back to you as soon as possible.",
};

export default function ContactPage() {
  return <SimpleContactForm />;
}
