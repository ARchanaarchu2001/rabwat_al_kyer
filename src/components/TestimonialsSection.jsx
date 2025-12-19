// src/components/TestimonialsSection.jsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// ---- GOLD THEME PALETTE ----
const ACCENT_PRIMARY = "#A2811F";   // main gold
const ACCENT_SECONDARY = "#9D8A4A"; // softer gold
const BG_SECTION = "#F7F7F7";       // light background
const TEXT_DARK = "#111111";
const TEXT_MUTED = "#555555";

const TestimonialsSection = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

  const testimonials =
    t("testimonials.items", {
      returnObjects: true,
      defaultValue: [],
    }) || [];

  if (!testimonials.length) return null;

  // Duplicate items to create a seamless marquee loop
  const marqueeItems = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      dir={dir}
      className="w-full py-12 md:py-16 relative overflow-hidden"
      style={{ backgroundColor: BG_SECTION }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div
          className="absolute -left-24 -top-24 w-64 h-64 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${ACCENT_PRIMARY}55, transparent 70%)`,
          }}
        />
        <div
          className="absolute -right-24 bottom-0 w-72 h-72 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${ACCENT_SECONDARY}55, transparent 70%)`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          className={`mb-4 ${dir === "rtl" ? "text-right" : "text-left"}`}
        >
          <h2
            className="text-2xl md:text-3xl font-bold"
            style={{ color: TEXT_DARK }}
          >
            {t("testimonials.heading")}
          </h2>
          <div
            className="mt-2 h-0.5 rounded-full"
            style={{
              width: "64px",
              background: `linear-gradient(90deg, ${ACCENT_PRIMARY}, ${ACCENT_SECONDARY})`,
            }}
          />
        </div>

        {/* Subtitle */}
        <div className="text-center mb-8 md:mb-10">
          <h3
            className="text-base md:text-xl font-semibold"
            style={{ color: ACCENT_PRIMARY }}
          >
            {t("testimonials.subtitle")}
          </h3>
        </div>

        {/* Marquee container */}
        <div className="relative">
          {/* soft fade mask on sides (handled with custom CSS class) */}
          <div className="testimonials-marquee-mask">
            <div className="testimonials-marquee-track">
              {marqueeItems.map((item, idx) => (
                <div key={idx} className="w-72 md:w-80 flex-shrink-0">
                  <TestimonialCard item={item} dir={dir} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Optional small note */}
        {/* <p
          className="mt-4 text-xs text-center"
          style={{ color: TEXT_MUTED }}
        >
          {t("testimonials.marqueeHint", {
            defaultValue: "Hover to pause the movement.",
          })}
        </p> */}
      </div>
    </section>
  );
};

const TestimonialCard = ({ item, dir }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className={`relative h-full bg-white rounded-xl px-4 py-4 flex flex-col transition-all duration-300 ease-out border ${
        dir === "rtl" ? "text-right" : "text-left"
      }`}
      style={{
        borderColor: isHovered ? `${ACCENT_PRIMARY}40` : "rgba(0,0,0,0.06)",
        boxShadow: isHovered
          ? "0 14px 28px rgba(0,0,0,0.18)"
          : "0 6px 18px rgba(0,0,0,0.08)",
        transform: `translateY(${isHovered ? -4 : 0}px) scale(${
          isHovered ? 1.02 : 1
        })`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative quote mark */}
      <div
        className="text-4xl leading-none mb-2 transition-all duration-300"
        style={{
          color: ACCENT_PRIMARY,
          opacity: isHovered ? 0.7 : 0.4,
          transform: `scale(${isHovered ? 1.1 : 1})`,
        }}
      >
        "
      </div>

      {/* Quote text */}
      <p
        className="text-xs md:text-sm mb-4 leading-relaxed transition-colors duration-300"
        style={{ color: isHovered ? TEXT_DARK : TEXT_MUTED }}
      >
        {item.text}
      </p>

      {/* Gold accent line separator */}
      <div
        className="h-px rounded-full transition-all duration-300 mb-3"
        style={{
          background: `linear-gradient(90deg, ${ACCENT_PRIMARY}, transparent)`,
          width: isHovered ? "100%" : "55%",
        }}
      />

      {/* Name */}
      <div className="mt-auto">
        <h4
          className="text-sm md:text-base font-semibold transition-colors duration-300"
          style={{ color: isHovered ? ACCENT_PRIMARY : TEXT_DARK }}
        >
          {item.name}
        </h4>
      </div>

      {/* Hover glow effect */}
      {isHovered && (
        <div
          className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, ${ACCENT_PRIMARY}08, transparent 70%)`,
            opacity: 1,
          }}
        />
      )}
    </article>
  );
};

export default TestimonialsSection;
