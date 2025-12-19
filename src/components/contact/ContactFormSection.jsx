// src/components/contact/ContactFormSection.jsx
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin } from "lucide-react";
import emailjs from "@emailjs/browser";

const ContactFormSection = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();

  const heading = t("contact.heading", { defaultValue: "Get in touch." });
  const description = t("contact.description", {
    defaultValue:
      "Reach out to us for consultations, questions, or support. Our team is here to help.",
  });

  const email = t("contact.email", { defaultValue: "rbwtalkhyr@gmail.com" });
  const email2 = t("contact.email2", { defaultValue: "" });
  const phone = t("contact.phone", { defaultValue: "+971 54 383 8390" });
  const address = t("contact.address", { defaultValue: "" });

  const nameLabel = t("contact.nameLabel", { defaultValue: "Name" });
  const emailLabel = t("contact.emailLabel", { defaultValue: "Email" });
  const messageLabel = t("contact.messageLabel", { defaultValue: "Message" });
  const buttonText = t("contact.button", { defaultValue: "Submit" });

  const telHref = phone ? `tel:${String(phone).replace(/[^\d+]/g, "")}` : "#";

  
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: "",
    error: "",
  });

  const maxLen = 180;
  const messageCount = useMemo(() => form.message.length, [form.message]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: "", error: "" });

    try {
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        throw new Error(
          "Missing EmailJS config. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY in .env"
        );
      }

      // ✅ these keys MUST match your EmailJS template variables
      // Use the template I gave you:
      // {{first_name}}  {{email}}  {{phone}}  {{message}}  {{time}}
      const templateParams = {
        first_name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message || "-",
        time: new Date().toLocaleString(),
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      setStatus({
        loading: false,
        success: "Message sent successfully!",
        error: "",
      });

      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus({
        loading: false,
        success: "",
        error:
          err?.message ||
          "Failed to send message. Please try again or contact us directly.",
      });
    }
  };

  return (
    <section dir={dir} className="w-full bg-white py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {/* Left text + contact details */}
          <div className={dir === "rtl" ? "text-right" : "text-left"}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#111111] mb-3">
              {heading}
            </h2>
            <p className="text-sm md:text-base text-[#555555] leading-relaxed mb-6">
              {description}
            </p>

            <ul className="space-y-3 text-sm md:text-[15px] text-[#333333]">
              {email && (
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#A2811F]">
                    <Mail size={18} />
                  </span>
                  <div className={dir === "rtl" ? "text-right" : "text-left"}>
                    <a
                      href={`mailto:${email}`}
                      className="hover:text-[#A2811F] transition-colors"
                    >
                      {email}
                    </a>
                    {email2 && (
                      <>
                        <br />
                        <a
                          href={`mailto:${email2}`}
                          className="hover:text-[#A2811F] transition-colors"
                        >
                          {email2}
                        </a>
                      </>
                    )}
                  </div>
                </li>
              )}

              {phone && (
                <li className="flex items-center gap-3">
                  <span className="text-[#A2811F]">
                    <Phone size={18} />
                  </span>
                  <a
                    href={telHref}
                    className="hover:text-[#A2811F] transition-colors"
                    style={{ direction: "ltr", unicodeBidi: "bidi-override" }}
                  >
                    {phone}
                  </a>
                </li>
              )}

              {address && (
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#A2811F]">
                    <MapPin size={18} />
                  </span>
                  <span>{address}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Right form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#333333]">
                  {nameLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#A2811F]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#333333]">
                  {emailLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  type="email"
                  required
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#A2811F]"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#333333]">
                  {t("contact.phoneLabel", { defaultValue: "Phone Number" })}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  type="tel"
                  required
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#A2811F]"
                  placeholder="+971 50 123 4567"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#333333]">
                  {messageLabel}
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={4}
                  maxLength={maxLen}
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-[#A2811F]"
                />
                <div className="text-right text-[11px] text-gray-400">
                  {messageCount} / {maxLen}
                </div>
              </div>

              {/* Status messages */}
              {status.error && (
                <p className="text-sm text-red-600">{status.error}</p>
              )}
              {status.success && (
                <p className="text-sm text-green-600">{status.success}</p>
              )}

              <button
                type="submit"
                disabled={status.loading}
                className={`mt-2 px-6 py-2 text-sm font-semibold rounded-sm bg-[#A2811F] text-black transition-colors ${
                  status.loading ? "opacity-60 cursor-not-allowed" : "hover:opacity-95"
                }`}
              >
                {status.loading ? "Sending..." : buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
