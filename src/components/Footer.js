import React from "react";

const footerStyle = {
  background:
    "radial-gradient(circle at 50% 50%, #15292d 0%, transparent 60%), #000000",
};

const innerStyle = {
  maxWidth: "1024px",
  margin: "0 auto",
  padding: "1.5rem 3rem",
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "1rem",
};

const navBtnStyle = {
  background: "none",
  border: "none",
  color: "white",
  marginLeft: "1.5rem",
};

const navLinkStyle = {
  color: "white",
  textDecoration: "none",
  marginLeft: "1.5rem",
};

const Footer = () => (
  <div style={footerStyle}>
    <div style={innerStyle}>
      <p style={{ margin: 0 }}>Copyright • © 2026</p>
      <div>
        <button className="transit-nav-link" style={navBtnStyle} onClick={() => document.getElementById("transit-hero")?.scrollIntoView({ behavior: "smooth" })}>
          Home
        </button>
        <button className="transit-nav-link" style={navBtnStyle} onClick={() => document.getElementById("transit-gallery")?.scrollIntoView({ behavior: "smooth" })}>
          Gallery
        </button>
        <a className="transit-nav-link" href="https://portfolio-abdullah-mard.vercel.app/#LandingSection" style={navLinkStyle}>
          Projects
        </a>
      </div>
    </div>
  </div>
);

export default Footer;
