import React, { useEffect, useState } from "react";
import Typewriter from "./Typewriter";

const DOT_BLINK_DURATION = 2300;
const TYPE_SPEED = 35;

const DESCRIPTION =
  "The community hall serves as a kind of interim station for students. Here, they are given the opportunity to use the time between daily activities.";

const sectionStyle = {
  position: "relative",
  minHeight: "100vh",
  width: "100%",
  background:
    "radial-gradient(circle at 30% 25%, #12343b 0%, transparent 45%), radial-gradient(circle at 75% 75%, #0d1f22 0%, transparent 50%), #000000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 1.5rem",
  overflow: "hidden",
};

const TransitHero = () => {
  const [showDot, setShowDot] = useState(true);

  useEffect(() => {
    const dotTimer = setTimeout(() => {
      setShowDot(false);
    }, DOT_BLINK_DURATION);

    return () => clearTimeout(dotTimer);
  }, []);

  return (
    <section id="transit-hero" style={sectionStyle}>
      <style>
        {`
          @keyframes dotBlink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>

      <div style={{ maxWidth: "700px", textAlign: "center" }}>
        <p
          className="transit-hero-eyebrow"
          style={{
            color: "#9ca3af",
            fontSize: "0.85rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            margin: "0 0 1rem",
          }}
        >
          Architecture · Community Hall
        </p>

        <h1
          className="transit-hero-title"
          style={{
            color: "white",
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
            letterSpacing: "0.15em",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          TRANSIT
          {showDot && (
            <span style={{ animation: "dotBlink 1s step-end infinite" }}>
              .
            </span>
          )}
        </h1>

        {!showDot && (
          <div
            className="transit-hero-desc"
            style={{
              marginTop: "1.5rem",
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              lineHeight: 1.7,
            }}
          >
            <Typewriter text={DESCRIPTION} speed={TYPE_SPEED} />
          </div>
        )}
      </div>

      <div className="transit-scroll-cue">
        <span>Scroll</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 4v14m0 0l-6-6m6 6l6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
};

export default TransitHero;
