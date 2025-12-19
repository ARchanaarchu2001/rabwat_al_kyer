// src/components/services/ServicesHeader.jsx
import React from "react";

const TEXT_DARK = "#111111";
const TEXT_MUTED = "#666666";

const ServicesHeader = ({
  heading,
  subtitle,
  accentPrimary,
  accentSecondary,
  accentTertiary,
}) => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight"
          style={{
            background: `linear-gradient(135deg, ${TEXT_DARK} 0%, ${accentPrimary} 40%, ${accentSecondary} 80%, ${TEXT_DARK} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
          }}
        >
          {heading}
        </h2>

        <div
          className="h-1.5 rounded-full transform origin-left"
          style={{
            background: `linear-gradient(90deg, ${accentPrimary}, ${accentSecondary}, ${accentTertiary})`,
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
    </>
  );
};

export default ServicesHeader;
