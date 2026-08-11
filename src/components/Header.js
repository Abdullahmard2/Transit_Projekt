import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faDeviantart,
  faFacebook,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const socials = [
  { icon: faEnvelope, url: "mailto:abdullahmarduni@gmail.com" },
  { icon: faGithub, url: "https://github.com/Abdullahmard2" },
  { icon: faLinkedin, url: "https://www.linkedin.com/in/abdullah-almardoud-b31223240/" },
  { icon: faFacebook, url: "https://www.facebook.com/abdullah.mard" },
  { icon: faDeviantart, url: "https://www.deviantart.com/abdullahmard" },
];

const barStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  backgroundColor: "#18181b",
  transition: "transform 0.3s ease-in-out",
};

const innerStyle = {
  maxWidth: "1280px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  padding: "1rem 1.5rem",
  gap: "1rem",
};

const socialRowStyle = {
  display: "flex",
  gap: "1.75rem",
  color: "white",
};

const socialLinkStyle = {
  color: "white",
  display: "flex",
  transition: "color 0.25s ease, transform 0.25s ease",
};

const navRowStyle = {
  display: "flex",
  gap: "1.5rem",
  flexWrap: "wrap",
};

const navLinkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "0.4rem 0.8rem",
  borderRadius: "4px",
};

const navBtnStyle = {
  ...navLinkStyle,
  background: "none",
  border: "none",
};

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setShowHeader(current < lastScrollY.current || current < 10);
      lastScrollY.current = current;
    };
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header
      style={{
        ...barStyle,
        transform: showHeader ? "translateY(0)" : "translateY(-200px)",
      }}
    >
      <div style={innerStyle}>
        {!isMobile && (
          <div style={socialRowStyle}>
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transit-social-link"
                style={socialLinkStyle}
              >
                <FontAwesomeIcon icon={s.icon} size="lg" />
              </a>
            ))}
          </div>
        )}

        <div style={navRowStyle}>
          <button
            className="transit-nav-link"
            style={navBtnStyle}
            onClick={() => document.getElementById("transit-hero")?.scrollIntoView({ behavior: "smooth" })}
          >
            Home
          </button>
          <button
            className="transit-nav-link"
            style={navBtnStyle}
            onClick={() => document.getElementById("transit-gallery")?.scrollIntoView({ behavior: "smooth" })}
          >
            Gallery
          </button>
          <a
            className="transit-nav-link"
            href="https://portfolio-abdullah-mard.vercel.app/#LandingSection"
            style={navLinkStyle}
          >
            Projects
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
