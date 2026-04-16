import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import ProjectCard from '../components/ProjectCard';
import InteractiveGraphic from '../components/InteractiveGraphic';
import { buildApiUrl } from '../lib/api';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const projectsGridRef = useRef(null);
  const loadMoreRef = useRef(null);
  const splineRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleProjects, setVisibleProjects] = useState(6);

  // Mock data - replace with API call
  const mockProjects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      shortDescription: "Full-stack e-commerce solution with modern UI",
      description: "A comprehensive e-commerce platform built with React and Node.js, featuring user authentication, payment processing, inventory management, and admin dashboard. Includes real-time notifications and responsive design.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT", "Socket.io"],
      features: ["User Authentication", "Payment Processing", "Real-time Notifications", "Admin Dashboard", "Responsive Design"],
      image: null,
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      shortDescription: "Collaborative task management with real-time updates",
      description: "A modern task management application with drag-and-drop functionality, team collaboration features, and real-time updates. Built with React, Express, and WebSocket for live collaboration.",
      technologies: ["React", "Express", "PostgreSQL", "WebSocket", "DnD", "Material-UI"],
      features: ["Drag & Drop", "Real-time Collaboration", "Team Management", "Progress Tracking", "File Attachments"],
      image: null,
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: true
    },
    {
      id: 3,
      title: "Weather Dashboard",
      shortDescription: "Interactive weather app with location-based forecasts",
      description: "A beautiful weather dashboard that provides detailed forecasts, interactive maps, and location-based weather data. Features include 7-day forecasts, hourly updates, and weather alerts.",
      technologies: ["Vue.js", "Chart.js", "OpenWeather API", "Geolocation", "PWA"],
      features: ["7-Day Forecast", "Interactive Maps", "Weather Alerts", "Location Services", "PWA Support"],
      image: null,
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: false
    },
    {
      id: 4,
      title: "Social Media Analytics",
      shortDescription: "Analytics dashboard for social media metrics",
      description: "A comprehensive analytics dashboard for tracking social media performance across multiple platforms. Features include data visualization, custom reports, and automated insights.",
      technologies: ["React", "D3.js", "Python", "Django", "Redis", "Celery"],
      features: ["Data Visualization", "Custom Reports", "Automated Insights", "Multi-platform Support", "Real-time Updates"],
      image: null,
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: false
    },
    {
      id: 5,
      title: "Portfolio Website",
      shortDescription: "Modern portfolio with 3D animations and interactions",
      description: "A stunning portfolio website featuring 3D animations, interactive elements, and smooth transitions. Built with modern web technologies and optimized for performance.",
      technologies: ["React", "Three.js", "GSAP", "Framer Motion", "Tailwind CSS"],
      features: ["3D Animations", "Interactive Elements", "Smooth Transitions", "Responsive Design", "Performance Optimized"],
      image: null,
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: true
    },
    {
      id: 6,
      title: "Chat Application",
      shortDescription: "Real-time chat with video calling capabilities",
      description: "A modern chat application with real-time messaging, video calling, file sharing, and group chat functionality. Built with WebRTC for video calls and Socket.io for real-time messaging.",
      technologies: ["React", "Socket.io", "WebRTC", "Node.js", "Express", "MongoDB"],
      features: ["Real-time Messaging", "Video Calls", "File Sharing", "Group Chats", "Message Encryption"],
      image: null,
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      featured: false
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await fetch(buildApiUrl('/api/projects'));
        
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setProjects(data);
          } else {
            setProjects(mockProjects);
          }
        } else {
          setProjects(mockProjects);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        setProjects(mockProjects);
      }
      setLoading(false);
    };

    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const projectsGrid = projectsGridRef.current;
    const loadMore = loadMoreRef.current;
    const spline = splineRef.current;

    if (!container) return;

    // Set initial states
    gsap.set([title, projectsGrid, loadMore], { opacity: 0, y: 50 });
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
    .to(projectsGrid, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out'
    }, '-=0.8')
    .to(loadMore, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.6');

    // Floating animation for Spline 3D
    gsap.to(spline, {
      y: -20,
      duration: 3,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true
    });

  }, [loading]);

  const handleLoadMore = () => {
    setVisibleProjects(prev => Math.min(prev + 3, projects.length));
    
    // Animate new cards
    const newCards = projectsGridRef.current?.children;
    if (newCards) {
      gsap.fromTo(newCards.slice(visibleProjects, visibleProjects + 3),
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
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div ref={titleRef} className="mb-8">
            <h1 className="text-5xl lg:text-6xl font-bold mb-4">
              <span className="modern-text">Featured</span>
              <br />
              <span className="text-white">Projects</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A showcase of my recent work and creative projects
            </p>
          </div>

          {/* Interactive Component */}
          <div ref={splineRef} className="w-full max-w-md mx-auto mb-12">
            <div className="w-full h-64 relative">
              <InteractiveGraphic type="projects" />
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div ref={projectsGridRef} className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, visibleProjects).map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Load More Button */}
        {visibleProjects < projects.length && (
          <div ref={loadMoreRef} className="text-center">
            <Button 
              onClick={handleLoadMore}
              variant="modern"
              size="lg"
              className="interactive"
            >
              Load More Projects
            </Button>
          </div>
        )}

        {/* Featured Projects Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.filter(project => project.featured).map((project, index) => (
              <Card key={project.id} className="glass p-6">
                <CardHeader>
                  <CardTitle className="text-white text-2xl mb-2">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-cyan-400/20 text-cyan-400 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <Button asChild variant="modern" className="interactive">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          View Live
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button asChild variant="outline" className="interactive">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          View Code
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
