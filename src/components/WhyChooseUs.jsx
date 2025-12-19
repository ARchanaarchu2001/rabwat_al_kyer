import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const sectionRef = useRef(null);

  const cards = [
    { id: "expert" },
    { id: "fast" },
    { id: "pricing" },
    { id: "priority" },
  ];

  // Scroll Parallax
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const offsetTop = sectionRef.current.offsetTop;
      const scroll = window.scrollY - offsetTop;
      const move = scroll * 0.12;
      sectionRef.current.style.transform = `translateY(${move}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse Parallax for cards
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `translate(${x * 0.02}px, ${y * 0.02}px)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "translate(0px, 0px)";
  };

  return (
    <motion.section
      ref={sectionRef}
      id="why-us"
      dir={dir}
      className="w-full relative py-16 md:py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      style={{
        backgroundColor: "#CFCABF",
        willChange: "transform",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="text-3xl md:text-5xl font-bold mb-3 leading-tight"
            style={{ color: "#A3801E" }}
          >
            {t("whyChoose.heading")}
          </h2>
        </motion.div>

        {/* Cards */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${
            dir === "rtl" ? "text-right" : "text-left"
          }`}
        >
          {cards.map(({ id }, index) => (
            <motion.div
              key={id}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="group relative bg-white rounded-xl p-6 cursor-pointer"
              style={{
                boxShadow: "0 2px 20px rgba(163, 128, 30, 0.18)",
                transition: "transform 0.25s ease-out",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
            >
              <div
                className="text-6xl font-bold mb-4 opacity-10 group-hover:opacity-20 transition duration-300"
                style={{ color: "#A3801E" }}
              >
                0{index + 1}
              </div>

              <h3
                className="text-xl md:text-2xl font-bold mb-3 transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: "#A3801E" }}
              >
                {t(`whyChoose.cards.${id}.title`)}
              </h3>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "#6b6355" }}
              >
                {t(`whyChoose.cards.${id}.description`)}
              </p>

              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ backgroundColor: "#A3801E" }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default WhyChooseUs;
