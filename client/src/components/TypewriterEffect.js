// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';

// const TypewriterEffect = ({ text, speed = 100, className = '' }) => {
//   const textRef = useRef(null);
//   const cursorRef = useRef(null);

//   useEffect(() => {
//     const textElement = textRef.current;
//     const cursorElement = cursorRef.current;
    
//     if (!textElement || !cursorElement) return;

//     // Clear initial text
//     textElement.textContent = '';
    
//     // Create cursor blinking animation
//     gsap.to(cursorElement, {
//       opacity: 0,
//       duration: 0.5,
//       repeat: -1,
//       yoyo: true,
//       ease: 'power2.inOut'
//     });

//     // Typewriter animation
//     const chars = text.split('');
//     let currentIndex = 0;

//     const typeNextChar = () => {
//       if (currentIndex < chars.length) {
//         textElement.textContent += chars[currentIndex];
//         currentIndex++;
//         setTimeout(typeNextChar, speed);
//       }
//     };

//     // Start typing after a short delay
//     setTimeout(typeNextChar, 500);

//   }, [text, speed]);

//   return (
//     <div className={`inline-flex items-center ${className}`}>
//       <span ref={textRef} className="text-white"></span>
//       <span ref={cursorRef} className="text-cyan-400 ml-1">|</span>
//     </div>
//   );
// };

// export default TypewriterEffect;

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const TypewriterEffect = ({ text, speed = 100, className = '' }) => {
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  const timeouts = useRef([]); // Store timeouts so we can clear them later

  useEffect(() => {
    const textElement = textRef.current;
    const cursorElement = cursorRef.current;
    if (!textElement || !cursorElement) return;

    // Clear previous text
    textElement.textContent = '';

    // Clear any previous GSAP animations
    gsap.killTweensOf(cursorElement);

    // Kill existing timeouts (important in React Strict Mode)
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];

    gsap.to(cursorElement, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    });

    const chars = text.split('');
    let currentIndex = 0;

    const typeNextChar = () => {
      if (currentIndex < chars.length) {
        textElement.textContent += chars[currentIndex];
        currentIndex++;
        const t = setTimeout(typeNextChar, speed);
        timeouts.current.push(t);
      }
    };

    // Start typing after short delay
    const initialTimeout = setTimeout(typeNextChar, 500);
    timeouts.current.push(initialTimeout);

    // ✅ Cleanup function (runs on unmount or dependency change)
    return () => {
      gsap.killTweensOf(cursorElement);
      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];
    };
  }, [text, speed]);

  return (
    <div className={`inline-flex items-center ${className}`}>
      <span ref={textRef} className="text-white"></span>
      <span ref={cursorRef} className="text-cyan-400 ml-1">|</span>
    </div>
  );
};

export default TypewriterEffect;
