// src/components/services/ServicesSection.jsx
import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ServicesBackground from "../components/services/ServicesBackground";
import ServicesHeader from "../components/services/ServicesHeader";
import ServiceCard from "../components/services/ServiceCard";
import ViewMoreButton from "../components/services/ViewMoreButton";

const ACCENT_PRIMARY = "#A2811F";
const ACCENT_SECONDARY = "#9D8A4A";
const ACCENT_TERTIARY = "#8A7734";

const serviceCards = [
  {
    id: "electrical",
    image: "/assets/electrical.jpg",
    icon: "⚡",
  },
  {
    id: "kitchen",
    image: "/assets/kitchen.jpg",
    icon: "🍽️",
  },
  {
    id: "ac",
    image: "/assets/ac.jpg",
    icon: "❄️",
  },
];

const ServicesSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dir = i18n.dir();

  const sectionRef = useRef(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // global mouse parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // scroll parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY || 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleViewMore = () => {
    navigate("/services");
  };

  const titleOffset = -scrollY * 0.2; // simple parallax for heading

  return (
    <section
      ref={sectionRef}
      id="services-overview"
      dir={dir}
      className="w-full py-20 md:py-28 relative overflow-hidden bg-white"
    >
      {/* Animated background */}
      <ServicesBackground
        scrollY={scrollY}
        accentPrimary={ACCENT_PRIMARY}
        accentSecondary={ACCENT_SECONDARY}
        accentTertiary={ACCENT_TERTIARY}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div
          style={{ transform: `translateY(${titleOffset}px)` }}
          className={`flex flex-col gap-6 mb-16 md:mb-20 transition-transform duration-200 ${
            dir === "rtl" ? "text-right items-end" : "text-left items-start"
          }`}
        >
          <ServicesHeader
            heading={t("service.heading")}
            subtitle={t("service.chooser.subtitle")}
            accentPrimary={ACCENT_PRIMARY}
            accentSecondary={ACCENT_SECONDARY}
            accentTertiary={ACCENT_TERTIARY}
          />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {serviceCards.map((service, index) => (
            <ServiceCard
              key={service.id}
              index={index}
              service={service}
              dir={dir}
              mousePosition={mousePosition}
              scrollY={scrollY}
              onClick={handleCardClick}
            />
          ))}
        </div>

        {/* View more button */}
        <div className="mt-16 md:mt-20 flex justify-center">
          <ViewMoreButton
            label={t("service.viewServices") || "Explore All Services"}
            onClick={handleViewMore}
            accentPrimary={ACCENT_PRIMARY}
            accentSecondary={ACCENT_SECONDARY}
          />
        </div>
      </div>

      {/* shared styles & keyframes */}
      <style jsx global>{`
        .service-card {
          --rx: 0deg;
          --ry: 0deg;
          --mx: 50%;
          --my: 50%;
          transform-style: preserve-3d;
          transform: perspective(1200px) rotateX(var(--rx)) rotateY(var(--ry));
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          width: 100%;
        }
        .service-card:hover {
          transform: perspective(1200px) rotateX(var(--rx)) rotateY(var(--ry))
            translateY(-12px) scale(1.05);
        }
        .card-glow {
          background: radial-gradient(
            circle at var(--mx) var(--my),
            rgba(162, 129, 31, 0.15),
            transparent 50%
          );
          filter: blur(25px);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }
        .hexagon {
          clip-path: polygon(
            25% 0%,
            75% 0%,
            100% 50%,
            75% 100%,
            25% 100%,
            0% 50%
          );
        }
        @keyframes cardReveal {
          from {
            opacity: 0;
            transform: translateY(80px) rotateY(10deg) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateY(0) scale(1);
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes buttonShine {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes particleFloat {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          50% {
            transform: translate(10px, -10px) scale(1.5);
            opacity: 1;
          }
        }
        @keyframes lightRay {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 200% 200%;
          }
        }
        @keyframes underlineGrow {
          from {
            transform: scaleX(0);
            opacity: 0;
          }
          to {
            transform: scaleX(1);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
