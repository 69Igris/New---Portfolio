import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import SpaceBackground from './components/SpaceBackground';
import CustomCursor from './components/CustomCursor';
import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize GSAP animations
    gsap.set('.page-content', { opacity: 0, y: 50 });
    gsap.to('.page-content', { 
      opacity: 1, 
      y: 0, 
      duration: 1, 
      ease: 'power2.out' 
    });
  }, []);

  return (
    <Router>
      <div className="App relative">
        <SpaceBackground />
        <CustomCursor />
        <Navigation />
        <main className="page-content relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
