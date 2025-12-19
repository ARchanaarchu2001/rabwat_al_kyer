// src/components/navbar/MobileNavbar.jsx
import React from "react";
import { FiMenu, FiX } from "react-icons/fi";

const MobileNavbar = ({
  logoSrc,
  i18n,
  langBtnBorder,
  langBtnText,
  barHeight,
  isOpen,
  onToggleMenu,
  onToggleLanguage,
  onLogoClick,
}) => {
  const languageIsArabic = i18n.language?.startsWith("ar");

  return (
    <div dir="ltr">
      <div
        className="px-4 grid grid-cols-[auto_1fr_auto] items-center"
        style={{ height: barHeight - 8 }}
      >
        {/* Left: logo */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={onLogoClick}
            className="block"
            aria-label="Go to Home"
          >
            <img
              src={logoSrc}
              alt="Logo"
              className="h-15 w-auto object-contain"
            />
          </button>
        </div>

        {/* Center: language toggle */}
        

        {/* Right: hamburger */}
        <div className="flex gap-2 justify-end">
          <button
            onClick={onToggleMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-overlay"
            className="p-2 rounded-full border border-gray-300 text-[#111111]"
            title={isOpen ? "Close" : "Menu"}
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

          <div className="flex justify-center">
          <button
            onClick={onToggleLanguage}
            className="px-3 py-1.5 text-sm rounded-full border transition"
            style={{ color: langBtnText, borderColor: langBtnBorder }}
            aria-label="Toggle language"
          >
            {languageIsArabic ? "EN" : "العربية"}
          </button>
        </div>
          
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
