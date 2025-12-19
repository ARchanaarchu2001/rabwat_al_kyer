// src/components/navbar/MobileOverlay.jsx
import React, { useState } from "react";

const MobileOverlay = ({
  navItems,
  activeItem,
  onNavClick,
  t,
  isRTL,
  borderColor,
  onClose,
  // 👇 NEW
  serviceItems = [],
  onServiceClick,
}) => {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <div
      id="mobile-overlay"
      className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm "
      onClick={onClose}
    >
      <div
        className={`absolute top-0 ${isRTL ? "right-0" : "left-0"} h-full w-[80%] max-w-xs bg-white shadow-xl`}
        style={{ borderColor, borderWidth: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 flex pt-20 flex-col gap-2 ">
          {navItems.map((item) => {
            const active = activeItem === item;

            
            // SERVICES WITH CHILDREN
if (item === "services") {
  return (
    <div key={item} className="flex flex-col">
      <button
        type="button"
        onClick={() => setServicesOpen((prev) => !prev)}
        className="flex items-center justify-between w-full px-3 py-2 text-lg font-medium text-[#111111]"
      >
        <span>{t("nav.services")}</span>
        <span className="text-xl font-bold">
          {servicesOpen ? "−" : "+"}
        </span>
      </button>

      {servicesOpen && serviceItems.length > 0 && (
        <div className="mt-1 ml-4 flex flex-col border-l border-gray-200">
          {serviceItems.map((service) => (
            <button
              key={service.key}
              type="button"
              onClick={() =>
                onServiceClick && onServiceClick(service.slug)
              }
              className="text-sm text-left px-3 py-1.5 text-gray-700 hover:bg-gray-50"
            >
              {(service.labelKey && t(service.labelKey)) ||
                service.fallbackLabel ||
                service.key}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


            // NORMAL ITEMS
            return (
              <button
                key={item}
                type="button"
                onClick={() => onNavClick(item)}
                className={`w-full text-left px-3 py-2 rounded-md text-base font-semibold ${
                  active ? "bg-black text-white" : "text-[#111111]"
                }`}
              >
                {t(`nav.${item}`)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileOverlay;
