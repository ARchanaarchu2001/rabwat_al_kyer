import React, { useState, useEffect, useRef } from "react";
import { Headphones, ThumbsUp, Star, CreditCard } from "lucide-react";
import { useTranslation } from "react-i18next";

const PRIMARY_START = "#A2811F";
const PRIMARY_END = "#9D8A4A";
const TEXT_LIGHT = "#FFFFFF";
const BG_PAGE = "#F7F7F7";
const SHADOW = "0 10px 25px rgba(0,0,0,0.18)";

const iconMap = {
  support: Headphones,
  satisfaction: ThumbsUp,
  excellent: Star,
  payment: CreditCard,
};

const ServiceHighlights = () => {
  const { t } = useTranslation();

  const items = t("serviceHighlights.items", {
    returnObjects: true,
    defaultValue: [],
  });

  const sectionRef = useRef(null);
  const [relativeY, setRelativeY] = useState(0); // -1 .. 1

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // Center of the section vs center of viewport
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;

      const distance = sectionCenter - viewportCenter; // px
      const maxDistance = viewportHeight; // clamp range
      let normalized = distance / maxDistance; // roughly -1 .. 1

      if (normalized < -1) normalized = -1;
      if (normalized > 1) normalized = 1;

      // invert so scrolling down moves pills slightly down
      setRelativeY(-normalized);
    };

    handleScroll(); // initial
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const MAX_OFFSET = 16; // max parallax in px, small so they never leave section

  return (
    <section
      ref={sectionRef}
      className="w-full py-6 md:py-8 relative overflow-hidden"
      style={{ backgroundColor: BG_PAGE }}
    >
      {/* optional soft background glow with very subtle parallax */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at top, rgba(162,129,31,0.16), transparent 60%)",
          transform: `translateY(${relativeY * MAX_OFFSET * -0.4}px)`,
          transition: "transform 0.1s linear",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-3 md:gap-5">
          {items.map((item, index) => {
            const Icon = iconMap[item.id] || Star;

            // alternate direction for layered feel
            const direction = index % 2 === 0 ? 1 : -1;
            const parallaxOffset = relativeY * MAX_OFFSET * direction;

            return (
              <div
                key={item.id || index}
                className="flex items-center gap-2 px-5 md:px-6 py-2 md:py-2.5 rounded-full transition-transform duration-150 will-change-transform"
                style={{
                  background: `linear-gradient(90deg, ${PRIMARY_START}, ${PRIMARY_END})`,
                  color: TEXT_LIGHT,
                  boxShadow: SHADOW,
                  transform: `translateY(${parallaxOffset}px)`,
                }}
              >
                <Icon size={18} />
                <span className="text-xs md:text-sm font-semibold whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;
