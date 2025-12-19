// src/pages/ServicePageTemplate.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const ServicePageTemplate = ({ serviceKey }) => {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

  const hero = t(`services.${serviceKey}.hero`, {
    returnObjects: true,
    defaultValue: {},
  });
  const highlights = t(`services.${serviceKey}.highlights`, {
    returnObjects: true,
    defaultValue: [],
  });
  const about = t(`services.${serviceKey}.about`, {
    returnObjects: true,
    defaultValue: {},
  });

  return (
    <main className="bg-white" dir={dir}>
      {/* HERO SECTION – same style as screenshot */}
      <section
        className="relative h-[60vh] md:h-[70vh] flex items-center"
        style={{
          backgroundImage: `url(${hero.backgroundImage || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative max-w-5xl mx-auto px-6 md:px-8 text-white">
          {hero.badge && (
            <p className="text-xs md:text-sm mb-2 opacity-80">
              {hero.badge}
            </p>
          )}

          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">
            {hero.title}
          </h1>

          {hero.subtitle && (
            <p className="mt-4 text-sm md:text-base max-w-2xl opacity-90">
              {hero.subtitle}
            </p>
          )}

          {hero.ctaLabel && (
            <button className="mt-6 inline-flex px-6 py-3 rounded bg-red-500 hover:bg-red-600 text-sm md:text-base font-semibold shadow-lg transition">
              {hero.ctaLabel}
            </button>
          )}
        </div>
      </section>

      {/* NEXT SECTION – 3 cards + about + 10+ years box */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-8" dir={dir}>
          {/* Top highlight cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className={`p-5 md:p-6 text-white ${
                  idx === 1
                    ? "bg-[#F34236]" // red (center like Arman Tech)
                    : "bg-[#2D256C]" // dark blue
                } rounded-md shadow-md`}
              >
                <p className="text-xs md:text-sm opacity-80 mb-1">
                  {item.label}
                </p>
                <h3 className="text-sm md:text-base font-semibold leading-snug">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

          {/* About content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              {about.eyebrow && (
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-1">
                  {about.eyebrow}
                </p>
              )}
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                {about.heading}
              </h2>

              {/* Text + image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {about.image && (
                  <div className="order-1 md:order-none">
                    <img
                      src={about.image}
                      alt={about.imageAlt || about.heading}
                      className="w-full max-h-[320px] object-cover rounded-lg shadow-md"
                    />
                  </div>
                )}

                <div className="space-y-3 text-sm md:text-base text-gray-600 leading-relaxed">
                  {(about.paragraphs || []).map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Stat card (10+ Years Experience) */}
            <div className="lg:col-span-1">
              <div className="border-2 border-[#F34236] rounded-xl px-6 py-10 text-center shadow-sm">
                <div className="text-4xl md:text-5xl font-extrabold text-[#2D256C]">
                  {about.stat?.value}
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  {about.stat?.label}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicePageTemplate;
