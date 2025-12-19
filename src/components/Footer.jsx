// src/components/Footer.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";

/* Brand Palette */
const BG = "#000";
const MUTED = "rgba(255,255,255,0.72)";
const ACCENT_PRIMARY = "#A2811F";
const ACCENT_SECONDARY = "#9D8A4A";

/* TikTok Icon */
const TikTokIcon = ({ size = 22, color = "currentColor" }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3v9.5a3.75 3.75 0 1 1-3.5-3.73" />
    <path d="M12 3c1.3 1.9 3.5 3.2 5.5 3.2" />
  </svg>
);

/* Uniform social button */
const SocialBtn = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300"
    style={{
      border: `1px solid ${ACCENT_SECONDARY}`,
      background: "transparent",
      color: "#ffffff",
    }}
  >
    {/* Icon */}
    <span className="transition-all duration-300 group-hover:text-black group-hover:scale-110">
      {children}
    </span>

    {/* Glow */}
    <span
      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition duration-500 blur-md"
      style={{
        background: `radial-gradient(circle, ${ACCENT_PRIMARY}33, transparent 70%)`,
      }}
    />
  </a>
);

export default function Footer() {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir();
  const year = new Date().getFullYear();

  // i18n-based content
  const brand = t("footer.brand", "Rabwat Al Khair");
  const tagline = t(
    "footer.tagline",
    "Technical & maintenance services in Dubai and across the UAE."
  );
  const quickLinks = t("footer.quickLinks", "Quick Links");
  const about = t("footer.about", "About Us");
  const services = t("footer.services", "Services");
  const contactNav = t("footer.contact", "Contact");
  const contactTitle = t("footer.contactTitle", "Contact");
  const address = t("footer.address", "");
  const phone = t("footer.phone", "");
  const email = t("footer.email", "");
  const followUs = t("footer.followUs", "Follow Us");
  const privacy = t("footer.privacy", "Privacy Policy");
  const rights = t("footer.rights", "All rights reserved.");

  const telHref = phone ? `tel:${String(phone).replace(/[^\d+]/g, "")}` : null;
  const mailHref = email ? `mailto:${email}` : null;

  return (
    <footer
      dir={dir}
      className="relative w-full overflow-hidden pt-16 pb-10"
      style={{ background: BG, color: "#fff" }}
    >
      {/* Animated gold orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-20 -left-20 w-72 h-72 opacity-20 rounded-full blur-3xl animate-pulse"
          style={{
            background: `radial-gradient(circle, ${ACCENT_PRIMARY}55, transparent 70%)`,
          }}
        />
        <div
          className="absolute bottom-0 -right-20 w-80 h-80 opacity-30 blur-3xl animate-[float_12s_ease-in-out_infinite]"
          style={{
            background: `radial-gradient(circle, ${ACCENT_SECONDARY}40, transparent 70%)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        {/* ================== Top section ================== */}
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-12 fade-in-up"
          style={{ animation: "fadeInUp 1s ease-out" }}
        >
          {/* Brand */}
          <div className="md:col-span-5">
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {brand}
            </h3>

            <div
              className="mt-2 h-1 w-20 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${ACCENT_PRIMARY}, ${ACCENT_SECONDARY})`,
              }}
            />

            <p
              className="mt-4 text-sm md:text-base leading-relaxed"
              style={{ color: MUTED }}
            >
              {tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3
              className="text-base font-semibold mb-4"
              style={{ color: ACCENT_PRIMARY }}
            >
              {quickLinks}
            </h3>

            <ul
              className={`space-y-2 text-sm ${
                dir === "rtl" ? "text-right" : "text-left"
              }`}
              style={{ color: MUTED }}
            >
              <li>
                <Link
                  to="/about"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  {about}
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  {services}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  {contactNav}
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  {privacy}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + Social */}
          <div className="md:col-span-4">
            <h3
              className="text-base font-semibold mb-4"
              style={{ color: ACCENT_PRIMARY }}
            >
              {contactTitle}
            </h3>

            <ul
              className={`space-y-2 text-sm mb-4 ${
                dir === "rtl" ? "text-right" : "text-left"
              }`}
              style={{ color: MUTED }}
            >
              {address && <li>{address}</li>}
              {phone && (
                <li >
                  <a href={telHref} className="hover:text-white transition "
                  style={{
        direction: "ltr",
        unicodeBidi: "bidi-override",
      }}>
                    {phone}
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a href={mailHref} className="hover:text-white transition">
                    {email}
                  </a>
                </li>
              )}
            </ul>
{/* 
            <h4 className="text-sm font-semibold mb-3">{followUs}</h4> */}

            {/* <div className="flex items-center gap-3">
              <SocialBtn
                href="https://www.instagram.com/halaasaudia"
                label="Instagram"
              >
                <Instagram size={18} />
              </SocialBtn>

              <SocialBtn
                href="https://www.tiktok.com/@halaasaudia"
                label="TikTok"
              >
                <TikTokIcon size={18} />
              </SocialBtn>

              <SocialBtn
                href="https://www.facebook.com/share/17KjPC1NaV/"
                label="Facebook"
              >
                <Facebook size={18} />
              </SocialBtn>
            </div> */}
          </div>
        </div>

        {/* ================== Bottom section ================== */}
        <div
          className="mt-10 pt-4 text-center text-[11px] md:text-xs opacity-80"
          style={{
            borderTop: `1px solid rgba(255,255,255,0.16)`,
            color: MUTED,
          }}
        >
          <p>
            © {year}{" "}
            <span style={{ color: ACCENT_SECONDARY }}>{brand}</span> — {rights}
          </p>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </footer>
  );
}
