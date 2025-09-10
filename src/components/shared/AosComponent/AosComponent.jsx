"use client";
import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function AosAnimation() {
    useEffect(() => {
    AOS.init({
      duration: 800,      // animation duration
      once: true,         // whether animation should happen only once
      offset: 120,        // offset (in px) from the original trigger point
    });
  }, []);

}
