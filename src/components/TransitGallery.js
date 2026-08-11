import React, { useEffect, useRef, useState } from "react";

const photos = [
  "/transit-gallery/gallery0.jpg",
  "/transit-gallery/gallery_1.jpg",
  "/transit-gallery/gallery_2.jpg",
  "/transit-gallery/gallery2_3.jpg",
  "/transit-gallery/gallery3.jpg",
  "/transit-gallery/gallery3_4.jpg",
  "/transit-gallery/gallery4.jpg",
  "/transit-gallery/gallery5.jpg",
  "/transit-gallery/gallery6.jpg",
  "/transit-gallery/gallery7.jpg",
  "/transit-gallery/gallery8.jpg",
  "/transit-gallery/gallery9.jpg",
  "/transit-gallery/gallery10.png",
];

const sectionStyle = {
  position: "relative",
  width: "100%",
  padding: "5rem 1.5rem",
  background:
    "radial-gradient(circle at 30% 25%, #12343b 0%, transparent 45%), radial-gradient(circle at 75% 75%, #0d1f22 0%, transparent 50%), #000000",
  overflow: "hidden",
};

const TransitGallery = () => {
  const [mainImage, setMainImage] = useState(photos[0]);
  const [fullscreen, setFullscreen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const stripRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const handleWheel = (e) => {
      e.preventDefault();
      strip.scrollLeft += e.deltaY * 0.6;
    };

    strip.addEventListener("wheel", handleWheel, { passive: false });
    return () => strip.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const currentIndex = photos.indexOf(mainImage);
  const showPrev = (e) => {
    e.stopPropagation();
    setMainImage(photos[(currentIndex - 1 + photos.length) % photos.length]);
  };
  const showNext = (e) => {
    e.stopPropagation();
    setMainImage(photos[(currentIndex + 1) % photos.length]);
  };

  useEffect(() => {
    if (!fullscreen) return;

    const handleKey = (e) => {
      if (e.key === "Escape") setFullscreen(false);
      if (e.key === "ArrowLeft") {
        setMainImage((prev) => {
          const i = photos.indexOf(prev);
          return photos[(i - 1 + photos.length) % photos.length];
        });
      }
      if (e.key === "ArrowRight") {
        setMainImage((prev) => {
          const i = photos.indexOf(prev);
          return photos[(i + 1) % photos.length];
        });
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [fullscreen]);

  return (
    <section
      id="transit-gallery"
      style={sectionStyle}
      ref={sectionRef}
      className={`transit-reveal${isVisible ? " is-visible" : ""}`}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h2
          style={{
            color: "white",
            letterSpacing: "0.15em",
            textAlign: "center",
            fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
            fontWeight: "bold",
            marginBottom: "2.5rem",
          }}
        >
          GALLERY
        </h2>

        <img
          src={mainImage}
          alt="Selected gallery"
          onClick={() => setFullscreen(true)}
          style={{
            width: "100%",
            maxHeight: "65vh",
            objectFit: "contain",
            borderRadius: "1rem",
            boxShadow: "12px 12px 30px rgba(0,0,0,0.6)",
            display: "block",
            margin: "0 auto 2rem",
            cursor: "zoom-in",
          }}
        />

        <div className="transit-gallery-strip" ref={stripRef}>
          {photos.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Thumbnail ${i + 1}`}
              onClick={() => setMainImage(src)}
              className={`transit-gallery-thumb${mainImage === src ? " selected" : ""}`}
            />
          ))}
        </div>
      </div>

      {fullscreen && (
        <div
          onClick={() => setFullscreen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
            cursor: "zoom-out",
          }}
        >
          <button
            onClick={() => setFullscreen(false)}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "2rem",
              cursor: "pointer",
            }}
          >
            ×
          </button>
          <button
            className="transit-lightbox-arrow prev"
            onClick={showPrev}
            aria-label="Previous photo"
          >
            ‹
          </button>

          <img
            src={mainImage}
            alt="Fullscreen"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: "0.5rem",
              boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
            }}
          />

          <button
            className="transit-lightbox-arrow next"
            onClick={showNext}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
};

export default TransitGallery;
