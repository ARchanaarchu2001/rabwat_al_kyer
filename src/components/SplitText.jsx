import { useEffect, useRef } from "react";
import gsap from "gsap";

const SplitText = ({
  text,
  className = "",
  delay = 40,             // in ms per unit
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",    // "chars" | "words"
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  textAlign = "left",
  tag = "p",
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !text) return;

    const units = ref.current.querySelectorAll("[data-split-unit]");

    // reset before animating
    gsap.set(units, from);

    gsap.to(units, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000, // convert ms → seconds
    });
  }, [text, delay, duration, ease, JSON.stringify(from), JSON.stringify(to), splitType]);

  const Tag = tag;

  // Render chars or words into spans
  const renderContent = () => {
    if (splitType === "words") {
      return text.split(" ").map((word, idx, arr) => (
        <span
          key={idx}
          data-split-unit
          className="inline-block whitespace-pre"
        >
          {word}
          {idx < arr.length - 1 ? " " : ""}
        </span>
      ));
    }

    // default: split into chars
    return text.split("").map((char, idx) => (
      <span
        key={idx}
        data-split-unit
        className="inline-block"
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        textAlign,
        whiteSpace: "normal",
        wordBreak: "break-word",
        willChange: "transform, opacity",
      }}
    >
      {renderContent()}
    </Tag>
  );
};

export default SplitText;
