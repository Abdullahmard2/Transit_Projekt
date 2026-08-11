import React, { useState, useEffect } from "react";

const Typewriter = ({ text, speed = 35 }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  return (
    <span className="typewriter">
      {displayText.split("").map((char, i) => (
        <span
          key={i}
          className="typewriter-char"
          style={{ animationDelay: `${i * 0.01}s` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default Typewriter;
