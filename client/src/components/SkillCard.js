import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const SkillCard = ({ skill, icon, description, delay = 0 }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Initial animation
    gsap.fromTo(card,
      { opacity: 0, y: 50, scale: 0.8 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.8,
        delay: delay,
        ease: 'back.out(1.7)'
      }
    );

  }, [delay]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    if (isHovered) {
      gsap.to(card, {
        scale: 1.05,
        rotationY: 5,
        rotationX: 5,
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(card, {
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      className="glass rounded-lg p-6 cursor-pointer interactive group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <div className="text-center">
        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
          {skill}
        </h3>
        <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>
      </div>
      
      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default SkillCard;

