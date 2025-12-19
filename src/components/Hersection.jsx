import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

// Brand colors
const CREAM = "#f5f0eb";
const GOLD = "#A3801E";
const LIGHT_GOLD = "#cfa54a";
const DARK_GOLD = "#8A7734";

export default function HeroSection() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const isRTL = dir === "rtl";

  // this expects a "hero" object in your translation JSON
  const hero = t("hero", { returnObjects: true }) || {};

  function getFallbackImage(id) {
    const images = {
      expert: "/assets/hero-1.jpg",
      quality: "/assets/hero-2.jpg",
      support: "/assets/hero-3.jpg",
      default: "/assets/hero-1.jpg",
    };
    return images[id] || images.default;
  }

  // Build slides ONLY from JSON
  const slides = useMemo(() => {
    const rawSlides = hero?.slides;

    if (Array.isArray(rawSlides) && rawSlides.length > 0) {
      return rawSlides.map((slide, index) => ({
        id: slide.id || `slide-${index}`,
        title: slide.title || "",
        description: slide.description || "",
        cta: slide.cta || "",
        ctaLink: slide.ctaLink || "#",
        cta2: slide.cta2 || "",
        cta2Link: slide.cta2Link || "#",  
        badge: slide.badge || "",
        image: slide.image || getFallbackImage(slide.id || `slide-${index}`),
      }));
    }

    // No slides in JSON → show nothing (or you can show a simple fallback message)
    return [];
  }, [hero]);

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide
  useEffect(() => {
    if (!slides.length) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (!slides.length) {
    // Optional: temporary debug view so you know it's a translation issue
    // return (
    //   <section className="min-h-[50vh] flex items-center justify-center bg-gray-900 text-white">
    //     <p>No hero slides found in i18n JSON (hero.slides).</p>
    //   </section>
    // );
    return null;
  }

  const current = slides[currentSlide];

  return (
    <section
      id="home"
      dir={dir}
      className="relative min-h-screen flex items-center overflow-hidden bg-gray-900"
    >
      {/* Background Slides with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${current.image})`,
            }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Gold Gradient Overlay */}
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background: `linear-gradient(135deg, ${GOLD}20 0%, ${DARK_GOLD}30 50%, transparent 100%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Text Content */}
          <div
            className={`space-y-8 ${
              isRTL ? "lg:text-right lg:order-2" : "lg:text-left"
            }`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${currentSlide}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Badge */}
                {/* {current.badge && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-white backdrop-blur-sm border border-white/30"
                    style={{ backgroundColor: `${GOLD}30` }}
                  >
                    {current.badge}
                  </motion.span>
                )} */}

                {/* Title (word-by-word animation) */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white pt-24">
                  {current.title.split(" ").map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.6 + index * 0.1,
                      }}
                      className="inline-block mr-2"
                    >
                      {word}
                    </motion.span>
                  ))}
                </h1>

                {/* Description */}
                {current.description && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="text-xl text-gray-200 leading-relaxed max-w-2xl"
                  >
                    {current.description}
                  </motion.p>
                )}

                {/* CTA Button */}
                {(current.cta || current.cta2 )  && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className={`flex  flex-wrap gap-4 ${
                      isRTL ? "lg:justify-end" : "lg:justify-start"
                    } justify-center`}
                  >
                    {current.cta && (
                    <a
                      href={current.ctaLink}
                      className="px-8 py-4 rounded-xl font-bold text-white shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 inline-flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${GOLD}, ${LIGHT_GOLD})`,
                      }}
                    >
                      {current.cta}
                    </a>
                    )}

                    {current.cta2 && (
                      <a
                          href={current.cta2Link}
                          className="px-8 py-4 rounded-xl font-bold border border-white/70 text-white/90 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 inline-flex items-center justify-center"
                        >
                          {current.cta2}
                        </a>
                    )}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Slide Indicators (dots) */}
            <div
              className={`flex items-center gap-4 ${
                isRTL ? "lg:justify-end" : "lg:justify-start"
              } justify-center`}
            >
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "scale-125"
                      : "scale-100 hover:scale-110"
                  }`}
                  style={{
                    backgroundColor:
                      index === currentSlide ? GOLD : "#ffffff60",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
