import { useRef, useEffect, useCallback, useState } from "react";
import { gsap } from "gsap";

const BRAND_GLOW = "162,129,31"; // gold color
const DEFAULT_PARTICLE_COUNT = 14;

const createParticle = (x, y, color) => {
  const el = document.createElement("div");
  el.style.cssText = `
    position:absolute;
    width:5px;height:5px;
    border-radius:50%;
    background:rgba(${color},1);
    box-shadow:0 0 8px rgba(${color},0.6);
    left:${x}px; top:${y}px;
    pointer-events:none;
  `;
  return el;
};

const ParticleCard = ({ children, glowColor = BRAND_GLOW }) => {
  const ref = useRef(null);
  const particles = useRef([]);
  const memo = useRef([]);
  const initializing = useRef(false);
  const hovered = useRef(false);

  const init = useCallback(() => {
    if (initializing.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    memo.current = Array.from({ length: DEFAULT_PARTICLE_COUNT }, () =>
      createParticle(Math.random() * rect.width, Math.random() * rect.height, glowColor)
    );
    initializing.current = true;
  }, [glowColor]);

  const explode = useCallback(() => {
    if (!hovered.current) return;
    init();

    memo.current.forEach((p, i) => {
      const clone = p.cloneNode(true);
      ref.current.appendChild(clone);
      particles.current.push(clone);

      gsap.to(clone, {
        x: (Math.random() - 0.5) * 120,
        y: (Math.random() - 0.5) * 120,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "none",
        delay: i * 0.1
      });
    });
  }, [init]);

  const clear = useCallback(() => {
    particles.current.forEach(p =>
      gsap.to(p, {
        opacity: 0,
        scale: 0,
        duration: 0.2,
        onComplete: () => p.remove()
      })
    );
    particles.current = [];
  }, []);

  useEffect(() => {
    const el = ref.current;

    const enter = () => {
      hovered.current = true;
      explode();
      gsap.to(el, { rotateX: 6, rotateY: 6, duration: 0.3 });
    };

    const leave = () => {
      hovered.current = false;
      clear();
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3 });
    };

    const move = e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      gsap.to(el, {
        rotateX: ((y - r.height / 2) / (r.height / 2)) * -8,
        rotateY: ((x - r.width / 2) / (r.width / 2)) * 8,
        duration: 0.12
      });
    };

    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    el.addEventListener("mousemove", move);

    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      el.removeEventListener("mousemove", move);
    };
  }, [explode, clear]);

  return (
    <div
      ref={ref}
      className="rounded-2xl p-6 cursor-pointer"
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#060010",
        border: "1px solid rgba(162,129,31,0.3)"
      }}
    >
      {children}
    </div>
  );
};

const MagicBento = ({ cards = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((item, i) => (
        <ParticleCard key={i}>
          <div className="text-xs font-semibold" style={{ color: "#A2811F" }}>
            {item.label}
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white mt-2">
            {item.title}
          </h3>
          <p className="text-sm text-gray-300 mt-2">{item.description}</p>
        </ParticleCard>
      ))}
    </div>
  );
};

export default MagicBento;
