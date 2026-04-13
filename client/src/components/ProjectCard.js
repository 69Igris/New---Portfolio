import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Initial animation
    gsap.fromTo(card,
      { opacity: 0, y: 100, rotationY: -15 },
      { 
        opacity: 1, 
        y: 0, 
        rotationY: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power2.out'
      }
    );

  }, [index]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    if (isHovered) {
      gsap.to(card, {
        scale: 1.02,
        rotationY: isFlipped ? 180 : 0,
        duration: 0.6,
        ease: 'power2.out'
      });
    } else {
      gsap.to(card, {
        scale: 1,
        rotationY: isFlipped ? 180 : 0,
        duration: 0.6,
        ease: 'power2.out'
      });
    }
  }, [isHovered, isFlipped]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      ref={cardRef}
      className="relative w-full h-full"
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card 
        className="glass h-full cursor-pointer interactive group"
        style={{
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          backfaceVisibility: 'hidden'
        }}
      >
        {/* Front of card */}
        <div className={`${isFlipped ? 'hidden' : 'block'}`}>
          <CardHeader>
            <div className="aspect-video bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-lg mb-4 flex items-center justify-center">
              {project.image ? (
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-float"></div>
                  <p className="text-cyan-400 text-sm">Project Preview</p>
                </div>
              )}
            </div>
            <CardTitle className="text-white group-hover:text-cyan-400 transition-colors duration-300">
              {project.title}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {project.shortDescription}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 3).map((tech, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-1 bg-cyan-400/20 text-cyan-400 text-xs rounded-full"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-1 bg-gray-600/20 text-gray-400 text-xs rounded-full">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1 interactive"
                onClick={handleFlip}
              >
                <Eye className="w-4 h-4 mr-2" />
                Details
              </Button>
              {project.liveUrl && (
                <Button 
                  size="sm" 
                  variant="modern" 
                  asChild
                  className="flex-1 interactive"
                >
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </div>

        {/* Back of card */}
        <div className={`${isFlipped ? 'block' : 'hidden'} h-full`}>
          <CardHeader>
            <CardTitle className="text-white mb-4">
              {project.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full flex flex-col">
            <div className="flex-1">
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                {project.description}
              </p>
              <div className="mb-4">
                <h4 className="text-white font-medium mb-2">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 bg-cyan-400/20 text-cyan-400 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              {project.features && (
                <div className="mb-4">
                  <h4 className="text-white font-medium mb-2">Key Features:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    {project.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-cyan-400 mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-auto">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleFlip}
                className="flex-1 interactive"
              >
                Back
              </Button>
              {project.githubUrl && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  asChild
                  className="flex-1 interactive"
                >
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button 
                  size="sm" 
                  variant="modern" 
                  asChild
                  className="flex-1 interactive"
                >
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default ProjectCard;
