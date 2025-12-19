// src/pages/ServiceDetailTemplate.jsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

// Brand palette
const BG_TOP = "#FCFCF9"; // light section background
const DARK = "#444142"; // dark text / card
const GOLD = "#A3801E"; // accent

// Simple animation variants
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay },
  },
});

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, delay } },
});

export default function ServiceDetailTemplate({ serviceKey }) {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const align = dir === "rtl" ? "text-right" : "text-left";

  // Load content from translations
  const hero =
    t(`services.${serviceKey}.hero`, {
      returnObjects: true,
    }) || {};

  const highlightsRaw =
    t(`services.${serviceKey}.highlights`, {
      returnObjects: true,
    }) || [];

  const about =
    t(`services.${serviceKey}.about`, {
      returnObjects: true,
    }) || {};

  const quality =
    t(`services.${serviceKey}.quality`, {
      returnObjects: true,
    }) || {};

  const faqRaw =
    t(`services.${serviceKey}.faq`, {
      returnObjects: true,
    }) || {};

  const highlights = Array.isArray(highlightsRaw) ? highlightsRaw : [];
  const faqItems =
    faqRaw && Array.isArray(faqRaw.items) ? faqRaw.items : [];

  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <main dir={dir} className="bg-white">
      {/* HERO */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn(0)}
        className="relative h-[60vh] md:h-[70vh] flex items-center overflow-hidden"
        style={{
          backgroundImage: `url(${hero.backgroundImage || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* overlay – dark with warm hint */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(0,0,0,0.78) 0%, rgba(68,65,66,0.82) 40%, rgba(0,0,0,0.5) 100%)",
          }}
        />

        {/* subtle gold glow */}
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-80 w-80 rounded-full opacity-50 blur-3xl"
          style={{ backgroundColor: GOLD }}
        />

        <div className="relative max-w-5xl mx-auto px-6 md:px-8 text-white">
          <motion.div variants={fadeUp(0.1)}>
            {hero.badge && (
              <p className="inline-flex items-center text-[11px] md:text-xs uppercase tracking-[0.2em] mb-3 opacity-90">
                <span
                  className={`h-[1px] w-8 ${
                    dir === "rtl" ? "ml-2" : "mr-2"
                  }`}
                  style={{ backgroundColor: GOLD }}
                />
                {hero.badge}
              </p>
            )}

            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-2xl">
              {hero.title}
            </h1>

            {hero.subtitle && (
              <p className="mt-4 text-sm md:text-base max-w-2xl opacity-95">
                {hero.subtitle}
              </p>
            )}

            {hero.ctaLabel && (
              <button
                className="mt-6 inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm md:text-base font-semibold shadow-lg border border-transparent hover:-translate-y-0.5 hover:shadow-xl transition-all"
                style={{
                  backgroundColor: GOLD,
                  color: "#FFFFFF",
                }}
              >
                {hero.ctaLabel}
                <span className="text-xs">↗</span>
              </button>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* HIGHLIGHTS */}
      {highlights.length > 0 && (
        <section
          className="py-10 md:py-12"
          style={{ background: BG_TOP }}
        >
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp(0)}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {highlights.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="relative p-5 md:p-6 text-white rounded-xl shadow-md overflow-hidden group"
                    style={{
                      backgroundColor: idx === 1 ? GOLD : DARK,
                    }}
                    whileHover={{
                      y: -6,
                      boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* top shine */}
                    <div
                      className="pointer-events-none absolute -top-16 right-0 h-24 w-24 rounded-full opacity-40 blur-2xl group-hover:opacity-60"
                      style={{ backgroundColor: GOLD }}
                    />

                    <p className="text-[11px] md:text-xs uppercase tracking-[0.16em] opacity-80 mb-1">
                      {item.label}
                    </p>
                    <h3 className="text-sm md:text-base font-semibold leading-snug">
                      {item.title}
                    </h3>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ABOUT SECTION */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* LEFT CONTENT */}
            <motion.div
              className="lg:col-span-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp(0)}
            >
              {about.eyebrow && (
                <p className="text-[11px] uppercase tracking-[0.22em] text-gray-500 mb-1">
                  {about.eyebrow}
                </p>
              )}

              <h2
                className={`text-2xl md:text-3xl font-bold mb-5 ${align}`}
                style={{ color: DARK }}
              >
                {about.heading}
              </h2>

              {/* image LEFT, text RIGHT */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {about.image && (
                  <motion.div
                    className="relative"
                    variants={fadeUp(0.1)}
                  >
                    <div className="absolute -inset-2 rounded-2xl border border-white/40 shadow-[0_0_0_1px_rgba(0,0,0,0.03)]" />
                    <div className="relative overflow-hidden rounded-2xl">
                      <img
                        src={about.image}
                        alt={about.imageAlt || about.heading}
                        className="w-full h-80 object-cover"
                      />
                      {/* gold gradient overlay bottom */}
                      <div
                        className="absolute inset-x-0 bottom-0 h-28 opacity-70"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
                        }}
                      />
                      {/* small tag */}
                      {/* <div
                        className={`absolute bottom-4 ${
                          dir === "rtl" ? "right-4" : "left-4"
                        } px-3 py-1 rounded-full text-[11px] font-medium tracking-wide`}
                        style={{
                          backgroundColor: "#ffffff",
                          color: DARK,
                        }}
                      >
                        {about.badge || t("common.professionalService", "Professional Service")}
                      </div> */}
                    </div>
                  </motion.div>
                )}

                <motion.div
                  className={`h-full flex flex-col justify-center space-y-4 text-sm md:text-base leading-relaxed ${align}`}
                  style={{ color: "#555" }}
                  variants={fadeUp(0.15)}
                >
                  {(about.paragraphs || []).map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* RIGHT STAT / PILLAR CARD */}
            {/* <motion.div
              className="lg:col-span-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp(0.2)}
            >
              <div
                className="relative p-6 md:p-7 rounded-2xl shadow-xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #181516, #3F3839, #6A5431)",
                }}
              > */}
                {/* <div
                  className="pointer-events-none absolute -top-16 -right-16 h-32 w-32 rounded-full opacity-40 blur-3xl"
                  style={{ backgroundColor: GOLD }}
                /> */}

                {/* <h3 className="text-white text-lg font-semibold mb-3">
                  {about.sideTitle ||
                    t(
                      "common.whyThisServiceMatters",
                      "Why this service matters"
                    )}
                </h3>
                <p className="text-sm text-white/80 mb-4">
                  {about.sideDescription ||
                    t(
                      "common.serviceSideDescription",
                      "We combine technical expertise with practical, customer-focused thinking to protect your comfort at every stage."
                    )}
                </p> */}

                {/* Optional bullets */}
                {/* {Array.isArray(about.bullets) &&
                  about.bullets.length > 0 && (
                    <ul className="space-y-2 text-sm text-white/85">
                      {about.bullets.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2"
                        >
                          <span
                            className="mt-[5px] h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: GOLD }}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )} */}

                {/* Optional stat block inside the card */}
                {/* {about.stat && about.stat.value && (
                  <div className="mt-5 pt-4 border-t border-white/20 flex items-center gap-3">
                    <div className="text-2xl font-extrabold text-white">
                      {about.stat.value}
                    </div>
                    <div className="text-xs text-white/70 uppercase tracking-[0.18em]">
                      {about.stat.label}
                    </div>
                  </div>
                )} */}
              {/* </div>
            </motion.div> */}
          </div>
        </div>
      </section>

      {/* QUALITY SECTION */}
      {quality && quality.title && (
        <motion.section
          dir={dir}
          className="relative py-16 md:py-20 overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeIn(0)}
        >
          {/* Background image */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${quality.backgroundImage || ""})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* dark overlay with gold tint */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,0,0,0.88), rgba(68,65,66,0.9), rgba(163,128,30,0.5))",
            }}
          />

          {/* decorative diagonal */}
          <div
            className="pointer-events-none absolute -left-24 top-0 h-[160%] w-64 rotate-12 opacity-20"
            style={{ backgroundColor: GOLD }}
          />

          <div className="relative max-w-6xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-10 items-center">
              {/* TEXT + SERVICES */}
              <motion.div
                className={`lg:col-span-2 text-white ${align}`}
                variants={fadeUp(0.1)}
              >
                {quality.eyebrow && (
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/70 mb-2">
                    {quality.eyebrow}
                  </p>
                )}

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-snug mb-5">
                  {quality.title}
                </h2>

                <div className="space-y-3 text-sm md:text-base opacity-95 leading-relaxed">
                  {(quality.paragraphs || []).map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Range of services cards */}
                {Array.isArray(quality.services) &&
                  quality.services.length > 0 && (
                    <div className="mt-8 grid md:grid-cols-2 gap-6">
                      {quality.services.map((svc, index) => (
                        <div
                          key={index}
                          className="bg-white/5 rounded-2xl border border-white/20 p-4 md:p-5 backdrop-blur-sm"
                        >
                          <h3 className="text-base md:text-lg font-semibold mb-2 text-white">
                            {svc.title}
                          </h3>
                          <p className="text-sm md:text-base text-white/85 leading-relaxed">
                            {svc.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {/* FAQ SECTION */}
      {faqItems.length > 0 && (
        <motion.section
          dir={dir}
          className="relative py-16 md:py-20 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp(0)}
        >
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            {/* Heading */}
            <div
              className={`mb-8 md:mb-10 ${align} transition-all duration-700`}
            >
              <p className="text-[11px] uppercase tracking-[0.22em] text-gray-500 mb-2">
                {faqRaw.eyebrow || t("common.faqEyebrow", "FAQs")}
              </p>
              <h2
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ color: DARK }}
              >
                {faqRaw.heading ||
                  t(
                    "common.faqHeading",
                    "Frequently Asked Questions"
                  )}
              </h2>
              {faqRaw.intro && (
                <p className="text-sm md:text-base text-gray-600 max-w-2xl">
                  {faqRaw.intro}
                </p>
              )}
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-4">
              {faqItems.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Question row */}
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between gap-4 px-4 md:px-5 py-3 md:py-4 text-left"
                    >
                      <span className="text-sm md:text-base font-semibold text-gray-900">
                        {item.question}
                      </span>

                      {/* Animated plus/minus icon */}
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-700 text-lg leading-none"
                      >
                        +
                      </motion.span>
                    </button>

                    {/* Answer */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial="collapsed"
                          animate="open"
                          exit="collapsed"
                          variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 },
                          }}
                          transition={{
                            duration: 0.25,
                            ease: "easeOut",
                          }}
                        >
                          <div className="px-4 md:px-5 pb-4 md:pb-5 text-sm md:text-base text-gray-700 leading-relaxed border-t border-gray-100">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>
      )}
    </main>
  );
}
