// src/components/ComfortCtaSection.jsx
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

// Brand palette
const ACCENT_PRIMARY = "#A2811F";   // main gold
const ACCENT_SECONDARY = "#9D8A4A"; // softer gold
const BG_SECTION = "#F7F7F7";
const TEXT_DARK = "#111111";
const TEXT_MUTED = "#444444";

const MAX_OFFSET = 30; // increased for more dramatic effect

const ComfortCtaSection = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

  const heading = t("cta.heading");
  const lead = t("cta.lead");
  const bodyLines =
    t("cta.body", {
      returnObjects: true,
      defaultValue: [],
    }) || [];

  const contactHeading = t("cta.contactHeading");
  const contactLines =
    t("cta.contactLines", {
      returnObjects: true,
      defaultValue: [],
    }) || [];

  const whatsappLabel = t("cta.whatsappLabel");
  const callLabel = t("cta.callLabel");

  const whatsappNumber = t("contact.whatsapp", { defaultValue: "" });
  const phoneNumber = t("contact.phone", { defaultValue: "" });

  const normalizePhone = (value) =>
    String(value || "").replace(/[^\d+]/g, "");

  const waHref = whatsappNumber
    ? `https://wa.me/${normalizePhone(whatsappNumber)}`
    : "#";

  const callHref = phoneNumber
    ? `tel:${normalizePhone(phoneNumber)}`
    : "#";

  // ------- Enhanced Parallax logic -------
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      // Check if section is in view
      const inView = rect.top < viewportHeight && rect.bottom > 0;
      setIsInView(inView);

      // Calculate scroll progress through the section
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const progress = 1 - (sectionTop + sectionHeight) / (viewportHeight + sectionHeight);
      
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Multi-layer parallax offsets
  const cardOffset = (scrollProgress - 0.5) * MAX_OFFSET * 2;
  const bgOffset = (scrollProgress - 0.5) * MAX_OFFSET * -3;
  const accentLineOffset = (scrollProgress - 0.5) * MAX_OFFSET * 1.5;
  const buttonOffset = (scrollProgress - 0.5) * MAX_OFFSET * 0.8;

  return (
    <section
      id="comfort-cta"
      ref={sectionRef}
      dir={dir}
      className="w-full py-12 md:py-16 relative overflow-hidden"
      style={{ backgroundColor: BG_SECTION }}
    >
      {/* Animated background layers */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at ${50 + scrollProgress * 10}% ${30 - scrollProgress * 20}%, rgba(162,129,31,0.25), transparent 65%)`,
          transform: `translateY(${bgOffset}px) scale(${1 + scrollProgress * 0.05})`,
          transition: "transform 0.15s ease-out",
        }}
      />

      {/* Secondary glow layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${40 - scrollProgress * 15}% ${70 + scrollProgress * 10}%, rgba(157,138,74,0.3), transparent 50%)`,
          transform: `translateY(${bgOffset * -0.6}px) scale(${1 + scrollProgress * 0.03})`,
          transition: "transform 0.15s ease-out",
        }}
      />

      {/* Floating gold particles effect */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="pointer-events-none absolute rounded-full opacity-20"
          style={{
            width: `${80 + i * 40}px`,
            height: `${80 + i * 40}px`,
            background: `radial-gradient(circle, ${ACCENT_PRIMARY}, transparent 70%)`,
            left: `${20 + i * 30}%`,
            top: `${30 + i * 20}%`,
            transform: `translate(${(scrollProgress - 0.5) * (50 + i * 20)}px, ${(scrollProgress - 0.5) * (30 + i * 15)}px) scale(${0.8 + scrollProgress * 0.4})`,
            transition: "transform 0.2s ease-out",
            filter: "blur(40px)",
          }}
        />
      ))}

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content card with enhanced parallax */}
        <div
          className={`bg-white rounded-2xl shadow-md p-8 md:p-12 text-center transition-all duration-500 ease-out will-change-transform ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
          style={{
            border: `1px solid ${ACCENT_PRIMARY}20`,
            transform: `translateY(${cardOffset}px) rotateX(${(scrollProgress - 0.5) * -2}deg)`,
            boxShadow: `0 ${10 + scrollProgress * 20}px ${30 + scrollProgress * 20}px rgba(162,129,31,0.${Math.floor(8 + scrollProgress * 7)})`,
          }}
        >
          {/* Top accent line with parallax */}
          <div
            className="w-16 h-1 rounded-full mx-auto mb-6 transition-all duration-300"
            style={{
              background: `linear-gradient(90deg, ${ACCENT_PRIMARY}, ${ACCENT_SECONDARY})`,
              transform: `translateY(${accentLineOffset}px) scaleX(${1 + scrollProgress * 0.3})`,
              opacity: 0.7 + scrollProgress * 0.3,
            }}
          />

          {/* Main heading with fade-in */}
          <h2
            className="text-2xl md:text-3xl font-bold mb-4 transition-all duration-500"
            style={{
              color: TEXT_DARK,
              transform: `translateY(${cardOffset * 0.3}px)`,
              opacity: isInView ? 1 : 0,
              transitionDelay: "100ms",
            }}
          >
            {heading}
          </h2>

          {/* Lead paragraph */}
          <p
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-3 transition-all duration-500"
            style={{
              color: TEXT_MUTED,
              transform: `translateY(${cardOffset * 0.2}px)`,
              opacity: isInView ? 1 : 0,
              transitionDelay: "200ms",
            }}
          >
            {lead}
          </p>

          {/* Extra body lines */}
          {bodyLines.length > 0 && (
            <div className="mt-3 space-y-2 mb-6">
              {bodyLines.map((line, idx) => (
                <p
                  key={idx}
                  className="text-sm md:text-base max-w-2xl mx-auto leading-relaxed transition-all duration-500"
                  style={{
                    color: TEXT_MUTED,
                    transform: `translateY(${cardOffset * 0.15}px)`,
                    opacity: isInView ? 1 : 0,
                    transitionDelay: `${300 + idx * 100}ms`,
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          )}

          {/* Contact heading */}
          {contactHeading && (
            <div className="mt-8 mb-4">
              <h3
                className="text-lg md:text-xl font-bold transition-all duration-500"
                style={{
                  color: TEXT_DARK,
                  transform: `translateY(${cardOffset * 0.2}px)`,
                  opacity: isInView ? 1 : 0,
                  transitionDelay: "400ms",
                }}
              >
                {contactHeading}
              </h3>
            </div>
          )}

          {/* Contact bullet lines */}
          {contactLines.length > 0 && (
            <div className="space-y-1 text-sm md:text-base font-medium mb-8">
              {contactLines.map((line, idx) => (
                <p
                  key={idx}
                  className="max-w-2xl mx-auto transition-all duration-500"
                  style={{
                    color: TEXT_DARK,
                    transform: `translateY(${cardOffset * 0.1}px)`,
                    opacity: isInView ? 1 : 0,
                    transitionDelay: `${500 + idx * 100}ms`,
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          )}

          {/* Buttons with independent parallax */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 transition-all duration-500"
            style={{
              transform: `translateY(${buttonOffset}px)`,
              opacity: isInView ? 1 : 0,
              transitionDelay: "600ms",
            }}
          >
            {/* WhatsApp button */}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 text-sm md:text-base font-semibold rounded-lg shadow-md hover:shadow-xl transition-all duration-300 w-full sm:w-auto hover:scale-110 hover:-translate-y-1 active:scale-105"
              style={{
                color: "#FFFFFF",
                background: `linear-gradient(135deg, ${ACCENT_PRIMARY}, ${ACCENT_SECONDARY})`,
              }}
            >
              <span className="text-lg">💬</span>
              <span>{whatsappLabel}</span>
            </a>

            {/* Call button */}
            <a
              href={callHref}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 text-sm md:text-base font-semibold rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 w-full sm:w-auto hover:scale-110 hover:-translate-y-1 active:scale-105"
              style={{
                border: `2px solid ${ACCENT_PRIMARY}`,
                color: TEXT_DARK,
                backgroundColor: "#FFFFFF",
              }}
            >
              <span className="text-lg">📞</span>
              <span>{callLabel}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComfortCtaSection;