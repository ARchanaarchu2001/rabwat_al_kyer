import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiTarget, FiEye } from "react-icons/fi";

const ACCENT_PRIMARY = "#A2811F";
const ACCENT_SECONDARY = "#9D8A4A";
const BG_SECTION = "#FFFFFF";
const TEXT_DARK = "#111111";
const TEXT_MUTED = "#555555";

const MissionVisionSection = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("mission");
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  // Parallax scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const scrollProgress = (window.innerHeight - sectionTop) / (window.innerHeight + sectionHeight);
        setScrollY(scrollProgress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse move parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePos({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const mission = t("missionVision.mission", { returnObjects: true }) || {};
  const vision = t("missionVision.vision", { returnObjects: true }) || {};

  return (
    <section
      ref={sectionRef}
      dir={dir}
      className="relative w-full py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: BG_SECTION }}
    >
      {/* Parallax background layers */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Layer 1 - Slowest */}
        <div
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${ACCENT_PRIMARY}, transparent 70%)`,
            transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px) translateY(${scrollY * -100}px)`,
            transition: "transform 0.3s ease-out"
          }}
        />
        
        {/* Layer 2 - Medium */}
        <div
          className="absolute top-1/4 right-10 w-80 h-80 rounded-full opacity-8 blur-2xl"
          style={{
            background: `radial-gradient(circle, ${ACCENT_SECONDARY}, transparent 70%)`,
            transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px) translateY(${scrollY * 150}px)`,
            transition: "transform 0.2s ease-out"
          }}
        />
        
        {/* Layer 3 - Fastest */}
        <div
          className="absolute -bottom-32 right-1/4 w-[500px] h-[500px] rounded-full opacity-6 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${ACCENT_PRIMARY}, transparent 70%)`,
            transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px) translateY(${scrollY * -200}px)`,
            transition: "transform 0.15s ease-out"
          }}
        />

        {/* Floating geometric shapes */}
        <div
          className="absolute top-20 left-1/3 w-16 h-16 opacity-5"
          style={{
            transform: `rotate(${scrollY * 360}deg) translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
            transition: "transform 0.3s ease-out"
          }}
        >
          <div className="w-full h-full border-2 rounded-lg" style={{ borderColor: ACCENT_PRIMARY }} />
        </div>

        <div
          className="absolute bottom-32 right-1/3 w-12 h-12 opacity-5"
          style={{
            transform: `rotate(${scrollY * -360}deg) translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
            transition: "transform 0.25s ease-out"
          }}
        >
          <div className="w-full h-full rounded-full border-2" style={{ borderColor: ACCENT_SECONDARY }} />
        </div>

        {/* Animated grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke={TEXT_DARK}
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect 
            width="100%" 
            height="100%" 
            fill="url(#grid)"
            style={{
              transform: `translateY(${scrollY * 30}px)`,
              transition: "transform 0.1s ease-out"
            }}
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            transform: visible ? `translateY(${scrollY * -20}px)` : "translateY(32px)"
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 mb-4 backdrop-blur-sm">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: ACCENT_PRIMARY }}
            />
            <span
              className="text-xs tracking-wider uppercase font-medium"
              style={{ color: TEXT_MUTED }}
            >
              {t("missionVision.label")}
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: TEXT_DARK }}
          >
            {t("missionVision.heading")}
          </h2>

          <p
            className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
            style={{ color: TEXT_MUTED }}
          >
            {t("missionVision.intro")}
          </p>
        </div>

        {/* Tab Navigation */}
        <div
          className={`flex justify-center mb-8 transition-all duration-700 delay-150 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            transform: visible ? `translateY(${scrollY * -15}px)` : "translateY(32px)"
          }}
        >
          <div 
            className="inline-flex rounded-2xl bg-white/80 backdrop-blur-md p-1.5 gap-1 shadow-lg border border-gray-200"
            style={{
              transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)`,
              transition: "transform 0.3s ease-out"
            }}
          >
            <button
              onClick={() => setActiveTab("mission")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-500 ${
                activeTab === "mission"
                  ? "text-white shadow-lg scale-105"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              style={
                activeTab === "mission"
                  ? {
                      background: `linear-gradient(135deg, ${ACCENT_PRIMARY}, ${ACCENT_SECONDARY})`,
                    }
                  : {}
              }
            >
              <FiTarget size={18} className={activeTab === "mission" ? "animate-pulse" : ""} />
              <span>{mission.title || "Mission"}</span>
            </button>

            <button
              onClick={() => setActiveTab("vision")}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-500 ${
                activeTab === "vision"
                  ? "text-white shadow-lg scale-105"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              style={
                activeTab === "vision"
                  ? {
                      background: `linear-gradient(135deg, ${ACCENT_SECONDARY}, ${ACCENT_PRIMARY})`,
                    }
                  : {}
              }
            >
              <FiEye size={18} className={activeTab === "vision" ? "animate-pulse" : ""} />
              <span>{vision.title || "Vision"}</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div
          className={`max-w-4xl mx-auto transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            transform: visible ? `translateY(${scrollY * -10}px) translate(${mousePos.x * 3}px, ${mousePos.y * 3}px)` : "translateY(32px)",
            transition: "transform 0.3s ease-out"
          }}
        >
          {/* Mission Content */}
          <div
            className={`transition-all duration-500 ${
              activeTab === "mission"
                ? "opacity-100 translate-x-0 block"
                : "opacity-0 translate-x-8 hidden"
            }`}
          >
            <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl border border-gray-200 p-8 md:p-12 shadow-2xl overflow-hidden">
              {/* Animated gradient overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT_PRIMARY}, ${ACCENT_SECONDARY})`,
                  transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
                  transition: "transform 0.5s ease-out"
                }}
              />

              {/* Floating icon */}
              <div 
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-5"
                style={{
                  background: `radial-gradient(circle, ${ACCENT_PRIMARY}, transparent)`,
                  transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`,
                  transition: "transform 0.4s ease-out"
                }}
              />

              <div className="relative z-10">
                {/* <div 
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT_PRIMARY}, ${ACCENT_SECONDARY})`,
                    transform: `rotate(${scrollY * 10}deg)`,
                    transition: "transform 0.3s ease-out"
                  }}
                >
                  <FiTarget size={28} color="#FFFFFF" />
                </div> */}

                {mission.statement && (
                  <p
                    className="text-lg md:text-xl leading-relaxed font-medium"
                    style={{ color: TEXT_DARK }}
                  >
                    {mission.statement}
                  </p>
                )}

                {Array.isArray(mission.points) && mission.points.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {mission.points.map((line, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 opacity-0 animate-fadeInUp"
                        style={{
                          animationDelay: `${idx * 150}ms`,
                          animationFillMode: "forwards"
                        }}
                      >
                        <div
                          className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: ACCENT_PRIMARY }}
                        />
                        <span className="text-sm md:text-base" style={{ color: TEXT_DARK }}>
                          {line}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Vision Content */}
          <div
            className={`transition-all duration-500 ${
              activeTab === "vision"
                ? "opacity-100 translate-x-0 block"
                : "opacity-0 -translate-x-8 hidden"
            }`}
          >
            <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl border border-gray-200 p-8 md:p-12 shadow-2xl overflow-hidden">
              {/* Animated gradient overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT_SECONDARY}, ${ACCENT_PRIMARY})`,
                  transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
                  transition: "transform 0.5s ease-out"
                }}
              />

              {/* Floating icon */}
              <div 
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-5"
                style={{
                  background: `radial-gradient(circle, ${ACCENT_SECONDARY}, transparent)`,
                  transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
                  transition: "transform 0.4s ease-out"
                }}
              />

              <div className="relative z-10">
                {/* <div 
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                  style={{
                    background: `linear-gradient(135deg, ${ACCENT_SECONDARY}, ${ACCENT_PRIMARY})`,
                    transform: `rotate(${scrollY * -10}deg)`,
                    transition: "transform 0.3s ease-out"
                  }}
                >
                  <FiEye size={28} color="#FFFFFF" />
                </div> */}

                {vision.statement && (
                  <p
                    className="text-lg md:text-xl leading-relaxed font-medium"
                    style={{ color: TEXT_DARK }}
                  >
                    {vision.statement}
                  </p>
                )}

                {Array.isArray(vision.points) && vision.points.length > 0 && (
                  <ul className="mt-6 space-y-3">
                    {vision.points.map((line, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 opacity-0 animate-fadeInUp"
                        style={{
                          animationDelay: `${idx * 150}ms`,
                          animationFillMode: "forwards"
                        }}
                      >
                        <div
                          className="mt-1.5 w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: ACCENT_SECONDARY }}
                        />
                        <span className="text-sm md:text-base" style={{ color: TEXT_DARK }}>
                          {line}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default MissionVisionSection;