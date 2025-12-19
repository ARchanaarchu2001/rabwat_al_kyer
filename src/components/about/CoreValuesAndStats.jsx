// src/components/CoreValuesAndStats.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  FiAward,
  FiUsers,
  FiShield,
  FiThumbsUp,
  FiHeart,
  FiTrendingUp,
} from "react-icons/fi";
import { useTranslation } from "react-i18next";

const iconMap = {
  quality: FiAward,
  relationships: FiHeart,
  reliability: FiShield,
  ethics: FiTrendingUp,
  teamwork: FiUsers,
  empowerment: FiThumbsUp,
  commitment: FiThumbsUp,
};

const CoreValuesAndStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [countersVisible, setCountersVisible] = useState(false);
  const [animatedCounters, setAnimatedCounters] = useState({});
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

  const sectionRef = useRef(null);
  const countersRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const decorRef1 = useRef(null);
  const decorRef2 = useRef(null);
  const particlesRef = useRef([]);

  // Get core values from i18n
  const coreValues =
    t("coreValues.items", {
      returnObjects: true,
      defaultValue: [],
    }) || [];

  // ✅ Get counters from i18n (EN + AR)
  const counters =
    t("counters.items", {
      returnObjects: true,
      defaultValue: [],
    }) || [];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Enhanced scroll parallax
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress =
        (window.innerHeight - rect.top) /
        (window.innerHeight + rect.height);

      if (scrollProgress >= 0 && scrollProgress <= 1) {
        if (decorRef1.current) {
          const decor1Speed = scrollProgress * 80;
          decorRef1.current.style.transform = `
            translate(${decor1Speed + mousePosition.x * 0.3}px, 
                      ${decor1Speed * 0.4 + mousePosition.y * 0.3}px) 
            rotate(${scrollProgress * 45 + mousePosition.x * 0.5}deg)
            scale(${1 + scrollProgress * 0.1})
          `;
        }

        if (decorRef2.current) {
          const decor2Speed = scrollProgress * -60;
          decorRef2.current.style.transform = `
            translate(${decor2Speed + mousePosition.x * 0.2}px, 
                      ${decor2Speed * 0.5 + mousePosition.y * 0.2}px) 
            rotate(${-scrollProgress * 30 + mousePosition.y * 0.5}deg)
            scale(${1 + scrollProgress * 0.05})
          `;
        }

        // Cards parallax
        cardsRef.current.forEach((card, index) => {
          if (card) {
            const cardSpeed = (index % 4) * 0.3 + 0.5;
            const yOffset = scrollProgress * 30 * cardSpeed;
            card.style.transform = `translateY(${yOffset}px)`;
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [mousePosition]);

  // Floating particles animation
  useEffect(() => {
    const particles = particlesRef.current;
    let animationFrame;

    const animateParticles = () => {
      particles.forEach((particle, index) => {
        if (particle) {
          const time = Date.now() * 0.001;
          const speed = 0.5 + index * 0.1;
          const x = Math.sin(time * speed + index) * 10;
          const y = Math.cos(time * speed * 1.3 + index) * 8;

          particle.style.transform = `translate(${x}px, ${y}px) rotate(${
            time * 20 + index * 45
          }deg)`;
        }
      });
      animationFrame = requestAnimationFrame(animateParticles);
    };

    animateParticles();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Scroll reveal for cards
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = parseInt(entry.target.dataset.index);
        if (entry.isIntersecting) {
          setVisibleCards((prev) => new Set([...prev, index]));
        }
      });
    }, observerOptions);

    if (headingRef.current) {
      headingRef.current.dataset.index = -1;
      observer.observe(headingRef.current);
    }

    cardsRef.current.forEach((card, index) => {
      if (card) {
        card.dataset.index = index;
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Counter visibility (when stats come into view)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCountersVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (countersRef.current) {
      observer.observe(countersRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // ✅ Counter animation using i18n counters
  useEffect(() => {
    if (!countersVisible || !counters.length) return;

    const duration = 2000; // 2s
    const frameDuration = 16; // ~60fps

    counters.forEach((counter) => {
      const raw = String(counter.value || "").trim();

      // Only animate pure numbers + optional '+' or '%' at the end
      const match = raw.match(/^(\d+)([+%]*)$/);

      // If not matching (like "24/7"), set once and skip animation
      if (!match) {
        setAnimatedCounters((prev) => ({
          ...prev,
          [counter.id]: raw,
        }));
        return;
      }

      const target = parseInt(match[1], 10);
      const suffix = match[2] || "";
      let current = 0;
      const steps = Math.round(duration / frameDuration);
      const increment = target / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep += 1;
        current += increment;

        if (currentStep >= steps) {
          setAnimatedCounters((prev) => ({
            ...prev,
            [counter.id]: target + suffix,
          }));
          clearInterval(timer);
        } else {
          setAnimatedCounters((prev) => ({
            ...prev,
            [counter.id]: Math.floor(current) + suffix,
          }));
        }
      }, frameDuration);
    });
  }, [countersVisible]);

  // Generate particles
  const generateParticles = (count) => {
    return Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        ref={(el) => (particlesRef.current[i] = el)}
        className={`absolute rounded-full opacity-20 transition-all duration-1000 ${
          i % 3 === 0
            ? "bg-[#A2811F]"
            : i % 3 === 1
            ? "bg-[#9D8A4A]"
            : "bg-[#8A7734]"
        }`}
        style={{
          width: `${4 + (i % 3)}px`,
          height: `${4 + (i % 3)}px`,
          top: `${10 + ((i * 7) % 80)}%`,
          left: `${5 + ((i * 11) % 90)}%`,
          animationDelay: `${i * 0.2}s`,
        }}
      />
    ));
  };

  return (
    <>
      {/* Core Values Section */}
      <section
        ref={sectionRef}
        dir={dir}
        className="w-full bg-gradient-to-br from-[#f7f1e9] via-[#f5ede3] to-[#f2e8dd] py-16 md:py-24 relative overflow-hidden"
      >
        {/* decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            ref={decorRef1}
            className="absolute top-20 -right-10 w-48 h-48 rounded-full opacity-[0.08] transition-transform duration-300 ease-out will-change-transform"
            style={{
              background: "radial-gradient(circle, #A2811F, transparent 70%)",
              filter: "blur(8px)",
            }}
          />

          <div
            ref={decorRef2}
            className="absolute -bottom-12 -left-8 w-40 h-40 rounded-3xl opacity-[0.06] transition-transform duration-300 ease-out will-change-transform"
            style={{
              background: "linear-gradient(135deg, #A2811F, #9D8A4A)",
              filter: "blur(12px)",
            }}
          />

          {generateParticles(12)}

          <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-[#A2811F] opacity-30 animate-float-slow" />
          <div className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-[#9D8A4A] opacity-40 animate-float-medium" />
          <div
            className="absolute top-3/4 left-1/2 w-2 h-2 rounded-full bg-[#8A7734] opacity-50 animate-float-fast"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Heading */}
          <div
            ref={headingRef}
            className={`mb-12 md:mb-16 transition-all duration-1000 ${
              visibleCards.has(-1)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            } ${dir === "rtl" ? "text-right" : "text-left"}`}
          >
            <h2
              className="text-3xl md:text-5xl font-bold mb-4"
              style={{
                background:
                  "linear-gradient(135deg, #000000 0%, #A2811F 50%, #8A7734 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
              }}
            >
              {t("coreValues.heading")}
            </h2>
            <div
              className={`h-1.5 rounded-full transition-all duration-1000 delay-300 transform origin-left ${
                visibleCards.has(-1)
                  ? "w-32 opacity-100 scale-x-100"
                  : "w-0 opacity-0 scale-x-0"
              }`}
              style={{
                background:
                  "linear-gradient(90deg, #A2811F, #9D8A4A, #8A7734)",
                boxShadow: "0 2px 8px rgba(162, 129, 31, 0.3)",
              }}
            />
          </div>

          {/* Values Grid */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 ${
              dir === "rtl" ? "text-right" : "text-left"
            }`}
          >
            {coreValues.map((item, index) => {
              const Icon = iconMap[item.id] || FiAward;
              const cardVisible = visibleCards.has(index);
              const delay = index * 100;

              return (
                <div
                  key={`${item.id}-${index}`}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className={`group relative flex flex-col items-start gap-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/50 px-5 py-5 transition-all duration-700 ease-out cursor-pointer overflow-hidden ${
                    cardVisible
                      ? "opacity-100 translate-y-0 scale-100"
                      : "opacity-0 translate-y-12 scale-95"
                  } ${dir === "rtl" ? "items-end" : "items-start"}`}
                  style={{
                    transitionDelay: `${delay}ms`,
                    transform: cardVisible ? "translateY(0)" : "translateY(50px)",
                  }}
                >
                  {/* hover background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#A2811F]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* border */}
                  <div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#A2811F] via-[#9D8A4A] to-[#8A7734] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      padding: "2px",
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                    }}
                  />

                  {/* Icon */}
                  <div
                    className={`relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#A2811F] to-[#9D8A4A] text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg z-10 ${
                      dir === "rtl" ? "ml-0 ml-auto" : ""
                    }`}
                  >
                    <Icon size={22} />
                    <div className="absolute inset-0 rounded-xl bg-[#A2811F] opacity-0 group-hover:opacity-40 group-hover:animate-ping-slow transition-opacity duration-300" />
                  </div>

                  {/* Label + Description */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base md:text-lg font-semibold text-gray-800 transition-all duration-500 group-hover:text-[#A2811F]">
                        {item.label}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Hover accent line */}
                  <div className="absolute bottom-0 left-4 right-4 h-1 bg-gradient-to-r from-transparent via-[#A2811F] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-full" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section (now using i18n counters) */}
      <section ref={countersRef} className="relative w-full overflow-hidden" dir={dir}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-animation-mesh" />
          </div>
          <div className="absolute inset-0 bg-noise opacity-[0.02]" />
        </div>

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(162,129,31,0.3) 100%)",
          }}
        />

        <div className="absolute inset-0 pointer-events-none">
          {generateParticles(8)}
          <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-[#A2811F] opacity-60 animate-float-slow" />
          <div className="absolute top-2/3 right-1/4 w-3 h-3 rounded-full bg-[#9D8A4A] opacity-50 animate-float-medium" />
          <div
            className="absolute bottom-1/3 left-2/3 w-5 h-5 rounded-full bg-[#A2811F] opacity-40 animate-float-slow"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {counters.map((item, index) => (
              <div
                key={item.id}
                className={`counter-item group relative flex flex-col items-center text-white transition-all duration-1000 cursor-pointer p-6 rounded-2xl backdrop-blur-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#A2811F]/30 ${
                  countersVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-12 scale-95"
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#A2811F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                <div className="relative mb-3">
                  <span className="text-4xl md:text-6xl font-black leading-none transition-all duration-500 group-hover:scale-110 group-hover:text-[#A2811F] inline-block">
                    {animatedCounters[item.id] || item.value}
                  </span>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#A2811F] animate-ping-slow" />
                    <div
                      className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-[#9D8A4A] animate-ping-slow"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                </div>

                <span className="text-sm md:text-base font-semibold text-gray-300 group-hover:text-white transition-all duration-500 group-hover:translate-y-1 text-center">
                  {item.label}
                </span>

                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-20 h-0.5 bg-gradient-to-r from-[#A2811F] to-[#9D8A4A] transition-all duration-700 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Styles – note: plain <style>, no jsx/global attrs */}
      <style>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-15px) rotate(120deg);
          }
          66% {
            transform: translateY(-8px) rotate(240deg);
          }
        }

        @keyframes float-medium {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-12px) scale(1.1);
          }
        }

        @keyframes float-fast {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(3);
            opacity: 0;
          }
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 3s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .bg-gradient-animation-mesh {
          background:
            radial-gradient(circle at 20% 80%, rgba(162, 129, 31, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(157, 138, 74, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(138, 119, 52, 0.06) 0%, transparent 50%);
          background-size: 200% 200%;
          animation: gradientShift 15s ease infinite;
        }

        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 0%;
          }
          25% {
            background-position: 100% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          75% {
            background-position: 0% 100%;
          }
        }

        .counter-item {
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .counter-item:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 20px 40px rgba(162, 129, 31, 0.2);
        }
      `}</style>
    </>
  );
};

export default CoreValuesAndStats;
