// src/components/AboutIntro.jsx
import React, { useEffect, useState, useRef } from "react";
import { FiUserCheck, FiAward } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const AboutIntro = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const badgesRef = useRef([]);
  const textRef = useRef(null);
  const decorRef1 = useRef(null);
  const decorRef2 = useRef(null);
  const particlesRef = useRef([]);

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

  // Scroll parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const progress =
        (window.innerHeight - rect.top) /
        (window.innerHeight + rect.height);
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Apply parallax transformations
  useEffect(() => {
    if (decorRef1.current) {
      const xMove = scrollProgress * 30 + mousePosition.x * 0.3;
      const yMove = scrollProgress * 15 + mousePosition.y * 0.3;
      decorRef1.current.style.transform = `translate(${xMove}px, ${yMove}px) rotate(${
        scrollProgress * 20
      }deg) scale(${1 + scrollProgress * 0.1})`;
    }

    if (decorRef2.current) {
      const xMove = scrollProgress * -25 + mousePosition.x * 0.2;
      const yMove = scrollProgress * 12 + mousePosition.y * 0.2;
      decorRef2.current.style.transform = `translate(${xMove}px, ${yMove}px) rotate(${
        -scrollProgress * 15
      }deg) scale(${1 + scrollProgress * 0.05})`;
    }

    // Title parallax
    if (titleRef.current) {
      const yMove = scrollProgress * -10;
      titleRef.current.style.transform = `translateY(${yMove}px)`;
    }

    // Text parallax
    if (textRef.current) {
      const yMove = scrollProgress * 8;
      textRef.current.style.transform = `translateY(${yMove}px)`;
    }

    // Badges parallax
    badgesRef.current.forEach((badge, index) => {
      if (badge) {
        const delay = index * 0.2;
        const yMove = scrollProgress * (index % 2 === 0 ? -6 : 6);
        badge.style.transform = `translateY(${yMove}px) translateX(${
          mousePosition.x * 0.08
        }px)`;
        badge.style.transitionDelay = `${delay}s`;
      }
    });
  }, [scrollProgress, mousePosition]);

  // Floating particles animation
  useEffect(() => {
    const particles = particlesRef.current;
    let animationFrame;

    const animateParticles = () => {
      particles.forEach((particle, index) => {
        if (particle) {
          const time = Date.now() * 0.001;
          const speed = 0.3 + index * 0.08;
          const x = Math.sin(time * speed + index) * 12;
          const y = Math.cos(time * speed * 1.2 + index) * 10;

          particle.style.transform = `translate(${x}px, ${y}px) rotate(${
            time * 15 + index * 30
          }deg)`;
        }
      });
      animationFrame = requestAnimationFrame(animateParticles);
    };

    animateParticles();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Generate floating particles
  const generateParticles = (count) => {
    return Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        ref={(el) => (particlesRef.current[i] = el)}
        className={`absolute rounded-full opacity-10 transition-all duration-2000 ${
          i % 3 === 0
            ? "bg-[#A2811F]"
            : i % 3 === 1
            ? "bg-[#9D8A4A]"
            : "bg-[#8A7734]"
        }`}
        style={{
          width: `${2 + (i % 3)}px`,
          height: `${2 + (i % 3)}px`,
          top: `${15 + ((i * 9) % 70)}%`,
          left: `${10 + ((i * 13) % 85)}%`,
          animationDelay: `${i * 0.3}s`,
        }}
      />
    ));
  };

  return (
    <section
      ref={sectionRef}
      dir={dir}
      className="w-full bg-gradient-to-br from-white via-[#fafafa] to-[#f5f5f5] py-16 md:py-24 relative overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Main decorative shapes */}
        <div
          ref={decorRef1}
          className="absolute top-10 -right-16 w-56 h-56 rounded-full opacity-[0.03] transition-transform duration-500 ease-out will-change-transform"
          style={{
            background: "radial-gradient(circle, #A2811F, transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        <div
          ref={decorRef2}
          className="absolute -bottom-16 -left-12 w-44 h-44 rounded-3xl opacity-[0.02] transition-transform duration-500 ease-out will-change-transform"
          style={{
            background: "linear-gradient(135deg, #A2811F, #9D8A4A)",
            filter: "blur(15px)",
          }}
        />

        {/* Subtle geometric pattern */}
        <div
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage: `
              linear-gradient(30deg, #A2811F 12%, transparent 12.5%, transparent 87%, #A2811F 87.5%, #A2811F),
              linear-gradient(150deg, #A2811F 12%, transparent 12.5%, transparent 87%, #A2811F 87.5%, #A2811F)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating particles */}
        {generateParticles(6)}

        {/* Animated floating elements */}
        <div className="absolute top-1/3 left-1/5 w-4 h-4 rounded-full bg-[#A2811F] opacity-10 animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/5 w-3 h-3 rounded-full bg-[#9D8A4A] opacity-15 animate-float-medium" />
        <div className="absolute top-2/3 left-2/3 w-2 h-2 rounded-full bg-[#8A7734] opacity-20 animate-float-fast" />

        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 opacity-[0.008]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 99%, #A2811F 99%),
              linear-gradient(0deg, transparent 99%, #A2811F 99%)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Title with Parallax */}
        <div
          ref={titleRef}
          className={`transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } ${dir === "rtl" ? "text-right" : "text-left"}`}
        >
          <h2
            className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-gray-900"
            style={{
              background:
                "linear-gradient(135deg, #1a1a1a 0%, #9D8A4A 40%, #A2811F 80%, #8A7734 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
            }}
          >
            {t("aboutIntro.title")}
          </h2>

          {/* Animated underline */}
          <div
            className={`h-1 rounded-full transition-all duration-1200 delay-300 transform origin-left ${
              isVisible
                ? "w-32 opacity-100 scale-x-100"
                : "w-0 opacity-0 scale-x-0"
            }`}
            style={{
              background:
                "linear-gradient(90deg, #9D8A4A 0%, #A2811F 50%, #8A7734 100%)",
              boxShadow: "0 1px 8px rgba(162, 129, 31, 0.2)",
            }}
          />
        </div>

        {/* Enhanced Badges with Staggered Parallax */}
        <div
          className={`mt-10 flex flex-wrap gap-6 md:gap-8 ${
            dir === "rtl" ? "justify-start" : ""
          }`}
        >
          {/* Expert Technician */}
          <div
            ref={(el) => (badgesRef.current[0] = el)}
            className={`relative flex items-center gap-4 transition-all duration-800 delay-200 group cursor-pointer p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-[#9D8A4A]/50 shadow-sm hover:shadow-lg ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-6"
            }`}
          >
            <div className="relative">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#9D8A4A] to-[#A2811F] text-white transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg z-10">
                <FiUserCheck
                  size={24}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-xl bg-[#9D8A4A] opacity-0 group-hover:opacity-30 group-hover:animate-ping-slow transition-opacity duration-300 -z-10" />
            </div>
            <span className="text-base md:text-lg font-semibold text-gray-800 transition-all duration-500 group-hover:text-[#A2811F] group-hover:translate-x-2">
              {t("aboutIntro.badges.expert")}
            </span>

            {/* Connecting line on hover */}
            <div className="absolute bottom-0 left-12 right-0 h-0.5 bg-gradient-to-r from-[#9D8A4A] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
          </div>

          {/* Best Quality Services */}
          <div
            ref={(el) => (badgesRef.current[1] = el)}
            className={`relative flex items-center gap-4 transition-all duration-800 delay-400 group cursor-pointer p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-[#A2811F]/50 shadow-sm hover:shadow-lg ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-6"
            }`}
          >
            <div className="relative">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#A2811F] to-[#9D8A4A] text-white transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12 group-hover:shadow-lg z-10">
                <FiAward
                  size={24}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-xl bg-[#A2811F] opacity-0 group-hover:opacity-30 group-hover:animate-ping-slow transition-opacity duration-300 -z-10" />
            </div>
            <span className="text-base md:text-lg font-semibold text-gray-800 transition-all duration-500 group-hover:text-[#9D8A4A] group-hover:translate-x-2">
              {t("aboutIntro.badges.quality")}
            </span>

            {/* Connecting line on hover */}
            <div className="absolute bottom-0 left-12 right-0 h-0.5 bg-gradient-to-r from-[#A2811F] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
          </div>
        </div>

        {/* Enhanced Body Text with Parallax */}
        <div
          ref={textRef}
          className={`mt-10 transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } ${dir === "rtl" ? "text-right" : "text-left"}`}
        >
          <p className="text-base md:text-lg leading-relaxed text-gray-700 font-medium max-w-3xl bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm">
            {t("aboutIntro.body")}
          </p>

          {/* Text underline animation */}
          <div
            className={`mt-6 h-0.5 rounded-full transition-all duration-1000 delay-900 transform origin-left ${
              isVisible
                ? "w-40 opacity-100 scale-x-100"
                : "w-0 opacity-0 scale-x-0"
            }`}
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #9D8A4A 30%, #A2811F 70%, transparent 100%)",
            }}
          />
        </div>
      </div>

      {/* Enhanced Styles (plain <style>, not style jsx) */}
      <style>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-8px) rotate(120deg);
          }
          66% {
            transform: translateY(-4px) rotate(240deg);
          }
        }

        @keyframes float-medium {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-6px) scale(1.03);
          }
        }

        @keyframes float-fast {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(2);
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
      `}</style>
    </section>
  );
};

export default AboutIntro;
