import React, { useState, useEffect } from "react";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";

const AboutTeam = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const t = (key) => {
    const translations = {
      "aboutTeam.heading": "Meet Our Team",
    };
    return translations[key] || key;
  };

  const members = [
    {
      id: 1,
      name: "John Smith",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Operations Manager",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Lead Technician",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Customer Success",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      social: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
      },
    },
  ];

  return (
    <section
      id="team"
      className="w-full bg-gradient-to-b from-white to-gray-50 py-10 md:py-14"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          className={`text-center mb-8 md:mb-10 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2
            className="text-2xl md:text-3xl font-extrabold"
            style={{
              background: "linear-gradient(135deg, #000000 0%, #A2811F 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t("aboutTeam.heading")}
          </h2>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {members.map((member, index) => (
            <article
              key={member.id}
              className={`group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Image container */}
              <div className="relative w-full h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Hover overlay with social icons */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="flex items-center gap-3">
                    {member.social?.facebook && (
                      <a
                        href={member.social.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-full bg-gradient-to-br from-[#A2811F] to-[#9D8A4A] flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                      >
                        <FiFacebook size={18} />
                      </a>
                    )}
                    {member.social?.twitter && (
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-full bg-gradient-to-br from-[#A2811F] to-[#9D8A4A] flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                      >
                        <FiTwitter size={18} />
                      </a>
                    )}
                    {member.social?.instagram && (
                      <a
                        href={member.social.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="w-9 h-9 rounded-full bg-gradient-to-br from-[#A2811F] to-[#9D8A4A] flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
                      >
                        <FiInstagram size={18} />
                      </a>
                    )}
                  </div>
                </div> */}

                {/* Decorative corner accent */}
                {/* <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#A2811F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
              </div>

              {/* Name + role */}
              <div className="px-4 py-4 text-left">
                <h3 className="text-base md:text-lg font-semibold text-[#222222] group-hover:text-[#A2811F] transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs md:text-sm text-[#9D8A4A] font-medium">
                  {member.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;