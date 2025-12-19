// src/pages/ServicesPage.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ServiceHeader from "../components/services/ServiceHeader";

const BG_SECTION = "#F7F7F7";
const TEXT_DARK = "#111111";
const TEXT_MUTED = "#555555";
const ACCENT_PRIMARY = "#A2811F";
const ACCENT_SECONDARY = "#9D8A4A";

export default function ServicesPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dir = i18n.dir();

  const heading = t("service.heading");
  const subtitle = t("service.chooser.subtitle");

  const cards = [
    {
      id: "electrical",
      route: "/services/electrical-appliance-maintenance",
      image: "/assets/electrical.jpg",
      title: t("service.cards.electrical.title"),
      description: t("service.cards.electrical.description"),
    },
    {
      id: "kitchen",
      route: "/services/kitchen-equipment-installation",
      image: "/assets/kitchen.jpg",
      title: t("service.cards.kitchen.title"),
      description: t("service.cards.kitchen.description"),
    },
    {
      id: "ac",
      route: "/services/ac-repair-services",
      image: "/assets/ac.jpg",
      title: t("service.cards.ac.title"),
      description: t("service.cards.ac.description"),
    },
  ];

  const align = dir === "rtl" ? "text-right" : "text-left";

  return (
    <main
      dir={dir}
      className="min-h-screen"
      style={{ backgroundColor: BG_SECTION }}
    >
      <ServiceHeader
        title={heading}
        subtitle={subtitle}
        backgroundImage="/assets/services-hero.jpg"
        label={t("nav.services")}
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Service cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              role="button"
              tabIndex={0}
              onClick={() => navigate(card.route)}
              onKeyDown={(e) => e.key === "Enter" && navigate(card.route)}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 text-left cursor-pointer"
            >
              {/* Image */}
              <div className="w-full h-44 md:h-52 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: "center top" }}
                />
              </div>

              {/* Content */}
              <div className="px-5 py-4 md:py-5">
                <h2
                  className={`text-lg md:text-xl font-semibold mb-2 ${align}`}
                  style={{ color: TEXT_DARK }}
                >
                  {card.title}
                </h2>
                <p
                  className={`text-sm md:text-[15px] leading-relaxed mb-3 ${align}`}
                  style={{ color: TEXT_MUTED }}
                >
                  {card.description}
                </p>

                <div
                  className={`mt-1 flex items-center gap-2 text-sm font-semibold ${
                    dir === "rtl" ? "justify-start" : "justify-start"
                  }`}
                  style={{ color: ACCENT_PRIMARY }}
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">
                    {t("service.learnMore") || "Learn More"}
                  </span>
                  <span className="text-lg leading-none group-hover:translate-x-2 transition-transform duration-200">
                    →
                  </span>
                </div>
              </div>

              {/* Bottom gradient bar (inside card, hugging rounded corners) */}
              <div
                className="absolute bottom-0 left-0 h-1 w-full rounded-b-2xl"
                style={{
                  background: `linear-gradient(90deg, ${ACCENT_PRIMARY}, ${ACCENT_SECONDARY})`,
                }}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
