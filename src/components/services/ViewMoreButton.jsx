// src/components/services/ViewMoreButton.jsx
import React from "react";

const ViewMoreButton = ({ label, onClick, accentPrimary, accentSecondary }) => {
  return (
    <button
      onClick={onClick}
      className="group relative inline-flex items-center gap-4 px-10 md:px-12 py-4 md:py-5 rounded-2xl text-base md:text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-105"
      style={{
        background: `linear-gradient(135deg, ${accentPrimary}, ${accentSecondary})`,
        color: "#FFFFFF",
      }}
    >
      {/* shine */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
            transform: "translateX(-100%)",
            animation: "buttonShine 2s infinite",
          }}
        />
      </div>

      <span className="relative z-10">{label}</span>
      <span className="relative z-10 text-xl transform transition-transform duration-300 group-hover:translate-x-2 group-hover:rotate-12">
        →
      </span>

      {/* floating particles */}
      <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#A2811F] opacity-60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `particleFloat 3s ease-in-out infinite ${i * 0.4}s`,
            }}
          />
        ))}
      </div>
    </button>
  );
};

export default ViewMoreButton;
