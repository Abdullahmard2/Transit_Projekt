import React, { useEffect, useRef, useState } from "react";

const PINNED_FRAME_COUNT = 20;
const TOTAL_FRAME_COUNT = 22;

const FRAME_PATH = (i) =>
  `/transit-frames/frame_${String(i).padStart(3, "0")}.png`;

const SCROLL_LENGTH_VH = 320;
const HOLD_LENGTH_VH = 110;
const MAIN_RATIO = SCROLL_LENGTH_VH / (SCROLL_LENGTH_VH + HOLD_LENGTH_VH);

const PinnedFrames = () => {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const imgs = [];

    for (let i = 1; i <= PINNED_FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        loadedCount += 1;
        if (!cancelled) {
          setLoadProgress(Math.round((loadedCount / PINNED_FRAME_COUNT) * 100));
        }
        if (loadedCount === PINNED_FRAME_COUNT && !cancelled) {
          setLoaded(true);
        }
      };
      imgs.push(img);
    }

    imagesRef.current = imgs;
    return () => {
      cancelled = true;
    };
  }, []);

  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;

    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    ctx.clearRect(0, 0, cw, ch);

    const imgRatio = img.width / img.height;
    const boxRatio = cw / ch;
    let drawW, drawH, offsetX, offsetY;

    if (imgRatio > boxRatio) {
      drawH = ch;
      drawW = ch * imgRatio;
      offsetX = (cw - drawW) / 2;
      offsetY = 0;
    } else {
      drawW = cw;
      drawH = cw / imgRatio;
      offsetX = 0;
      offsetY = (ch - drawH) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  };

  useEffect(() => {
    if (!loaded) return;

    const handleScroll = () => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const rect = wrapper.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        if (total <= 0) return;

        const progress = Math.min(Math.max(-rect.top / total, 0), 1);
        const isActive = rect.top <= 0 && rect.bottom > 0;
        setScrollProgress(isActive ? progress : rect.top > 0 ? 0 : 1);
        let frameIndex;

        if (progress <= MAIN_RATIO) {
          const localProgress = progress / MAIN_RATIO;
          frameIndex = Math.round(localProgress * (PINNED_FRAME_COUNT - 1));
        } else {
          frameIndex = PINNED_FRAME_COUNT - 1;
        }

        drawFrame(frameIndex);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loaded]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        width: "100%",
        height: `${SCROLL_LENGTH_VH + HOLD_LENGTH_VH}vh`,
        backgroundColor: "black",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "black",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
        {!loaded && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#718096",
              fontSize: "0.85rem",
              letterSpacing: "0.2em",
            }}
          >
            LOADING...
            <div className="transit-loading-bar-track">
              <div
                className="transit-loading-bar-fill"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {loaded && scrollProgress > 0 && scrollProgress < 1 && (
        <div className="transit-frames-progress-track">
          <div
            className="transit-frames-progress-fill"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
      )}
    </div>
  );
};

const TailFrames = () => {
  const frames = [];
  for (let i = PINNED_FRAME_COUNT + 1; i <= TOTAL_FRAME_COUNT; i++) {
    frames.push(FRAME_PATH(i));
  }

  return (
    <div style={{ width: "100%", backgroundColor: "black" }}>
      {frames.map((src, i) => (
        <div key={i} style={{ width: "100%" }}>
          <img
            src={src}
            alt={`Frame ${PINNED_FRAME_COUNT + i + 1}`}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </div>
      ))}
    </div>
  );
};

const ScrollFrames = () => {
  return (
    <section id="transit-frames">
      <PinnedFrames />
      <TailFrames />
    </section>
  );
};

export default ScrollFrames;
