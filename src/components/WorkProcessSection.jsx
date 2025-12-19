// src/components/WorkProcessSection.jsx
import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Search, Wrench, CheckCircle2 } from "lucide-react";

// Brand palette
const ACCENT_PRIMARY = "#A2811F";
const ACCENT_SECONDARY = "#9D8A4A";
const BG_SECTION = "#F7F7F7";
const TEXT_DARK = "#111111";
const TEXT_MUTED = "#555555";

const ICON_MAP = {
  contact: Search,
  visit: Wrench,
  complete: CheckCircle2,
};

const WorkProcessSection = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const isRTL = dir === "rtl";

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const bgRef = useRef(null);

  const steps =
    t("workProcess.steps", {
      returnObjects: true,
      defaultValue: [],
    }) || [];

  if (!steps.length) return null;

  // Mouse + scroll listeners
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY || 0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Background parallax only (safe – doesn’t move cards)
  useEffect(() => {
    if (!bgRef.current) return;
    const yMove = scrollY * 0.2; // soft vertical move
    const xMove = mouse.x * 0.3; // gentle horizontal move
    bgRef.current.style.transform = `translate3d(${xMove}px, ${yMove}px, 0)`;
  }, [scrollY, mouse]);

  // Card transform: only subtle mouse-based parallax (no scroll Y shift)
  const cardTransform = (index) => {
    const depth = 0.04 + index * 0.02;
    const tx = mouse.x * depth; // small x movement
    const ty = mouse.y * depth * 0.3; // tiny y movement
    const rot = mouse.x * 0.03 * depth;

    return {
      transform: `translate3d(${tx}px, ${ty}px, 0) rotate3d(0, 0, 1, ${rot}deg)`,
      transition: "transform 0.3s ease-out",
    };
  };

  const heading = t("workProcess.heading");
  const subtitle = t("workProcess.subtitle");

  return (
    <section
      id="work-process"
      dir={dir}
      className="relative w-full py-12 md:py-16 overflow-hidden"
      style={{ backgroundColor: BG_SECTION }}
    >
      {/* Soft parallax background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 will-change-transform"
          style={{
            background: `
              radial-gradient(circle at 15% 20%, ${ACCENT_PRIMARY}10 0%, transparent 55%),
              radial-gradient(circle at 85% 80%, ${ACCENT_SECONDARY}10 0%, transparent 55%)
            `,
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <header className="mb-8 md:mb-10 text-center">
          <h2
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{ color: TEXT_DARK }}
          >
            {heading}
          </h2>
          <p
            className="text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: TEXT_MUTED }}
          >
            {subtitle}
          </p>
        </header>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {steps.map((step, index) => {
            const Icon = ICON_MAP[step.id] || Search;

            return (
              <article key={step.id || index} className="relative">
                <div
                  className="h-full bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100/70 px-6 py-6 md:px-7 md:py-7 flex flex-col items-center text-center"
                  style={{
                    ...cardTransform(index),
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                  }}
                >
                  {/* Icon */}
                  <div className="mb-4">
                    <div
                      className="w-12 h-12 flex items-center justify-center rounded-full shadow-md"
                      style={{
                        background: `linear-gradient(135deg, ${ACCENT_PRIMARY}, ${ACCENT_SECONDARY})`,
                        color: "#FFFFFF",
                      }}
                    >
                      <Icon size={22} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-base md:text-lg font-semibold mb-2 ${
                      isRTL ? "text-right" : "text-center"
                    }`}
                    style={{ color: TEXT_DARK }}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-xs md:text-sm leading-relaxed ${
                      isRTL ? "text-right" : "text-center"
                    }`}
                    style={{ color: TEXT_MUTED }}
                  >
                    {step.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkProcessSection;
