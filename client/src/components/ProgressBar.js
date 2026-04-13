import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ProgressBar = ({ skill, percentage, delay = 0 }) => {
  const progressRef = useRef(null);
  const percentageRef = useRef(null);

  useEffect(() => {
    const progress = progressRef.current;
    const percentageElement = percentageRef.current;

    if (!progress || !percentageElement) return;

    // Animate progress bar
    gsap.fromTo(progress, 
      { width: '0%' },
      { 
        width: `${percentage}%`,
        duration: 2,
        delay: delay,
        ease: 'power2.out'
      }
    );

    // Animate percentage text
    gsap.fromTo(percentageElement,
      { textContent: '0%' },
      {
        textContent: `${percentage}%`,
        duration: 2,
        delay: delay,
        ease: 'power2.out',
        snap: { textContent: 1 }
      }
    );

  }, [percentage, delay]);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-medium">{skill}</span>
        <span ref={percentageRef} className="text-cyan-400 font-bold">0%</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
        <div 
          ref={progressRef}
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
