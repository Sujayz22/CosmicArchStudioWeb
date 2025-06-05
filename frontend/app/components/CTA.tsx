'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaXTwitter, FaEnvelope, FaPhone, FaLocationDot } from 'react-icons/fa6';
import { z } from 'zod';
import { AnimatedSubscribeButton } from '@/components/magicui/animated-subscribe-button';
import { useInView } from 'react-intersection-observer';

const projectTypes = [
  "Residential Design",
  "Commercial Design",
  "Interior Design",
  "Renovation",
  "Space Planning",
  "Landscape Design"
] as const;

// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  phone: z.string().min(1, 'Phone number is required')
    .regex(/^\+?\d+$/, 'Only numbers and + symbol are allowed'),
  projectType: z.enum(projectTypes, {
    errorMap: () => ({ message: 'Please select a project type' }),
  }),
  location: z.string().min(1, 'Location is required'),
  budget: z.string().min(1, 'Budget is required'),
  projectSize: z.string().min(1, 'Project size is required'),
  startDate: z.string().optional(),
  completionDate: z.string().optional(),
  message: z.string().min(1, 'Message is required').max(1000, 'Message is too long'),
});

type FormData = z.infer<typeof formSchema>;

const CTA = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    projectType: '' as any,
    location: '',
    budget: '',
    projectSize: '',
    startDate: '',
    completionDate: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = formSchema.parse(formData);
      setErrors({});
      
      // Simulate successful form submission
      console.log(validatedData);
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          projectType: '' as any,
          location: '',
          budget: '',
          projectSize: '',
          startDate: '',
          completionDate: '',
          message: ''
        });
      }, 2000);
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof FormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    if (field === 'phone') {
      if (value && !/^\+?\d*$/.test(value)) {
        return;
      }
    }
    
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          opacity: { duration: 0.6 },
          y: { duration: 0.8 }
        }}
        className="bg-primary rounded-[2.5rem] py-16 mx-4 mb-4 md:mx-8 md:mb-12"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Contact Info */}
            <div className="space-y-8">
              <div className="space-y-6 bg-muted/55 backdrop-blur-sm rounded-[2rem] p-8 shadow-lg">
                <div
                  className="group cursor-email hover:bg-primary/30 p-2 rounded-lg transition-colors"
                  onClick={() => window.location.href = 'mailto:info@cosmicarchstudio.com'}
                  title="Send email"
                >
                  <h3 className="text-sm uppercase tracking-wider text-light/60 mb-2 flex items-center gap-2">
                    <FaEnvelope className="text-secondary" />
                    EMAIL
                  </h3>
                  <p className="text-light text-lg group-hover:text-secondary transition-colors">
                    info@cosmicarchstudio.com
                  </p>
                </div>

                <div
                  className="group cursor-phone hover:bg-primary/30 p-2 rounded-lg transition-colors"
                  onClick={() => window.location.href = 'tel:+919445796030'}
                  title="Call us"
                >
                  <h3 className="text-sm uppercase tracking-wider text-light/60 mb-2 flex items-center gap-2">
                    <FaPhone className="text-secondary" />
                    PHONE
                  </h3>
                  <p className="text-light text-lg group-hover:text-secondary transition-colors">
                    +91 94457 96030
                  </p>
                </div>

                <div
                  className="group cursor-directions hover:bg-primary/30 p-2 rounded-lg transition-colors"
                  onClick={() => window.open('https://maps.google.com/?q=150+Design+Avenue,+Suite+200+Creative+District,+NY+10001', '_blank')}
                  title="Get directions"
                >
                  <h3 className="text-sm uppercase tracking-wider text-light/60 mb-2 flex items-center gap-2">
                    <FaLocationDot className="text-secondary" />
                    OFFICE
                  </h3>
                  <p className="text-light text-lg group-hover:text-secondary transition-colors">
                    150 Design Avenue, Suite 200<br />
                    Creative District, NY 10001
                  </p>
                </div>

                <div className='bg-accent/55 backdrop-blur-sm rounded-xl p-8 shadow-lg'>
                  <h3 className="text-sm uppercase tracking-wider text-light/60 mb-4">OPENING HOURS</h3>
                  <div className="grid grid-cols-2 gap-y-3 text-sm sm:text-base">
                    <div className="text-light">
                      <span className="font-medium">Monday - Friday</span>
                    </div>
                    <div className="text-light/80 text-right">
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="text-light">
                      <span className="font-medium">Saturday</span>
                    </div>
                    <div className="text-light/80 text-right">
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="text-light">
                      <span className="font-medium">Sunday</span>
                    </div>
                    <div className="text-light/60 text-right">
                      <span>Closed</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-wider text-light/60 mb-4">FOLLOW US</h3>
                  <div className="flex gap-4">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                       className="text-light hover:text-secondary hover:scale-110 transition-colors">
                      <FaInstagram size={24} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                       className="text-light hover:text-secondary hover:scale-110 transition-colors">
                      <FaLinkedin size={24} />
                    </a>
                    <a href="https://x.com" target="_blank" rel="noopener noreferrer"
                       className="text-light hover:text-secondary hover:scale-110 transition-colors">
                      <FaXTwitter size={24} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="bg-white/95 backdrop-blur-sm rounded-[2rem] p-8 shadow-lg">
              <h2 className="text-4xl font-bold font-playfair text-primary mb-2">Get a Free Estimate</h2>
              <h4 className="text-neutral-600 mb-6">Get your custom quote now! Contact one of our assessors by phone or by filling out the form below to get started.</h4>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                      Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-500' : 'border-neutral/20'} focus:outline-none focus:border-primary bg-white text-neutral-800 placeholder-neutral-400`}
                      placeholder="John Doe"
                      required
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                      Phone<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-neutral/20'} focus:outline-none focus:border-primary bg-white text-neutral-800 placeholder-neutral-400`}
                      placeholder="+(91) XXXXX XXXXX"
                      required
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                    Email<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-neutral/20'} focus:outline-none focus:border-primary bg-white text-neutral-800 placeholder-neutral-400`}
                    placeholder="johndoe@email.com"
                    required
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-neutral-700 mb-1">
                    Project Type<span className="text-red-500">*</span>
                  </label>
                  <select
                    id="projectType"
                    value={formData.projectType}
                    onChange={(e) => handleInputChange('projectType', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.projectType ? 'border-red-500' : 'border-neutral/20'} focus:outline-none focus:border-primary bg-white text-neutral-800`}
                    required
                  >
                    <option value="" className="text-neutral-400">Select...</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type} className="text-neutral-800">{type}</option>
                    ))}
                  </select>
                  {errors.projectType && <p className="text-red-500 text-sm mt-1">{errors.projectType}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-1">
                      Location<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border ${errors.location ? 'border-red-500' : 'border-neutral/20'} focus:outline-none focus:border-primary bg-white text-neutral-800 placeholder-neutral-400`}
                      placeholder="City, State"
                      required
                    />
                    {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-neutral-700 mb-1">
                      Budget<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border ${errors.budget ? 'border-red-500' : 'border-neutral/20'} focus:outline-none focus:border-primary bg-white text-neutral-800 placeholder-neutral-400`}
                      placeholder="Enter your budget"
                      required
                    />
                    {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
                  </div>
                  <div>
                    <label htmlFor="projectSize" className="block text-sm font-medium text-neutral-700 mb-1">
                      Project Size (SQFT)<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="projectSize"
                      value={formData.projectSize}
                      onChange={(e) => handleInputChange('projectSize', e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg border ${errors.projectSize ? 'border-red-500' : 'border-neutral/20'} focus:outline-none focus:border-primary bg-white text-neutral-800 placeholder-neutral-400`}
                      placeholder="e.g., 1500"
                      required
                    />
                    {errors.projectSize && <p className="text-red-500 text-sm mt-1">{errors.projectSize}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-neutral-700 mb-1">
                      Preferred Start Date
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-neutral/20 focus:outline-none focus:border-primary bg-white text-neutral-800"
                    />
                  </div>
                  <div>
                    <label htmlFor="completionDate" className="block text-sm font-medium text-neutral-700 mb-1">
                      Desired Completion Date
                    </label>
                    <input
                      type="date"
                      id="completionDate"
                      value={formData.completionDate}
                      onChange={(e) => handleInputChange('completionDate', e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-neutral/20 focus:outline-none focus:border-primary bg-white text-neutral-800"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                    Message<span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${errors.message ? 'border-red-500' : 'border-neutral/20'} focus:outline-none focus:border-primary bg-white text-neutral-800 placeholder-neutral-400 min-h-[120px] mb-6`}
                    placeholder="Write your message here"
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <AnimatedSubscribeButton className="w-full text-white" showConfetti={true}>
                  <span className="group inline-flex items-center justify-center">
                    Request Free Estimate
                  </span>
                  <span className="group inline-flex items-center justify-center">
                    Request Sent!
                  </span>
                </AnimatedSubscribeButton>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CTA; 