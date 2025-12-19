// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import HomePage from "./pages/HomePage";


import Navbar from "./components/Navbar";
import WhatsAppFloat from "./components/WhatsAppFloat";

import Footer from "./components/Footer";


import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ElectricalApplianceMaintenancePage from "./pages/ElectricalApplianceMaintenance";
import KitchenEquipmentInstallationPage from "./pages/KitchenEquipmentInstallationPage";
import AcRepairServicesPage from "./pages/AcRepairServicesPage";
import ServicesPage from "./pages/ServicesPage";

/** Manage scroll + hash on first load and on route changes */
function ScrollManager() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Make the browser stop restoring scroll positions on history nav
    if ("scrollRestoration" in history) {
      const prev = history.scrollRestoration;
      history.scrollRestoration = "manual";
      return () => {
        history.scrollRestoration = prev;
      };
    }
  }, []);

  useEffect(() => {
    // If we’re on the home page, strip any #hash so the browser
    // doesn’t auto-jump to a section (e.g., #services)
    if (window.location.pathname === "/" && window.location.hash) {
      history.replaceState(null, "", window.location.pathname + search);
    }
    // Always start at the top on route changes
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, search]);

  return null;
}

export default function App() {
  const { i18n } = useTranslation();

  // Keep <html lang/dir> in sync with i18n
  useEffect(() => {
    const lang = i18n.language || "en";
    const dir = lang.startsWith("ar") ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [i18n.language]);

  // First paint: if URL has a hash while we’re on "/", clear it and go to top
  useEffect(() => {
    if (window.location.pathname === "/" && window.location.hash) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <BrowserRouter>
    
      <Navbar />

      {/* Handles scroll + hash on every route change */}
      <ScrollManager />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage/>} />
       
        
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />

        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/electrical-appliance-maintenance" element= {<ElectricalApplianceMaintenancePage />} />
        <Route path="/services/kitchen-equipment-installation" element={<KitchenEquipmentInstallationPage />} />
        <Route path="/services/ac-repair-services" element={<AcRepairServicesPage />} />
        
        {/* Optional 404
        <Route path="*" element={<div style={{ padding: 40 }}>Not found</div>} /> */}
      </Routes>

      <WhatsAppFloat />
     <Footer/>
    </BrowserRouter>
  );
}
