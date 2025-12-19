// src/pages/PrivacyPolicyPage.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const BG = "#F7F7F7";
const TEXT_DARK = "#111111";
const TEXT_MUTED = "#444444";
const ACCENT_PRIMARY = "#A2811F";

export default function PrivacyPolicyPage() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

  return (
    <main
      dir={dir}
      className="min-h-screen"
      style={{ background: BG, color: TEXT_DARK }}
    >
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-16 md:pt-25">
        {/* Heading */}
        <header className={dir === "rtl" ? "text-right" : "text-left"}>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            {t("privacy.title")}
          </h1>
          <div
            className="mt-2 h-0.5 w-16 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${ACCENT_PRIMARY}, #9D8A4A)`,
            }}
          />
          <p
            className="mt-3 text-xs md:text-sm"
            style={{ color: TEXT_MUTED }}
          >
            {t("privacy.lastUpdatedLabel")}{" "}
            <span className="font-medium">
              {t("privacy.lastUpdatedDate")}
            </span>
          </p>
        </header>

        {/* Intro */}
        <section
          className={`mt-6 text-sm md:text-base leading-relaxed ${
            dir === "rtl" ? "text-right" : "text-left"
          }`}
          style={{ color: TEXT_MUTED }}
        >
          <p>{t("privacy.intro")}</p>
        </section>

        {/* Sections */}
        <section
          className={`mt-8 space-y-6 text-sm md:text-base leading-relaxed ${
            dir === "rtl" ? "text-right" : "text-left"
          }`}
          style={{ color: TEXT_MUTED }}
        >
          <div>
            <h2 className="font-semibold text-base md:text-lg mb-2 text-black">
              {t("privacy.section1Title")}
            </h2>
            <p>{t("privacy.section1Body")}</p>
          </div>

          <div>
            <h2 className="font-semibold text-base md:text-lg mb-2 text-black">
              {t("privacy.section2Title")}
            </h2>
            <p>{t("privacy.section2Body")}</p>
          </div>

          <div>
            <h2 className="font-semibold text-base md:text-lg mb-2 text-black">
              {t("privacy.section3Title")}
            </h2>
            <p>{t("privacy.section3Body")}</p>
          </div>

          <div>
            <h2 className="font-semibold text-base md:text-lg mb-2 text-black">
              {t("privacy.section4Title")}
            </h2>
            <p>{t("privacy.section4Body")}</p>
          </div>

          <div>
            <h2 className="font-semibold text-base md:text-lg mb-2 text-black">
              {t("privacy.section5Title")}
            </h2>
            <p>{t("privacy.section5Body")}</p>
          </div>

          <div>
            <h2 className="font-semibold text-base md:text-lg mb-2 text-black">
              {t("privacy.section6Title")}
            </h2>
            <p>{t("privacy.section6Body")}</p>
          </div>
        </section>

        {/* Disclaimer */}
        <section
          className={`mt-10 text-xs md:text-sm italic ${
            dir === "rtl" ? "text-right" : "text-left"
          }`}
          style={{ color: TEXT_MUTED }}
        >
          <p>{t("privacy.disclaimer")}</p>
        </section>
      </div>
    </main>
  );
}
