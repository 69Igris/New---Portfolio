import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import InteractiveGraphic from '../components/InteractiveGraphic';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const contactInfoRef = useRef(null);
  const formRef = useRef(null);
  const splineRef = useRef(null);

  const contactInfo = [
    {
      icon: <Mail />,
      title: 'Email',
      value: 'work.with.igris@gmail.com',
      link: 'mailto:work.with.igris@gmail.com'
    },
    {
      icon: <Phone />,
      title: 'Phone',
      value: '+91 9034331716',
      link: 'tel:+919034331716'
    },
    {
      icon: <MapPin />,
      title: 'Location',
      value: 'Sonipat, Haryana, India',
      link: 'https://www.google.com/maps/place/Sonipat'
    }
  ];

  const socialLinks = [
    {
      icon: <Github />,
      name: 'GitHub',
      url: 'https://github.com/69Igris',
      color: 'hover:text-gray-400'
    },
    {
      icon: <Linkedin />,
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/aaryan-yadav-272b8a315/',
      color: 'hover:text-blue-400'
    },
    {
      icon: <Twitter />,
      name: 'Twitter',
      url: 'https://x.com/Work_with_Igris',
      color: 'hover:text-blue-400'
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const contactInfo = contactInfoRef.current;
    const form = formRef.current;
    const spline = splineRef.current;

    if (!container) return;

    // Set initial states
    gsap.set([title, contactInfo, form], { opacity: 0, y: 50 });
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
    .to(contactInfo, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out'
    }, '-=0.8')
    .to(form, {
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

    // Animate contact info cards
    ScrollTrigger.create({
      trigger: contactInfo,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(contactInfo.children,
          { opacity: 0, y: 30, scale: 0.9 },
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

  }, []);

  return (
    <div ref={containerRef} className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div ref={titleRef} className="mb-8">
            <h1 className="text-5xl lg:text-6xl font-bold mb-4">
              <span className="modern-text">Let's</span>
              <br />
              <span className="text-white">Connect</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's start a conversation.
            </p>
          </div>

          {/* Interactive Graphic */}
          <div ref={splineRef} className="w-full max-w-md mx-auto mb-12">
            <div className="w-full h-64 relative">
              <InteractiveGraphic type="contact" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div ref={contactInfoRef} className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Get In Touch
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                I'm always interested in new opportunities and exciting projects. 
                Whether you have a question, want to collaborate, or just want to say hi, 
                I'd love to hear from you!
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={info.title}
                  href={info.link}
                  className="flex items-center p-4 glass rounded-lg hover:bg-cyan-400/10 transition-all duration-300 group interactive"
                >
                  <div className="text-cyan-400 mr-4 group-hover:scale-110 transition-transform duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-medium group-hover:text-cyan-400 transition-colors duration-300">
                      {info.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                Follow Me
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 ${social.color} transition-colors duration-300 p-3 glass rounded-lg hover:scale-110 transition-transform duration-300 interactive`}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="glass p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">
                Response Time
              </h3>
              <p className="text-gray-400">
                I typically respond to messages within 24 hours. 
                For urgent inquiries, please mention it in your message.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div ref={formRef}>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
