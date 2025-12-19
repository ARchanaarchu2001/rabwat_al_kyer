// src/components/ContactHero.jsx
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const ContactHero = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir(); // "rtl" for Arabic, "ltr" for English

  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const particlesRef = useRef([]);
  const floatingShapesRef = useRef([]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mouse move effect for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll effect for parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Apply parallax transformations
  useEffect(() => {
    if (backgroundRef.current) {
      const yMove = scrollY * 0.5;
      const xMove = mousePosition.x * 0.3;
      backgroundRef.current.style.transform = `translate3d(${xMove}px, ${yMove}px, 0) scale(1.1)`;
    }

    if (titleRef.current) {
      const yMove = -scrollY * 0.3 + mousePosition.y * 0.2;
      titleRef.current.style.transform = `translate3d(${
        mousePosition.x * 0.1
      }px, ${yMove}px, 0)`;
    }

    if (subtitleRef.current) {
      const yMove = -scrollY * 0.2 + mousePosition.y * 0.1;
      subtitleRef.current.style.transform = `translate3d(${
        mousePosition.x * 0.05
      }px, ${yMove}px, 0)`;
    }

    if (buttonsRef.current) {
      const yMove = -scrollY * 0.15 + mousePosition.y * 0.08;
      buttonsRef.current.style.transform = `translate3d(${
        mousePosition.x * 0.03
      }px, ${yMove}px, 0)`;
    }

    // Floating shapes parallax
    floatingShapesRef.current.forEach((shape, index) => {
      if (shape) {
        const depth = 0.2 + index * 0.1;
        const yMove = -scrollY * depth + mousePosition.y * depth;
        const xMove = mousePosition.x * depth;
        shape.style.transform = `translate3d(${xMove}px, ${yMove}px, 0) rotate(${
          scrollY * 0.1 + index * 45
        }deg)`;
      }
    });

    // Particles parallax
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        const depth = 0.1 + index * 0.05;
        const yMove = scrollY * depth + mousePosition.y * depth;
        const xMove = mousePosition.x * depth;
        particle.style.transform = `translate3d(${xMove}px, ${yMove}px, 0)`;
      }
    });
  }, [scrollY, mousePosition]);

  // Floating animation for shapes
  useEffect(() => {
    const shapes = floatingShapesRef.current;
    let animationFrame;

    const animateShapes = () => {
      shapes.forEach((shape, index) => {
        if (shape) {
          const time = Date.now() * 0.001;
          const floatSpeed = 0.5 + index * 0.2;
          const floatX = Math.sin(time * floatSpeed + index) * 20;
          const floatY = Math.cos(time * floatSpeed * 1.3 + index) * 15;

          const currentTransform = shape.style.transform || "";
          const baseTransform = currentTransform.split(" ")[0]; // keep main parallax transform
          shape.style.transform = `${baseTransform} translate3d(${floatX}px, ${floatY}px, 0)`;
        }
      });
      animationFrame = requestAnimationFrame(animateShapes);
    };

    animateShapes();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // === i18n values from your JSON ===
  const title = t("contact.heroTitle");
  const subtitle = t("contact.heroSubtitle");
  const phone = t("contact.phone");
  const whatsapp = t("contact.whatsapp");
  const waLabel = t("contact.heroWhatsappButton");
  const callLabel = t("contact.heroCallButton");
  const heroAlt = t("contact.heroAlt");

  const cleanedWhatsApp = String(whatsapp).replace(/[^\d]/g, "");
  const waHref = cleanedWhatsApp
    ? `https://wa.me/${cleanedWhatsApp}`
    : undefined;
  const telHref = phone ? `tel:${String(phone).replace(/[^\d+]/g, "")}` : "#";

  // Generate floating shapes
  const generateFloatingShapes = (count) =>
    Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        ref={(el) => (floatingShapesRef.current[i] = el)}
        className={`absolute opacity-20 transition-all duration-2000 ${
          i % 4 === 0
            ? "bg-[#A2811F] rounded-lg"
            : i % 4 === 1
            ? "bg-[#9D8A4A] rounded-full"
            : i % 4 === 2
            ? "bg-[#8A7734] triangle"
            : "bg-[#A2811F] hexagon"
        }`}
        style={{
          width: `${20 + ((i * 5) % 40)}px`,
          height: `${20 + ((i * 5) % 40)}px`,
          top: `${10 + ((i * 15) % 80)}%`,
          left: `${5 + ((i * 20) % 90)}%`,
          filter: "blur(8px)",
          transform: `rotate(${i * 45}deg)`,
        }}
      />
    ));

  // Generate particles
  const generateParticles = (count) =>
    Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        ref={(el) => (particlesRef.current[i] = el)}
        className="absolute rounded-full bg-white opacity-30"
        style={{
          width: `${1 + (i % 3)}px`,
          height: `${1 + (i % 3)}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${i * 0.1}s`,
        }}
      />
    ));

  return (
    <section
      ref={sectionRef}
      dir={dir}
      className="relative w-full overflow-hidden pt-16"
      style={{ minHeight: "420px" }}
    >
      {/* Enhanced Background with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={backgroundRef}
          className="absolute inset-0 transform transition-transform duration-300 ease-out will-change-transform"
          style={{
            background: `
              linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, rgba(162,129,31,0.3) 100%),
              url("/assets/contact-hero.jpg")
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
            transform: "scale(1.1)",
          }}
        />

        {/* Fallback background image */}
        <img
          src="/assets/contact-hero.jpg"
          alt={heroAlt}
          className="w-full h-full object-cover absolute inset-0"
          style={{ zIndex: -1 }}
        />
      </div>

      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(162,129,31,0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(157,138,74,0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(0,0,0,0.8) 0%, transparent 50%)
          `,
          backgroundSize: "200% 200%",
          animation: "gradientShift 15s ease infinite",
        }}
      />

      {/* Enhanced decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main glow effects */}
        <div
          ref={(el) => (floatingShapesRef.current[8] = el)}
          className="absolute top-10 left-10 w-32 h-32 rounded-full bg-[#A2811F] opacity-20 blur-3xl animate-pulse"
        />
        <div
          ref={(el) => (floatingShapesRef.current[9] = el)}
          className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-[#9D8A4A] opacity-15 blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Additional glow effects */}
        <div
          ref={(el) => (floatingShapesRef.current[10] = el)}
          className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-[#8A7734] opacity-10 blur-2xl"
        />
        <div
          ref={(el) => (floatingShapesRef.current[11] = el)}
          className="absolute bottom-1/3 right-1/3 w-28 h-28 rounded-full bg-[#A2811F] opacity-12 blur-2xl"
        />

        {/* Floating geometric shapes */}
        {generateFloatingShapes(8)}

        {/* Animated particles */}
        {generateParticles(20)}

        {/* Light rays effect */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: `linear-gradient(45deg, 
                transparent 0%, 
                rgba(255,255,255,0.1) 25%, 
                transparent 50%, 
                rgba(162,129,31,0.1) 75%, 
                transparent 100%)`,
              backgroundSize: "200% 200%",
              animation: "lightRay 8s linear infinite",
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col items-center justify-center text-center text-white gap-6">
          {/* Title */}
          <h1
            ref={titleRef}
            className={`text-4xl md:text-5xl lg:text-6xl font-black transition-all duration-1000 delay-200 transform-gpu ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              background:
                "linear-gradient(135deg, #ffffff 0%, #F7F1E9 20%, #A2811F 60%, #9D8A4A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: `
                0 0 40px rgba(162,129,31,0.5),
                0 4px 8px rgba(0,0,0,0.3),
                0 8px 16px rgba(0,0,0,0.2)
              `,
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))",
              transformStyle: "preserve-3d",
            }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className={`text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed transition-all duration-1000 delay-400 transform-gpu ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              backdropFilter: "blur(10px)",
              background: "rgba(255,255,255,0.05)",
              padding: "1rem 2rem",
              borderRadius: "2rem",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {subtitle}
          </p>

          {/* Buttons */}
          <div
            ref={buttonsRef}
            className={`mt-4 flex flex-wrap gap-4 justify-center transition-all duration-1000 delay-600 transform-gpu ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* {waHref && (
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="group relative px-8 py-4 text-sm md:text-base font-semibold rounded-xl bg-gradient-to-r from-[#A2811F] to-[#9D8A4A] text-white overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:-translate-y-1 active:scale-105"
                style={{
                  boxShadow: "0 8px 24px rgba(162,129,31,0.4)",
                }}
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 2s infinite",
                  }}
                />
                <span className="relative flex items-center gap-2">
                  <span className="text-lg">💬</span>
                  {waLabel}
                </span>
              </a>
            )} */}

            {/* <a
              href={telHref}
              className="group relative px-8 py-4 text-sm md:text-base font-semibold rounded-xl border-2 border-white/70 text-white overflow-hidden transition-all duration-300 hover:scale-110 hover:border-[#A2811F] hover:shadow-2xl hover:-translate-y-1 active:scale-105"
              style={{
                backdropFilter: "blur(10px)",
                background: "rgba(255,255,255,0.05)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#A2811F] to-[#9D8A4A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                }}
              />
              <span className="relative flex items-center gap-2">
                <span className="text-lg">📞</span>
                {callLabel}
              </span>
            </a> */}
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes gradientShift {
          0%,
          100% {
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

        @keyframes lightRay {
          0% {
            transform: translateX(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) rotate(45deg);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .triangle {
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }

        .hexagon {
          clip-path: polygon(
            25% 0%,
            75% 0%,
            100% 50%,
            75% 100%,
            25% 100%,
            0% 50%
          );
        }

        .transform-gpu {
          transform: translate3d(0, 0, 0);
        }

        @keyframes enhancedPulse {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.1);
          }
        }

        .animate-pulse {
          animation: enhancedPulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
};

export default ContactHero;
