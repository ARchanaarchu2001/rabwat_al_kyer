// src/components/services/ServicesSection.jsx
import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
  SERVICE_CARDS,
  BG_SECTION,
  TEXT_DARK,
  TEXT_MUTED,
  ACCENT_PRIMARY,
  ACCENT_SECONDARY,
  ACCENT_TERTIARY,
} from "./servicesConfig";
import ServicesBackground from "./ServicesBackground";
import ServiceCard from "./ServiceCard";
import ViewMoreButton from "./ViewMoreButton";
import "../services/servicesStyles.css";

const MAX_PARALLAX = 20;

const ServicesSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dir = i18n.dir();

  const sectionRef = useRef(null);
  const [relativeY, setRelativeY] = useState(0); // -1..1
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Section-based parallax
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distance = sectionCenter - viewportCenter;
      const maxDistance = viewportHeight;

      let normalized = distance / maxDistance;
      if (normalized < -1) normalized = -1;
      if (normalized > 1) normalized = 1;

      setRelativeY(-normalized);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Mouse parallax within section
  const handleSectionMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setMouseOffset({ x, y });
  };

  const handleCardClick = (id) => {
    switch (id) {
      case "electrical":
        navigate("/services/electrical-appliance-maintenance");
        break;
      case "kitchen":
        navigate("/services/kitchen-equipment-installation");
        break;
      case "ac":
        navigate("/services/ac-repair-services");
        break;
      default:
        navigate("/services");
    }
  };

  // 3D tilt handlers
  const handleTiltMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    const rotateX = ((y - midY) / midY) * -6;
    const rotateY = ((x - midX) / midX) * 6;

    card.style.setProperty("--rx", `${rotateX}deg`);
    card.style.setProperty("--ry", `${rotateY}deg`);
    card.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--my", `${(y / rect.height) * 100}%`);
  };

  const handleTiltLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty("--rx", `0deg`);
    card.style.setProperty("--ry", `0deg`);
  };

  const handleViewMore = () => {
    navigate("/services");
  };

  const heading = t("service.heading");
  const subtitle = t("service.chooser.subtitle");
  const viewLabel = t("service.viewServices") || "Explore All Services";

  const bgParallax = relativeY * MAX_PARALLAX;

  return (
    <section
      ref={sectionRef}
      id="services-overview"
      dir={dir}
      className="w-full py-20 md:py-28 relative overflow-hidden bg-white"
      style={{ backgroundColor: BG_SECTION }}
      onMouseMove={handleSectionMouseMove}
    >
      {/* Background / shapes with parallax */}
      <ServicesBackground parallaxOffset={bgParallax} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div
          className={`flex flex-col gap-6 mb-16 md:mb-20 ${
            dir === "rtl" ? "text-right items-end" : "text-left items-start"
          }`}
          style={{
            transform: `translateY(${relativeY * MAX_PARALLAX * -0.4}px)`,
          }}
        >
          <div className="flex flex-col gap-4">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight"
              style={{
                background: `linear-gradient(135deg, ${TEXT_DARK} 0%, ${ACCENT_PRIMARY} 40%, ${ACCENT_SECONDARY} 80%, ${TEXT_DARK} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
              }}
            >
              {heading}
            </h2>

            {/* underline */}
            <div
              className="h-1.5 rounded-full transform origin-left"
              style={{
                background: `linear-gradient(90deg, ${ACCENT_PRIMARY}, ${ACCENT_SECONDARY}, ${ACCENT_TERTIARY})`,
                boxShadow: "0 2px 12px rgba(162, 129, 31, 0.2)",
                width: "140px",
                animation: "underlineGrow 1.2s ease-out",
              }}
            />
          </div>

          <p
            className="text-lg md:text-xl max-w-2xl leading-relaxed mt-2 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm"
            style={{ color: TEXT_MUTED }}
          >
            {subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {SERVICE_CARDS.map((service, index) => {
            const title = t(`service.cards.${service.id}.title`);
            const description = t(
              `service.cards.${service.id}.description`,
              {
                defaultValue:
                  "Professional maintenance and installation services with expert technicians and quality guarantees.",
              }
            );

            const depth = 0.6 + index * 0.2;
            const parallaxOffset =
              relativeY * MAX_PARALLAX * depth +
              mouseOffset.y * MAX_PARALLAX * depth;

            return (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                dir={dir}
                title={title}
                description={description}
                parallaxOffset={parallaxOffset}
                onClick={() => handleCardClick(service.id)}
                onTiltMove={handleTiltMove}
                onTiltLeave={handleTiltLeave}
              />
            );
          })}
        </div>

        {/* View more button */}
        <ViewMoreButton label={viewLabel} onClick={handleViewMore} />
      </div>
    </section>
  );
};

export default ServicesSection;
