import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, 
  Palette, 
  Database, 
  Smartphone, 
  Globe, 
  Cpu,
  GitBranch,
  Zap,
  Shield,
  Layers
} from 'lucide-react';
import SkillCard from '../components/SkillCard';
import ProgressBar from '../components/ProgressBar';
import InteractiveGraphic from '../components/InteractiveGraphic';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const skillsGridRef = useRef(null);
  const progressSectionRef = useRef(null);
  const splineRef = useRef(null);

  const skills = [
    { skill: 'Frontend', icon: <Code />, description: 'React, Vue, Angular' },
    { skill: 'Backend', icon: <Database />, description: 'Node.js, Python, PHP' },
    { skill: 'Design', icon: <Palette />, description: 'UI/UX, Figma, Adobe' },
    { skill: 'Mobile', icon: <Smartphone />, description: 'React Native, Flutter' },
    { skill: 'Web', icon: <Globe />, description: 'HTML, CSS, JavaScript' },
    { skill: 'Version Control', icon: <GitBranch />, description: 'Git, GitHub, GitLab' },
    { skill: 'Performance', icon: <Zap />, description: 'Optimization, Caching' },
    { skill: 'Security', icon: <Shield />, description: 'Authentication, Encryption' },
    { skill: 'Architecture', icon: <Layers />, description: 'Microservices, APIs' }
  ];

  const proficiencies = [
    { skill: 'JavaScript/TypeScript', percentage: 95 },
    { skill: 'React/Next.js', percentage: 90 },
    { skill: 'Node.js/Express', percentage: 85 },
    { skill: 'Python/Django', percentage: 80 },
    { skill: 'UI/UX Design', percentage: 75 },
    { skill: 'MongoDB/PostgreSQL', percentage: 85 },
    { skill: 'AWS/Cloud Services', percentage: 70 }
  ];

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const skillsGrid = skillsGridRef.current;
    const progressSection = progressSectionRef.current;
    const spline = splineRef.current;

    if (!container) return;

    // Set initial states
    gsap.set([title, skillsGrid, progressSection], { opacity: 0, y: 50 });
    gsap.set(spline, { opacity: 0, scale: 0.8 });

    // Create timeline
    const tl = gsap.timeline();

    // Page entrance animation
    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out'
    })
    .to(spline, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: 'back.out(1.7)'
    }, '-=0.5')
    .to(skillsGrid, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out'
    }, '-=0.8')
    .to(progressSection, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out'
    }, '-=0.6');

    // Floating animation for Spline 3D
    gsap.to(spline, {
      y: -15,
      duration: 4,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true
    });

    // Scroll-triggered animations for skill cards
    ScrollTrigger.create({
      trigger: skillsGrid,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(skillsGrid.children,
          { opacity: 0, y: 50, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)'
          }
        );
      }
    });

    // Scroll-triggered animations for progress bars
    ScrollTrigger.create({
      trigger: progressSection,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(progressSection.querySelectorAll('.progress-item'),
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out'
          }
        );
      }
    });

  }, []);

  return (
    <div ref={containerRef} className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div ref={titleRef} className="mb-8">
            <h1 className="text-5xl lg:text-6xl font-bold mb-4">
              <span className="modern-text">Skills &</span>
              <br />
              <span className="text-white">Expertise</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A comprehensive overview of my technical skills and proficiency levels
            </p>
          </div>

          {/* Interactive Component */}
          <div ref={splineRef} className="w-full max-w-md mx-auto mb-12">
            <div className="w-full h-64 relative">
              <InteractiveGraphic type="skills" />
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div ref={skillsGridRef} className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {skills.map((skill, index) => (
              <SkillCard
                key={skill.skill}
                skill={skill.skill}
                icon={skill.icon}
                description={skill.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Proficiency Section */}
        <div ref={progressSectionRef} className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Proficiency Levels
          </h2>
          <div className="space-y-6">
            {proficiencies.map((item, index) => (
              <div key={item.skill} className="progress-item">
                <ProgressBar
                  skill={item.skill}
                  percentage={item.percentage}
                  delay={index * 0.2}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
