// src/components/FaqSection.jsx
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

// Brand palette
const ACCENT_PRIMARY = "#A2811F";
const ACCENT_SECONDARY = "#9D8A4A";
const BG_SECTION = "#F7F7F7";
const CARD_BG = "#FFFFFF";
const TEXT_DARK = "#111111";
const TEXT_MUTED = "#555555";

const FaqSection = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

  const sectionRef = useRef(null);
  const faqItemsRef = useRef([]);
  const headingRef = useRef(null);
  const decorRef1 = useRef(null);
  const decorRef2 = useRef(null);

  // get FAQs from i18n
  const faqs =
    t("faq.items", {
      returnObjects: true,
      defaultValue: [],
    }) || [];

  const [openIndex, setOpenIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [visibleItems, setVisibleItems] = useState(new Set());

  // Scroll-triggered reveal animation - animates every time
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const index = parseInt(entry.target.dataset.index);
        if (entry.isIntersecting) {
          // Add to visible items when scrolling into view
          setVisibleItems(prev => new Set([...prev, index]));
        } else {
          // Remove from visible items when scrolling out of view
          setVisibleItems(prev => {
            const newSet = new Set(prev);
            newSet.delete(index);
            return newSet;
          });
        }
      });
    }, observerOptions);

    // Observe heading
    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    // Observe all FAQ items
    faqItemsRef.current.forEach((item, index) => {
      if (item) {
        item.dataset.index = index;
        observer.observe(item);
      }
    });

    return () => observer.disconnect();
  }, [faqs.length]);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      
      if (scrollProgress >= 0 && scrollProgress <= 1) {
        // Decorative elements parallax
        if (decorRef1.current) {
          const decor1Speed = scrollProgress * 40;
          decorRef1.current.style.transform = `translate(${decor1Speed}px, ${decor1Speed * 0.5}px) rotate(${scrollProgress * 30}deg)`;
        }

        if (decorRef2.current) {
          const decor2Speed = scrollProgress * -35;
          decorRef2.current.style.transform = `translate(${decor2Speed}px, ${decor2Speed * 0.6}px) rotate(${-scrollProgress * 25}deg)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!faqs.length) return null;

  const toggleItem = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      dir={dir}
      className="w-full py-12 md:py-16 relative overflow-hidden"
      style={{ backgroundColor: BG_SECTION }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Decorative circle 1 */}
        <div
          ref={decorRef1}
          className="absolute top-20 right-10 w-40 h-40 rounded-full opacity-10 transition-transform duration-100 ease-out will-change-transform"
          style={{
            background: `radial-gradient(circle, ${ACCENT_PRIMARY}, transparent 70%)`,
          }}
        />
        
        {/* Decorative square 2 */}
        <div
          ref={decorRef2}
          className="absolute bottom-20 left-10 w-32 h-32 rounded-3xl opacity-8 transition-transform duration-100 ease-out will-change-transform"
          style={{
            background: `linear-gradient(135deg, ${ACCENT_PRIMARY}, ${ACCENT_SECONDARY})`,
          }}
        />

        {/* Floating dots */}
        <div className="absolute top-1/3 left-1/4 w-3 h-3 rounded-full opacity-30 animate-float" style={{ backgroundColor: ACCENT_PRIMARY }} />
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full opacity-40 animate-float-delayed" style={{ backgroundColor: ACCENT_SECONDARY }} />
        <div className="absolute top-2/3 right-1/3 w-4 h-4 rounded-full opacity-25 animate-float" style={{ backgroundColor: ACCENT_PRIMARY, animationDelay: '1s' }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading with scroll reveal */}
        <div 
          ref={headingRef}
          data-index="-1"
          className={`text-center mb-8 md:mb-12 transition-all duration-700 ${
            visibleItems.has(-1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ color: TEXT_DARK }}
          >
            {t("faq.heading")}
          </h2>
          <div
            className={`mt-4 mx-auto h-1 rounded-full transition-all duration-700 delay-200 ${
              visibleItems.has(-1) ? 'w-24 opacity-100' : 'w-0 opacity-0'
            }`}
            style={{
              background: `linear-gradient(90deg, ${ACCENT_PRIMARY}, ${ACCENT_SECONDARY})`,
            }}
          />
          {/* <p 
            className={`mt-4 text-sm md:text-base transition-all duration-700 delay-300 ${
              visibleItems.has(-1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ color: TEXT_MUTED }}
          >
            {t("faq.subheading") || "Find answers to common questions"}
          </p> */}
        </div>

        {/* FAQ list with scroll-triggered reveal */}
        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = index === openIndex;
            const isHovered = index === hoveredIndex;
            const isVisible = visibleItems.has(index);
            
            return (
              <div
                key={index}
                ref={(el) => (faqItemsRef.current[index] = el)}
                className={`transition-all duration-700 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-x-0 translate-y-0' 
                    : index % 2 === 0 
                      ? 'opacity-0 -translate-x-20 translate-y-10' 
                      : 'opacity-0 translate-x-20 translate-y-10'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className="faq-card relative rounded-2xl overflow-hidden transition-all duration-300"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    backgroundColor: CARD_BG,
                    border: `2px solid ${isOpen ? ACCENT_PRIMARY : 'transparent'}`,
                    boxShadow: isOpen || isHovered
                      ? `0 12px 30px rgba(162, 129, 31, 0.15)`
                      : "0 4px 12px rgba(0,0,0,0.05)",
                    transform: isHovered && !isOpen ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)',
                  }}
                >
                  {/* Top gradient accent */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
                    style={{
                      background: `linear-gradient(90deg, ${ACCENT_PRIMARY}, ${ACCENT_SECONDARY})`,
                      opacity: isHovered || isOpen ? 1 : 0,
                      transform: isHovered || isOpen ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                  />

                  {/* Number badge */}
                  <div 
                    className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                    style={{
                      backgroundColor: isOpen ? ACCENT_PRIMARY : `${ACCENT_PRIMARY}15`,
                      color: isOpen ? '#FFFFFF' : ACCENT_PRIMARY,
                      transform: isOpen ? 'scale(1.1) rotate(360deg)' : 'scale(1) rotate(0deg)',
                    }}
                  >
                    {index + 1}
                  </div>

                  {/* Question row */}
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    className="w-full flex items-center justify-between pl-16 pr-5 md:pr-6 py-4 md:py-5 text-sm md:text-base font-semibold focus:outline-none group"
                    style={{
                      color: isOpen ? ACCENT_PRIMARY : TEXT_DARK,
                      textAlign: "start",
                    }}
                  >
                    <span 
                      className={`flex-1 transition-all duration-300 ${dir === "rtl" ? "text-right" : "text-left"}`}
                    >
                      {item.q}
                    </span>

                    {/* Animated chevron icon */}
                    <div
                      className="ml-4 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 flex-shrink-0"
                      style={{
                        border: `2px solid ${isOpen ? ACCENT_PRIMARY : ACCENT_SECONDARY}`,
                        color: isOpen ? "#FFFFFF" : ACCENT_PRIMARY,
                        backgroundColor: isOpen ? ACCENT_PRIMARY : "transparent",
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    >
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 16 16" 
                        fill="none"
                      >
                        <path 
                          d="M4 6L8 10L12 6" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Answer with smooth animation */}
                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: isOpen ? '500px' : '0',
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div 
                      className="px-5 md:px-6 pb-4 md:pb-5 pt-1 pl-16"
                      style={{
                        borderTop: `1px solid ${ACCENT_SECONDARY}20`,
                      }}
                    >
                      <p
                        className={`text-sm md:text-base leading-relaxed ${dir === "rtl" ? "text-right" : "text-left"}`}
                        style={{ color: TEXT_MUTED }}
                      >
                        {item.a}
                      </p>
                    </div>
                  </div>

                  {/* Side accent bar */}
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300"
                    style={{
                      background: `linear-gradient(180deg, ${ACCENT_PRIMARY}, ${ACCENT_SECONDARY})`,
                      opacity: isOpen ? 1 : 0,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA with scroll reveal */}
        <div 
          className={`mt-10 text-center transition-all duration-700 delay-500 ${
            visibleItems.size > faqs.length / 2 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          {/* <p className="text-sm md:text-base mb-4" style={{ color: TEXT_MUTED }}>
            {t("faq.stillHaveQuestions") || "Still have questions?"}
          </p> */}
          <a
          href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            style={{
              background: `linear-gradient(135deg, ${ACCENT_PRIMARY}, ${ACCENT_SECONDARY})`,
            }}
          >
            <span>Contact Us</span>
            {/* <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span> */}
          </a>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
        }

        .faq-card {
          position: relative;
        }

        .faq-card::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 1rem;
          padding: 2px;
          background: linear-gradient(135deg, ${ACCENT_PRIMARY}, ${ACCENT_SECONDARY});
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }

        .faq-card:hover::after {
          opacity: 0.3;
        }
      `}</style>
    </section>
  );
};

export default FaqSection;