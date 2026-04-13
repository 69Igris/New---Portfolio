import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    // Animate navigation on mount
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    );
  }, []);

  useEffect(() => {
    // Animate menu items
    if (isMenuOpen) {
      gsap.fromTo(menuRef.current.children,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/skills', label: 'Skills' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-md border-b border-white/10"
      style={{ zIndex: 1000 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors duration-300"
          >
            Aaryan
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-cyan-400 ${
                  location.pathname === item.path 
                    ? 'text-cyan-400' 
                    : 'text-white hover:text-cyan-300'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-cyan-400 transition-colors duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div 
            ref={menuRef}
            className="md:hidden glass border-t border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 text-base font-medium transition-all duration-300 hover:text-cyan-400 ${
                    location.pathname === item.path 
                      ? 'text-cyan-400' 
                      : 'text-white hover:text-cyan-300'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
