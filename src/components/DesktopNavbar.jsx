// src/components/navbar/DesktopNavbar.jsx
import React from "react";
import { motion } from "framer-motion";

const DesktopNavbar = ({
  logoSrc,
  navItems,
  activeItem,
  onNavClick,
  t,
  i18n,
  isRTL,
  accent,
  linkColorClass,
  underlineColor,
  langBtnBorder,
  langBtnText,
  barHeight,
  onToggleLanguage,
  // 👇 NEW
  serviceItems = [],
  onServiceClick,
}) => {
  const languageIsArabic = i18n.language?.startsWith("ar");
  const brandGold = accent || "#A5811F";

  // Debug (optional): see if services are passed correctly
  // console.log("serviceItems in DesktopNavbar:", serviceItems);

  return (
    <div
      className="max-w-7xl mx-auto px-8 flex items-center justify-between gap-8"
      style={{ height: barHeight + 20, minHeight: 92 }}
    >
      {/* Logo - Large & Animated */}
      <motion.button
        type="button"
        onClick={() => onNavClick("home")}
        className="flex items-center group relative"
        aria-label="Go to Home"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <motion.img
          src={logoSrc}
          alt="Logo"
          className="h-16 w-auto object-contain lg:h-26"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </motion.button>

      {/* Navigation - Large Pill */}
      <motion.nav
        dir={isRTL ? "rtl" : "ltr"}
        className="flex-1 flex items-center justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      >
        <div className="inline-flex items-center rounded-full bg-white/95 backdrop-blur-md px-3 py-3 shadow-lg border border-black/5 gap-2">
          {navItems.map((item, index) => {
            const active = activeItem === item;

            // 🔽 SPECIAL CASE: SERVICES DROPDOWN
            if (item === "services") {
              return (
                <div
                  key={item}
                  className="relative group"
                >
                  <motion.button
                    type="button"
                    onClick={() => onNavClick(item)} // still navigates to /services
                    className="relative px-7 py-3 text-base font-semibold uppercase tracking-[0.15em] rounded-full transition-colors duration-200"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1 + index * 0.05,
                      ease: "easeOut",
                    }}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Active background with gradient */}
                    {active && (
                      <motion.span
                        layoutId="navbar-pill"
                        className="absolute inset-0 rounded-full -z-10"
                        style={{
                          background: `linear-gradient(135deg, #111111 0%, ${brandGold} 100%)`,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Text */}
                    <motion.span
                      className={`relative z-10 ${
                        active ? "text-white" : "text-[#111111]"
                      }`}
                      animate={{
                        color: active ? "#ffffff" : "#111111",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {t("nav.services")}
                    </motion.span>
                  </motion.button>

                  {/* Dropdown panel (hover) */}
                  {serviceItems.length > 0 && (
                    <div
                      className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity transition-transform duration-200 absolute left-1/2 -translate-x-1/2  min-w-[260px] bg-white shadow-lg rounded-xl border border-black/5 py-2 z-[999]"
                    >
                      {serviceItems.map((service) => {
                        const label =
                          (service.labelKey && t(service.labelKey)) ||
                          service.fallbackLabel ||
                          service.key;

                        return (
                          <button
                            key={service.key}
                            type="button"
                            onClick={() =>
                              onServiceClick && onServiceClick(service.slug)
                            }
                            className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#A3801E] whitespace-normal"
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            // ✨ NORMAL NAV ITEMS (home, about, contact)
            return (
              <motion.button
                key={item}
                type="button"
                onClick={() => onNavClick(item)}
                className="relative px-7 py-3 text-base font-semibold uppercase tracking-[0.15em] rounded-full transition-colors duration-200"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + index * 0.05,
                  ease: "easeOut",
                }}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {active && (
                  <motion.span
                    layoutId="navbar-pill"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{
                      background: `linear-gradient(135deg, #111111 0%, ${brandGold} 100%)`,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}

                <motion.span
                  className={`relative z-10 ${
                    active ? "text-white" : "text-[#111111]"
                  }`}
                  animate={{
                    color: active ? "#ffffff" : "#111111",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {t(`nav.${item}`)}
                </motion.span>
              </motion.button>
            );
          })}
        </div>
      </motion.nav>

      {/* Language Toggle - Large & Clean */}
      <motion.button
        onClick={onToggleLanguage}
        className="px-6 py-3 text-base rounded-full border-2 bg-white/95 backdrop-blur-md font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-lg"
        style={{
          color: langBtnText,
          borderColor: langBtnBorder,
        }}
        aria-label="Toggle language"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{
          y: -2,
          scale: 1.05,
          borderColor: brandGold,
          color: brandGold,
        }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          key={languageIsArabic ? "ar" : "en"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {languageIsArabic ? "EN" : "العربية"}
        </motion.span>
      </motion.button>
    </div>
  );
};

export default DesktopNavbar;
