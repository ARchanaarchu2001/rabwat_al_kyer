// src/components/ServiceQualitySection.jsx
import React from "react";

const ServiceQualitySection = ({ data, dir = "ltr" }) => {
  if (!data || !data.title) return null;

  const align = dir === "rtl" ? "text-right" : "text-left";

  return (
    <section dir={dir} className="relative py-16 md:py-20">
      {/* Background image + overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${data.backgroundImage || ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* LEFT – text + stats */}
          <div className={`lg:col-span-2 text-white ${align}`}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-snug mb-5">
              {data.title}
            </h2>

            <div className="space-y-3 text-sm md:text-base opacity-95 leading-relaxed">
              {(data.paragraphs || []).map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Stats row */}
            {Array.isArray(data.metrics) && data.metrics.length > 0 && (
              <div className="mt-8 pt-4 border-t border-white/40 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {data.metrics.map((m, idx) => (
                  <div key={idx} className="text-center md:text-left">
                    <div className="text-2xl md:text-3xl font-bold">
                      {m.value}
                    </div>
                    <div className="mt-1 text-xs md:text-sm opacity-80">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT – side image card */}
          {data.sideImage && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                <img
                  src={data.sideImage}
                  alt={data.sideImageAlt || data.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceQualitySection;
