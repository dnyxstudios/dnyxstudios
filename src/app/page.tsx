import Hero from "@/components/sections/Hero";
import ServicesList from "@/components/sections/ServicesList";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ProcessSteps from "@/components/sections/ProcessSteps";
import Testimonials from "@/components/sections/Testimonials";
import ContactForm from "@/components/sections/ContactForm";
import FAQ from "@/components/sections/FAQ";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesList />
      <WhyChooseUs />
      <ProcessSteps />
      <Testimonials />
      <ContactForm />
      <FAQ />
    </>
  );
}
