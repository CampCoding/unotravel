'use client'; // Remove if not using Next.js App Router

import { useState, useEffect } from 'react';
import { Mail, MapPin, Plane, Compass } from 'lucide-react';

export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set your launch date here ⬇️
  const launchDate = new Date('2025-04-01T00:00:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Replace with your actual endpoint (Formspree, etc.)
    // Example: await fetch('https://formspree.io/f/your-id', { method: 'POST', body: JSON.stringify({ email }) })

    setMessage('Thank you! We\'ll notify you when we launch ✈️');
    setEmail('');
    setTimeout(() => setMessage(''), 5000);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-4xl w-full text-center pt-4">
          {/* Logo / Title */}
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* <Compass className="w-20 h-20 text-blue-600 animate-pulse" /> */}
                <Plane className="w-10 h-10 text-blue-800 absolute -top-2 -right-2 rotate-12" />
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-4">
              Uno Travel
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 font-light">
              Discover the world, one journey at a time
            </p>
          </div>

          {/* Coming Soon Text */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-blue-700 mb-4">
              Coming Soon
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're crafting extraordinary travel experiences just for you. 
              Get ready to explore hidden gems and unforgettable destinations.
            </p>
          </div>

          {/* Countdown Timer */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto mb-12">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl py-6 px-4 border border-blue-100">
                <div className="text-4xl md:text-6xl font-bold text-blue-700">
                  {value.toString().padStart(2, '0')}
                </div>
                <div className="text-sm md:text-base text-gray-600 uppercase tracking-wider mt-2">
                  {unit}
                </div>
              </div>
            ))}
          </div> */}

          {/* Email Subscription */}
          <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all text-gray-800 placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                Notify Me
              </button>
            </form>
            {message && (
              <p className="mt-4 text-green-600 font-medium animate-fade-in">
                {message}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="mt-16 text-gray-500 text-sm">
            <p>© 2025 Uno Travel. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}