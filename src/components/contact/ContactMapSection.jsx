// src/components/contact/ContactMapSection.jsx
import React from "react";
import { useTranslation } from "react-i18next";

const ContactMapSection = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

  return (
    <section
      dir={dir}
      className="w-full bg-white py-8 md:py-10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-base md:text-lg font-semibold mb-4 text-[#111111]">
          {t("contact.mapHeading", { defaultValue: "Find us on the map" })}
        </h2>

        <div className="w-full h-[300px] md:h-[380px] overflow-hidden rounded-md border border-gray-200">
          {/* Replace src with your actual embedded map URL */}
          <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3768.389527033639!2d54.49058282340955!3d24.40733993728947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDI0JzI1LjkiTiA1NMKwMjknMzYuMSJF!5e1!3m2!1sen!2sin!4v1765430799012!5m2!1sen!2sin" width="100%" height="450" style={{ border: 0 }}
 allowFullScreen
 loading="lazy" referrerPolicy="no-referrer-when-downgrade"
></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactMapSection;
