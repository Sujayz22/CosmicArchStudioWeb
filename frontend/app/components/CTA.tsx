'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaXTwitter, FaEnvelope, FaPhone, FaLocationDot } from 'react-icons/fa6';
import { AnimatedSubscribeButton } from '@/components/magicui/animated-subscribe-button';
import { useInView } from 'react-intersection-observer';
import { ChevronRight, Check } from 'lucide-react';
import { fetchFromStrapi, postToStrapi } from '../utils/strapi';
import Newsletter from './Newsletter';
import { getClientFormSchema } from '../actions/getClientFormSchema';

interface ContactData {
  data: {
    MonFritiming: string;
    address: string;
    createdAt: string;
    documentId: string;
    email: string;
    id: number;
    instagram: string | null;
    linkedin: string | null;
    linktoaddress: string;
    phone: string;
    publishedAt: string;
    saturdaytiming: string;
    showAddress: boolean;
    showOfficeHours: boolean;
    sundayTiming: string;
    twitter: string | null;
    updatedAt: string;
  }
}

const CTA = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectTypes, setProjectTypes] = useState<string[]>([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Prevent multiple fetches
      if (dataFetched) {
        console.log('Data already fetched, skipping...');
        return;
      }
      
      console.log('Fetching contact data...');
      
      try {
        setLoading(true);
        setDataFetched(true);
        
        const [contactResponse, schemaResponse] = await Promise.all([
          fetchFromStrapi('/contact'),
          getClientFormSchema()
        ]);

        if (!contactResponse || !contactResponse.data) {
          throw new Error('Invalid contact data structure received from API');
        }

        console.log('Contact data fetched successfully');
        setContactData(contactResponse);
        setProjectTypes(schemaResponse.type);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch data');
        // Reset the flag on error so we can retry
        setDataFetched(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dataFetched]); // Only depend on dataFetched state

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    location: '',
    budget: '',
    projectSize: '',
    startDate: '',
    completionDate: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    setFormError('');

    try {
      // Validate phone number
      const phoneNumber = parseInt(formData.phone);
      if (isNaN(phoneNumber)) {
        throw new Error('Please enter a valid phone number');
      }

      // Validate project size
      const projectSize = parseInt(formData.projectSize);
      if (isNaN(projectSize)) {
        throw new Error('Please enter a valid project size');
      }

      const formPayload = {
        data: {
          name: formData.name,
          email: formData.email,
          phone: phoneNumber,
          type: formData.projectType,
          location: formData.location,
          budget: formData.budget,
          size: projectSize,
          startDate: formData.startDate || null,
          completionDate: formData.completionDate || null,
          Message: formData.message
        }
      };

      console.log('Submitting form with payload:', formPayload);
      
      const response = await postToStrapi('/clientforms', formPayload);
      console.log('Form submission response:', response);

      setFormStatus('success');
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        location: '',
        budget: '',
        projectSize: '',
        startDate: '',
        completionDate: '',
        message: ''
      });
    } catch (error) {
      setFormStatus('error');
      console.error('Form submission error details:', error);
      setFormError(error instanceof Error ? error.message : 'Failed to submit form. Please try again.');
    }
  };

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth <= 768);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!contactData?.data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-500">No contact data available</div>
      </div>
    );
  }

  const contact = contactData.data;

  return (
    <AnimatePresence>
      {/* CTA Section */}
      <div
        id="cta-section"
        className="bg-primary rounded-[2.5rem] py-4 mx-4 mb-4 md:mx-14 md:mb-12 md:py-16"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Contact Info */}
            <div className="space-y-8">
              <div className="space-y-6 bg-muted/55 backdrop-blur-sm rounded-[2rem] p-8 shadow-lg">
                <div
                  className="group cursor-email hover:bg-primary/30 p-2 rounded-lg transition-colors"
                  onClick={() => window.location.href = `mailto:${contact.email}`}
                  title="Send email"
                >
                  <h3 className="text-sm uppercase tracking-wider text-light/60 mb-2 flex items-center gap-2">
                    <FaEnvelope className="text-secondary" />
                    EMAIL
                  </h3>
                  <p className="text-light text-lg group-hover:text-secondary transition-colors overflow-hidden text-ellipsis whitespace-nowrap">
                    {isMobile ? `${contact.email.slice(0, 20)}...` : contact.email}
                  </p>
                </div>

                <div
                  className="group cursor-phone hover:bg-primary/30 p-2 rounded-lg transition-colors"
                  onClick={() => window.location.href = `tel:+${contact.phone}`}
                  title="Call us"
                >
                  <h3 className="text-sm uppercase tracking-wider text-light/60 mb-2 flex items-center gap-2">
                    <FaPhone className="text-secondary" />
                    PHONE
                  </h3>
                  <p className="text-light text-lg group-hover:text-secondary transition-colors">
                    +91 {contact.phone}
                  </p>
                </div>

                {contact.showAddress && (
                  <div
                    className="group cursor-directions hover:bg-primary/30 p-2 rounded-lg transition-colors"
                    onClick={() => window.open(contact.linktoaddress, '_blank')}
                    title="Get directions"
                  >
                    <h3 className="text-sm uppercase tracking-wider text-light/60 mb-2 flex items-center gap-2">
                      <FaLocationDot className="text-secondary" />
                      OFFICE
                    </h3>
                    <p className="text-light text-lg group-hover:text-secondary transition-colors">
                      {contact.address}
                    </p>
                  </div>
                )}

                {contact.showOfficeHours && (
                  <div className='bg-accent/55 backdrop-blur-sm rounded-xl p-8 shadow-lg'>
                    <h3 className="text-sm uppercase tracking-wider text-light/60 mb-4">OPENING HOURS</h3>
                    <div className="grid grid-cols-2 gap-y-3 text-sm sm:text-base">
                      <div className="text-light">
                        <span className="font-medium">Monday - Friday</span>
                      </div>
                      <div className="text-light/80 text-right">
                        <span>{contact.MonFritiming}</span>
                      </div>
                      <div className="text-light">
                        <span className="font-medium">Saturday</span>
                      </div>
                      <div className="text-light/80 text-right">
                        <span>{contact.saturdaytiming}</span>
                      </div>
                      <div className="text-light">
                        <span className="font-medium">Sunday</span>
                      </div>
                      <div className="text-light/60 text-right">
                        <span>{contact.sundayTiming}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-sm uppercase tracking-wider text-light/60 mb-4">FOLLOW US</h3>
                  <div className="flex gap-4">
                    {contact.instagram && (
                      <a href={contact.instagram} target="_blank" rel="noopener noreferrer" 
                         className="text-light hover:text-secondary hover:scale-110 transition-colors">
                        <FaInstagram size={24} />
                      </a>
                    )}
                    {contact.linkedin && (
                      <a href={contact.linkedin} target="_blank" rel="noopener noreferrer"
                         className="text-light hover:text-secondary hover:scale-110 transition-colors">
                        <FaLinkedin size={24} />
                      </a>
                    )}
                    {contact.twitter && (
                      <a href={contact.twitter} target="_blank" rel="noopener noreferrer"
                         className="text-light hover:text-secondary hover:scale-110 transition-colors">
                        <FaXTwitter size={24} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Newsletter Section */}
                <div className='bg-accent/55 backdrop-blur-sm rounded-xl p-8 shadow-lg'>
                  <Newsletter />
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
                      className="w-full px-4 py-2 rounded-lg border border-neutral/20 focus:outline-none focus:border-primary bg-white text-neutral-800 placeholder-neutral-400"
                      placeholder="John Doe"
                      required
                    />
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
                      className="w-full px-4 py-2 rounded-lg border border-neutral/20 focus:outline-none focus:border-primary bg-white text-neutral-800 placeholder-neutral-400"
                      placeholder="+(91) XXXXX XXXXX"
                      required
                    />
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
                    className="w-full px-4 py-2 rounded-lg border border-neutral/20 focus:outline-none focus:border-primary bg-white text-neutral-800 placeholder-neutral-400"
                    placeholder="johndoe@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-neutral-700 mb-1">
                    Project Type<span className="text-red-500">*</span>
                  </label>
                  <select
                    id="projectType"
                    value={formData.projectType}
                    onChange={(e) => handleInputChange('projectType', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-neutral/20 focus:outline-none focus:border-primary bg-white text-neutral-800"
                    required
                  >
                    <option value="">Select a project type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                  </select>
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
                      className="w-full px-4 py-2 rounded-lg border border-neutral/20 focus:outline-none focus:border-primary bg-white text-neutral-800 placeholder-neutral-400"
                      placeholder="City, State"
                      required
                    />
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
                      className="w-full px-4 py-2 rounded-lg border border-neutral/20 focus:outline-none focus:border-primary bg-white text-neutral-800 placeholder-neutral-400"
                      placeholder="Enter your budget"
                      required
                    />
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
                      className="w-full px-4 py-2 rounded-lg border border-neutral/20 focus:outline-none focus:border-primary bg-white text-neutral-800 placeholder-neutral-400"
                      placeholder="e.g., 1500"
                      required
                    />
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
                    className="w-full px-4 py-2 rounded-lg border border-neutral/20 focus:outline-none focus:border-primary bg-white text-neutral-800 placeholder-neutral-400 min-h-[120px] mb-6"
                    placeholder="Write your message here"
                    required
                  />
                </div>

                <AnimatedSubscribeButton 
                  className="w-full text-black" 
                  showConfetti={formStatus === 'success'}
                  disabled={formStatus === 'loading'}
                >
                  <span className="group inline-flex items-center justify-center">
                    {formStatus === 'loading' ? 'Submitting...' : 'Request Free Estimate'}
                  </span>
                  <span className="group inline-flex items-center justify-center">
                    {formStatus === 'success' ? 'Request Sent!' : 'Request Free Estimate'}
                  </span>
                </AnimatedSubscribeButton>
                {formError && (
                  <p className="text-red-500 text-sm mt-2 text-center">{formError}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default CTA;