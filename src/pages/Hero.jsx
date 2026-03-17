import React from 'react';
import { motion } from 'framer-motion';
import texts from '../text/en.json';
import { fadeInUp, staggerContainer } from '../utils/animations';

const Hero = () => {


  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative bg-transparent overflow-hidden pt-20">

      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div
          variants={fadeInUp}
          className="inline-block px-4 py-2 border border-gray-800 rounded-full mb-8"
        >
          <span className="text-sm text-gray-400">👋 {texts.hero.greeting}</span>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="text-6xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="text-white">I'm </span>
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{texts.hero.name}</span>
        </motion.h1>

        <motion.h2
          variants={fadeInUp}
          className="text-2xl lg:text-4xl font-light text-gray-400 mb-8"
        >
          {texts.hero.title}
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          {texts.hero.subtitle}
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="flex items-center justify-center gap-6 mb-16"
        >
          <a
            href="#portfolio"
            aria-label="View my portfolio projects"
            className="group inline-flex items-center space-x-3 text-white hover:text-gray-300 transition-colors duration-300"
          >
            <span className="text-sm font-mono">VIEW WORK</span>
            <div className="w-8 h-px bg-white group-hover:w-12 transition-all duration-300" />
          </a>

          <a
            href="#contact"
            aria-label="Navigate to contact section"
            className="group inline-flex items-center space-x-3 text-white hover:text-gray-300 transition-colors duration-300"
          >
            <span className="text-sm font-mono">GET IN TOUCH</span>
            <div className="w-8 h-px bg-white group-hover:w-12 transition-all duration-300" />
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download my resume"
            className="group inline-flex items-center space-x-3 text-white hover:text-gray-300 transition-colors duration-300"
          >
            <span className="text-sm font-mono">{texts.hero.downloadResume.toUpperCase()}</span>
            <div className="w-8 h-px bg-white group-hover:w-12 transition-all duration-300" />
          </a>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="flex items-center justify-center gap-8 text-sm text-gray-500"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Available for work</span>
          </div>
          <span>•</span>
          <span>Based in New Delhi, IN</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;