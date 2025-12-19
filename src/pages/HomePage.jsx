// HomePage.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import HeroSection from "../components/Hersection";
import AboutSection from "./AboutPage";

import ContactPage from "./ContactPage";
import ServicesSection from "../components/ServiceSection";
import WhyChooseUs from "../components/WhyChooseUs";
import TestimonialsSection from "../components/TestimonialsSection";
import ServiceHighlights from "../components/ServiceHighlights";
import FaqSection from "../components/FaqSection";
import ComfortCtaSection from "../components/ComfortCtaSection";
import WorkProcessSection from "../components/WorkProcessSection";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const target = location.state?.scrollTo;
    if (target) {
      // wait for sections to render
      requestAnimationFrame(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [location.state]);

  return (
    <>
      {/* <section id="home"></section> */}
      <HeroSection />
      <ServicesSection />
      <WhyChooseUs />
      <ServiceHighlights />
      <TestimonialsSection />
      <WorkProcessSection />
      <FaqSection />
      {/* <ComfortCtaSection /> */}
      
      {/* <section id="services"><ServicesPage /></section>
      <section id="about"><AboutSection /></section> */}
     
      
      {/* <section id="contact"><ContactPage /></section> */}
      
    </>
  );
}
