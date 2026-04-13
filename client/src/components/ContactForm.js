import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const form = formRef.current;
    const button = buttonRef.current;

    if (!form || !button) return;

    // Initial animation
    gsap.fromTo(form,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );

  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Animate button
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });

    try {
      const API_URL = process.env.REACT_APP_API_URL || 'https://new-portfolio-04oq.onrender.com';
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Success animation
        gsap.to(buttonRef.current, {
          backgroundColor: '#10b981',
          duration: 0.3
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
      
      // Error animation
      gsap.to(buttonRef.current, {
        backgroundColor: '#ef4444',
        duration: 0.3
      });
    } finally {
      setIsSubmitting(false);
      
      // Reset button color after delay
      setTimeout(() => {
        gsap.to(buttonRef.current, {
          backgroundColor: '',
          duration: 0.3
        });
      }, 2000);
    }
  };

  return (
    <Card ref={formRef} className="glass max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-white text-2xl text-center">
          Get In Touch
        </CardTitle>
        <CardDescription className="text-gray-400 text-center">
          Have a project in mind? Let's discuss how we can work together.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
              Subject
            </label>
            <Input
              id="subject"
              name="subject"
              type="text"
              required
              value={formData.subject}
              onChange={handleInputChange}
              className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400"
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleInputChange}
              className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400 resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <div className="text-center">
            <Button
              ref={buttonRef}
              type="submit"
              disabled={isSubmitting}
              variant="modern"
              size="lg"
              className="interactive min-w-[200px]"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </div>

          {submitStatus === 'success' && (
            <div className="text-center p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
              <div className="flex items-center justify-center text-green-400">
                <CheckCircle className="w-5 h-5 mr-2" />
                Message sent successfully!
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="text-center p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <div className="flex items-center justify-center text-red-400">
                <AlertCircle className="w-5 h-5 mr-2" />
                Failed to send message. Please try again.
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
