// src/components/services/servicesConfig.js

export const ACCENT_PRIMARY = "#A2811F";   // main gold
export const ACCENT_SECONDARY = "#9D8A4A"; // softer gold
export const ACCENT_TERTIARY = "#8A7734";  // dark gold
export const BG_SECTION = "#FFFFFF";
export const TEXT_DARK = "#111111";
export const TEXT_MUTED = "#666666";

export const SERVICE_CARDS = [
  {
    id: "electrical",
    image: "/assets/electrical.jpg",
    badgeKey: "service.badges.electrical",
    defaultBadge: "Most Requested",
    icon: "⚡",
  },
  {
    id: "kitchen",
    image: "/assets/kitchen.jpg",
    badgeKey: "service.badges.kitchen",
    defaultBadge: "Restaurant Favourite",
    icon: "🍽️",
  },
  {
    id: "ac",
    image: "/assets/ac.jpg",
    badgeKey: "service.badges.ac",
    defaultBadge: "Summer Essential",
    icon: "❄️",
  },
];
