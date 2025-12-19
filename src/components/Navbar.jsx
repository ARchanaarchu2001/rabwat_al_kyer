// src/components/navbar/Navbar.jsx
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import MobileOverlay from "./MobileOverlay";

const ACCENT = "#A5811F";
const BORDER = "rgba(0,0,0,0.08)";
const BAR_HEIGHT = 72;
const LOGO = "/logo-1.png";

const NAV_ITEMS = ["home", "about", "services", "contact"];

// Each service: translation key + slug used in the URL
const SERVICE_ITEMS = [
  {
    key: "electrical",
    labelKey: "service.cards.electrical.title",
    fallbackLabel: "Electrical Appliance Maintenance",
    slug: "electrical-appliance-maintenance",
  },
  {
    key: "kitchen",
    labelKey: "service.cards.kitchen.title",
    fallbackLabel: "Kitchen Equipment Installation Services",
    slug: "kitchen-equipment-installation",
  },
  {
    key: "ac",
    labelKey: "service.cards.ac.title",
    fallbackLabel: "AC & Heating System Maintenance",
    slug: "ac-repair-services",
  },
];


const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeItem, setActiveItem] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isRTL = i18n.dir(i18n.language || "en") === "rtl";

  // ---- language helpers ----
  const applyDirLang = (lng) => {
    const dir = i18n.dir(lng);
    document.documentElement.lang = lng;
    document.documentElement.dir = dir;
    document.body.dir = dir;
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    applyDirLang(lng);
  };

  useEffect(() => {
    applyDirLang(i18n.language || "en");
  }, [i18n.language]);

  // ---- ACTIVE ITEM BASED ON ROUTE ----
  useEffect(() => {
    const path = location.pathname;

    if (path === "/") {
      setActiveItem("home");
    } else if (path.startsWith("/about")) {
      setActiveItem("about");
    } else if (path.startsWith("/service")) {
      // e.g. /service/something
      setActiveItem("services");
    } else if (path.startsWith("/services")) {
      setActiveItem("services");
    } else if (path.startsWith("/contact")) {
      setActiveItem("contact");
    } else {
      setActiveItem("");
    }
  }, [location.pathname]);

  // close mobile menu on route change
  useEffect(() => {
    if (isOpen) setIsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // lock body scroll when overlay open
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = prevOverflow || "";
      document.body.style.paddingRight = prevPaddingRight || "";
    }

    return () => {
      document.body.style.overflow = prevOverflow || "";
      document.body.style.paddingRight = prevPaddingRight || "";
    };
  }, [isOpen]);

  // ESC closes mobile menu
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // expose --nav-safe for scroll padding
  useEffect(() => {
    const applyNavSafe = () => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const h = isMobile ? 64 : 72;
      const navSafe = `calc(${h}px + env(safe-area-inset-top))`;
      document.documentElement.style.setProperty("--nav-safe", navSafe);
      document.documentElement.style.scrollPaddingTop = navSafe;
    };
    applyNavSafe();
    window.addEventListener("resize", applyNavSafe, { passive: true });
    return () => window.removeEventListener("resize", applyNavSafe);
  }, []);

  // detect scroll (for home page transparent → white)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ---- nav behavior: SIMPLE ROUTING ----
  const handleNavClick = (item) => {
    setActiveItem(item);

    switch (item) {
      case "home":
        navigate("/");
        break;
      case "about":
        navigate("/about");
        break;
      case "services":
        navigate("/services");
        break;
      case "contact":
        navigate("/contact");
        break;
      default:
        break;
    }

    setIsOpen(false);
  };

    const handleServiceClick = (slug) => {
    // adjust this path to match your routing
    // e.g. /services/:slug or /service/:slug
    navigate(`/services/${slug}`);
    setIsOpen(false);
  };


  // ---- visual tokens ----
  const isHome = location.pathname === "/";

  const headerBgClass =
    isHome && !isScrolled
      ? "bg-transparent"
      : "bg-white/95 backdrop-blur shadow-sm";

  const linkColorClass = "text-[#111111]";
  const underlineColor = ACCENT;
  const langBtnBorder = "rgba(0,0,0,.18)";
  const langBtnText = "#111111";
  const showBorder =
    isHome && !isScrolled ? "1px solid transparent" : `1px solid ${BORDER}`;

  const mobileOverlay = isOpen
    ? createPortal(
        <MobileOverlay
          navItems={NAV_ITEMS}
          activeItem={activeItem}
          onNavClick={handleNavClick}
          t={t}
          isRTL={isRTL}
          borderColor={BORDER}
          onClose={() => setIsOpen(false)}
           serviceItems={SERVICE_ITEMS}
          onServiceClick={handleServiceClick}
        />,
        document.body
      )
    : null;

  return (
    <>
      <header
        dir="ltr"
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${headerBgClass}`}
        style={{ borderBottom: showBorder }}
        role="navigation"
        aria-label="Main"
      >
        {/* Desktop */}
        <div className="hidden md:block">
          <DesktopNavbar
            logoSrc={LOGO}
            navItems={NAV_ITEMS}
            activeItem={activeItem}
            onNavClick={handleNavClick}
            t={t}
            i18n={i18n}
            isRTL={isRTL}
            accent={ACCENT}
            linkColorClass={linkColorClass}
            underlineColor={underlineColor}
            langBtnBorder={langBtnBorder}
            langBtnText={langBtnText}
            barHeight={BAR_HEIGHT}
            onToggleLanguage={() =>
              changeLanguage(i18n.language?.startsWith("ar") ? "en" : "ar")
              
            }
            serviceItems={SERVICE_ITEMS}         
          onServiceClick={handleServiceClick}
          />
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <MobileNavbar
            logoSrc={LOGO}
            i18n={i18n}
            langBtnBorder={langBtnBorder}
            langBtnText={langBtnText}
            barHeight={BAR_HEIGHT}
            isOpen={isOpen}
            onToggleMenu={() => setIsOpen((p) => !p)}
            onToggleLanguage={() =>
              changeLanguage(i18n.language?.startsWith("ar") ? "en" : "ar")
            }
            serviceItems={SERVICE_ITEMS}
           onServiceClick={handleServiceClick}
            onLogoClick={() => handleNavClick("home")}
          />
        </div>
      </header>

      {mobileOverlay}
    </>
  );
};

export default Navbar;
