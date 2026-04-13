import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const SpaceBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create stars
    const createStars = () => {
      const stars = [];
      const numStars = 200;

      for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.position = 'absolute';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.backgroundColor = '#ffffff';
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.opacity = Math.random() * 0.8 + 0.2;
        
        // Add twinkle animation
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`;
        star.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(star);
        stars.push(star);
      }

      return stars;
    };

    // Create shooting stars
    const createShootingStars = () => {
      const createShootingStar = () => {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        shootingStar.style.position = 'absolute';
        shootingStar.style.width = '2px';
        shootingStar.style.height = '2px';
        shootingStar.style.backgroundColor = '#00ffff';
        shootingStar.style.borderRadius = '50%';
        shootingStar.style.left = '0%';
        shootingStar.style.top = Math.random() * 50 + '%';
        shootingStar.style.boxShadow = '0 0 6px #00ffff';
        
        container.appendChild(shootingStar);

        // Animate shooting star
        gsap.to(shootingStar, {
          x: window.innerWidth + 100,
          y: window.innerHeight * 0.3,
          duration: 2,
          ease: 'power2.out',
          onComplete: () => {
            container.removeChild(shootingStar);
          }
        });
      };

      // Create shooting stars periodically
      const interval = setInterval(createShootingStar, 3000);
      return () => clearInterval(interval);
    };

    // Create moving particles
    const createParticles = () => {
      const particles = [];
      const numParticles = 50;

      for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = '#00ffff';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.boxShadow = '0 0 10px #00ffff';
        
        container.appendChild(particle);
        particles.push(particle);

        // Animate particles
        gsap.to(particle, {
          y: -100,
          x: Math.random() * 200 - 100,
          duration: Math.random() * 10 + 5,
          repeat: -1,
          ease: 'none',
          delay: Math.random() * 5
        });
      }

      return particles;
    };

    const stars = createStars();
    const cleanupShootingStars = createShootingStars();
    const particles = createParticles();

    // Cleanup function
    return () => {
      cleanupShootingStars();
      stars.forEach(star => {
        if (star.parentNode) {
          star.parentNode.removeChild(star);
        }
      });
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 w-full h-full space-bg pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
        zIndex: -1
      }}
    />
  );
};

export default SpaceBackground;
