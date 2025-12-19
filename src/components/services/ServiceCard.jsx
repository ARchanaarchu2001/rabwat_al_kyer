// src/components/services/ServiceCard.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const TEXT_DARK = "#111111";
const TEXT_MUTED = "#000";
const ACCENT_PRIMARY = "#A2811F";

const ServiceCard = ({
  service,
  index,
  dir,
  mousePosition,
  scrollY,
  onClick,
}) => {
  const { t } = useTranslation();

  const titleKey = `service.cards.${service.id}.title`;
  const descKey = `service.cards.${service.id}.description`;

  const title = t(titleKey);
  const description = t(descKey, {
    defaultValue:
      "Professional maintenance and installation services with expert technicians and quality guarantees.",
  });

  // parallax ONLY for the image, not for the whole card (to keep alignment)
  const scrollProgress = scrollY / 1000;
  const depth = 0.2 + index * 0.1;
  const imageYMove = scrollProgress * depth * -20; // subtle vertical move
  const imageScale = 1.03; // slight zoom for nice feel

  const handleMouseMove = (e) => {
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

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty("--rx", `0deg`);
    card.style.setProperty("--ry", `0deg`);
  };

  return (
    <div
      dir={dir}
      className="transform-gpu transition-all duration-500 will-change-transform flex"
      style={{
        // no translate/rotate here so all cards stay aligned
        animation: `cardReveal 0.8s ease-out ${index * 0.15}s both`,
      }}
    >
      <div
        onClick={() => onClick(service.id)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="service-card group relative w-full cursor-pointer flex flex-col"
      >
        {/* glowing border */}
        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, #A2811F, #9D8A4A, #8A7734)",
            padding: "2px",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* card */}
        <div className="relative rounded-3xl bg-white/95 backdrop-blur-sm border border-gray-200/80 shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 group-hover:border-[#A2811F]/30 flex flex-col h-full group-hover:scale-105 flex-1 min-h-0">
          {/* image */}
          <div
            className="relative h-56 md:h-64 overflow-hidden flex-shrink-0"
            style={{
              transform: `translate3d(0, ${imageYMove}px, 0) scale(${imageScale})`,
              transformOrigin: "center center",
            }}
          >
            <img
              src={service.image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 0%, #A2811F26 100%)",
              }}
            />
            {/* shimmer */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  transform: "translateX(-100%)",
                  animation: "shimmer 2s infinite",
                }}
              />
            </div>
          </div>

          {/* content */}
          <div className="p-6 md:p-7 flex flex-col flex-1 min-h-0">
            <div className="mb-3 flex-shrink-0">
              <h3
                className="text-xl md:text-2xl font-bold transition-colors duration-300 group-hover:text-[#A2811F] line-clamp-2"
                style={{ color: TEXT_DARK }}
              >
                {title}
              </h3>
            </div>

            <div className="mb-6 flex-1 min-h-0 overflow-hidden">
              <p
                className="text-sm md:text-base leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300 line-clamp-3"
                style={{ color: TEXT_MUTED }}
              >
                {description}
              </p>
            </div>

            <div className="flex items-center justify-between flex-shrink-0 pt-2">
              <span
                className="text-sm font-semibold flex items-center gap-2 transition-all duration-300 group-hover:gap-3 group-hover:translate-x-2"
                style={{ color: ACCENT_PRIMARY }}
              >
                {t("service.learnMore") || "Learn More"}
                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* glow behind */}
        <div className="card-glow absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      </div>
    </div>
  );
};

export default ServiceCard;
