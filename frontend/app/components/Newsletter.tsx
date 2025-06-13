'use client';

import React, { useState } from 'react';
import { postToStrapi } from '../utils/strapi';
import { AnimatedSubscribeButton } from '@/components/magicui/animated-subscribe-button';
import { ChevronRight, Check } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [touched, setTouched] = useState(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getEmailError = (email: string) => {
    if (!email) return 'Email is required';
    if (!isValidEmail(email)) return 'Please enter a valid email address';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    
    const emailError = getEmailError(email);
    if (emailError) {
      setErrorMessage(emailError);
      setStatus('idle');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const data = { email };
      await postToStrapi('/newsletters', data);
      setStatus('success');
      setEmail('');
      setTouched(false);
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to subscribe. Please try again.');
      console.error('Newsletter subscription error:', error);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (touched) {
      setErrorMessage(getEmailError(e.target.value));
    }
    // Reset status if email becomes invalid
    if (status === 'success' && !isValidEmail(e.target.value)) {
      setStatus('idle');
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setErrorMessage(getEmailError(email));
  };

  const isButtonDisabled = status === 'loading' || !email || !isValidEmail(email);

  return (
    <form onSubmit={handleSubmit} className="relative">
      <h3 className="text-sm uppercase tracking-wider text-light/60 text-center mb-4">Sign up to our newsletter</h3>
      <div className="relative">
        <input 
          type="email" 
          value={email}
          onChange={handleEmailChange}
          onBlur={handleBlur}
          placeholder="Enter your email address"
          className={`w-full bg-transparent border-b py-2 text-black placeholder:text-neutral-600 focus:outline-none transition-colors ${
            touched && errorMessage ? 'border-red-500' : 'border-neutral-800 focus:border-black'
          }`}
          required
          aria-invalid={touched && !!errorMessage}
          aria-describedby={touched && errorMessage ? "email-error" : undefined}
        />
        <AnimatedSubscribeButton 
          className="w-full mt-4"
          type="submit"
          disabled={isButtonDisabled}
          showConfetti={status === 'success' && isValidEmail(email)}
        >
          <span className="group inline-flex items-center justify-center w-full">
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            {status !== 'loading' && <ChevronRight className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />}
          </span>
          <span className="group inline-flex items-center justify-center w-full">
            <Check className="mr-2 size-4" />
            Subscribed
          </span>
        </AnimatedSubscribeButton>
        {touched && errorMessage && (
          <p 
            id="email-error"
            className="text-red-500 text-sm mt-2 text-center absolute -bottom-6 left-0 right-0"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
      </div>
    </form>
  );
};

export default Newsletter; 