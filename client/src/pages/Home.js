import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ChevronDown, 
  Github, 
  Linkedin, 
  Mail, 
  Code, 
  Palette, 
  Database,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import TypewriterEffect from '../components/TypewriterEffect';
import InteractiveGraphic from '../components/InteractiveGraphic';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import SkillCard from '../components/SkillCard';
import ProjectCard from '../components/ProjectCard';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // Sample data for skills and projects
  const featuredSkills = [
    { skill: 'Frontend', icon: <Code />, description: 'React, Next.js' },
    { skill: 'Backend', icon: <Database />, description: 'Node.js, Python' },
    { skill: 'Design', icon: <Palette />, description: 'UI/UX, Figma' }
  ];

  const featuredProjects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      shortDescription: "Full-stack e-commerce solution with modern UI",
      description: "A comprehensive e-commerce platform built with React and Node.js, featuring user authentication, payment processing, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      features: ["User Authentication", "Payment Processing", "Admin Dashboard"],
      image: null,
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      shortDescription: "Collaborative task management with real-time updates",
      description: "A modern task management application with drag-and-drop functionality and team collaboration features.",
      technologies: ["React", "Express", "PostgreSQL", "WebSocket"],
      features: ["Drag & Drop", "Real-time Collaboration", "Team Management"],
      image: null,
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: true
    }
  ];

  useEffect(() => {
    // Hero section animations
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.children,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.2, 
          ease: 'power2.out' 
        }
      );
    }

    // Scroll-triggered animations for each section
    ScrollTrigger.create({
      trigger: aboutRef.current,
      start: 'top 80%',
      onEnter: () => {
        if (aboutRef.current) {
          gsap.fromTo(aboutRef.current.children,
            { opacity: 0, y: 50 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.8, 
              stagger: 0.1, 
              ease: 'power2.out' 
            }
          );
        }
      }
    });

    ScrollTrigger.create({
      trigger: skillsRef.current,
      start: 'top 80%',
      onEnter: () => {
        if (skillsRef.current) {
          gsap.fromTo(skillsRef.current.querySelectorAll('.skill-card'),
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
      }
    });

    ScrollTrigger.create({
      trigger: projectsRef.current,
      start: 'top 80%',
      onEnter: () => {
        if (projectsRef.current) {
          gsap.fromTo(projectsRef.current.querySelectorAll('.project-card'),
            { opacity: 0, y: 50 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.8, 
              stagger: 0.2, 
              ease: 'power2.out' 
            }
          );
        }
      }
    });

    ScrollTrigger.create({
      trigger: contactRef.current,
      start: 'top 80%',
      onEnter: () => {
        if (contactRef.current) {
          gsap.fromTo(contactRef.current.children,
            { opacity: 0, y: 50 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.8, 
              stagger: 0.1, 
              ease: 'power2.out' 
            }
          );
        }
      }
    });

  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <div className="mb-6">
                <h1 className="text-5xl lg:text-7xl font-bold mb-4">
                  <span className="modern-text">Hi, I'm</span>
                  <br />
                  <span className="text-white">Aaryan Yadav</span>
                </h1>
              </div>

              <div className="mb-8">
                <TypewriterEffect 
                  text="Full-Stack Developer & UI/UX Designer"
                  speed={80}
                  className="text-xl lg:text-2xl text-gray-300"
                />
              </div>

              <div className="mb-8">
                <p className="text-lg text-gray-400 mb-6 max-w-lg mx-auto lg:mx-0">
                  Creating immersive digital experiences with cutting-edge technology and creative design.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button asChild variant="modern" size="lg" className="interactive">
                    <Link to="/projects">View My Work</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="interactive">
                    <Link to="/contact">Get In Touch</Link>
                  </Button>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center lg:justify-start space-x-6">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 interactive"
                >
                  <Github size={24} />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 interactive"
                >
                  <Linkedin size={24} />
                </a>
                <a 
                  href="mailto:your.email@example.com"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 interactive"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>

            {/* Right Column - Interactive Graphic */}
            <div className="relative">
              <div className="w-full h-96 lg:h-[500px] relative">
                <InteractiveGraphic type="hero" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-cyan-400" size={32} />
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-8">
              About Me
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              I'm a passionate full-stack developer with over 1.5 years of experience creating 
              digital solutions that make a difference. I specialize in modern web technologies 
              and love turning complex problems into simple, beautiful designs.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <Card className="glass">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">10+</div>
                  <div className="text-gray-300">Projects Completed</div>
                </CardContent>
              </Card>
              <Card className="glass">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">1.5+</div>
                  <div className="text-gray-300">Years Experience</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Core Skills
            </h2>
            <p className="text-xl text-gray-400">
              Technologies and tools I work with
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {featuredSkills.map((skill, index) => (
              <div key={skill.skill} className="skill-card">
                <SkillCard
                  skill={skill.skill}
                  icon={skill.icon}
                  description={skill.description}
                  delay={index * 0.1}
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="interactive">
              <Link to="/skills">
                View All Skills
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section ref={projectsRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-400">
              Some of my recent work
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {featuredProjects.map((project, index) => (
              <div key={project.id} className="project-card">
                <ProjectCard
                  project={project}
                  index={index}
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="modern" size="lg" className="interactive">
              <Link to="/projects">
                View All Projects
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section ref={contactRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-white mb-4">
                  Let's Work Together
                </CardTitle>
                <CardDescription className="text-xl text-gray-400">
                  Have a project in mind? I'd love to hear about it.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-300 mb-8">
                  Whether you need a full-stack application, a beautiful website, or help with 
                  an existing project, I'm here to help bring your ideas to life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild variant="modern" size="lg" className="interactive">
                    <Link to="/contact">Get In Touch</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="interactive">
                    <a href="mailto:your.email@example.com">Send Email</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
