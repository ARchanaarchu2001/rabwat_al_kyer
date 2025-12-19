// src/components/services/ServicesBackground.jsx
import React from "react";

const ServicesBackground = ({
  scrollY,
  accentPrimary,
  accentSecondary,
  accentTertiary,
}) => {
  const bgTranslate = scrollY * 0.3;

  const floatingShapes = Array.from({ length: 12 }, (_, i) => {
    const size = 20 + ((i * 6) % 50);
    const top = 10 + ((i * 15) % 80);
    const left = 5 + ((i * 20) % 90);

    const shapeClass =
      i % 4 === 0
        ? "bg-[#A2811F] rounded-lg"
        : i % 4 === 1
        ? "bg-[#9D8A4A] rounded-full"
        : i % 4 === 2
        ? "bg-[#8A7734] triangle"
        : "bg-[#A2811F] hexagon";

    const anim =
      i % 3 === 0
        ? "animate-float-slow"
        : i % 3 === 1
        ? "animate-float-medium"
        : "animate-float-fast";

    return (
      <div
        key={i}
        className={`absolute opacity-[0.04] ${shapeClass} ${anim}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: `${top}%`,
          left: `${left}%`,
          filter: "blur(8px)",
        }}
      />
    );
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* main gradient bg with parallax */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `translateY(${bgTranslate}px) scale(1.1)`,
          background: `
            radial-gradient(circle at 20% 20%, ${accentPrimary}08 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, ${accentSecondary}06 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, ${accentTertiary}04 0%, transparent 50%)
          `,
        }}
      />

      {/* grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 99%, ${accentPrimary} 99%),
            linear-gradient(0deg, transparent 99%, ${accentPrimary} 99%)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* floating shapes */}
      {floatingShapes}

      {/* orbs */}
      <div className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-[#A2811F] opacity-10 animate-float-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-[#9D8A4A] opacity-80 animate-float-medium" />
      <div className="absolute top-2/3 left-2/3 w-4 h-4 rounded-full bg-[#8A7734] opacity-70 animate-float-fast" />

      {/* light rays */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `linear-gradient(45deg,
              transparent 0%,
              rgba(162,129,31,0.1) 25%,
              transparent 50%,
              rgba(157,138,74,0.1) 75%,
              transparent 100%)`,
            backgroundSize: "200% 200%",
            animation: "lightRay 12s linear infinite",
          }}
        />
      </div>
    </div>
  );
};

export default ServicesBackground;
