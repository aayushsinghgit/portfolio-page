import React from 'react';
import { motion } from 'framer-motion';
import texts from '../text/en.json';
import { fadeInUp, staggerContainer } from '../utils/animations';

const Hero = () => {


  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <motion.div 
        className="relative z-10 text-left px-6 max-w-6xl mx-auto w-full"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.p 
              variants={fadeInUp}
              className="text-sm font-mono text-gray-500 mb-6 tracking-wider"
            >
              {texts.hero.greeting}
            </motion.p>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-7xl lg:text-9xl font-display font-light mb-8 leading-none tracking-tight"
            >
              <span className="text-white block text-balance">{texts.hero.name.split(' ')[0]}</span>
              <span className="text-gray-500 block text-balance">{texts.hero.name.split(' ')[1]}</span>
            </motion.h1>
            
            <motion.div 
              variants={fadeInUp}
              className="mb-10"
            >
              <h2 className="text-2xl lg:text-4xl font-sans font-extralight text-gray-300 mb-6 tracking-wide">
                {texts.hero.title}
              </h2>
              <div className="w-32 h-px bg-gradient-to-r from-white/40 to-transparent" />
            </motion.div>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-400 mb-16 max-w-xl font-light leading-relaxed text-pretty"
            >
              {texts.hero.subtitle}
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex items-center space-x-8"
            >
              <a 
                href="#portfolio" 
                className="group flex items-center space-x-3 text-white hover:text-gray-300 transition-colors duration-300"
              >
                <span className="text-sm font-mono">VIEW WORK</span>
                <div className="w-12 h-px bg-white group-hover:w-16 transition-all duration-300" />
              </a>
              
              <a 
                href="#contact" 
                className="text-sm font-mono text-gray-500 hover:text-white transition-colors duration-300"
              >
                GET IN TOUCH
              </a>
            </motion.div>
          </div>
          
          <motion.div 
            variants={fadeInUp}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-gray-200 shadow-2xl">
                <img 
                  src="/media/profile.jpg" 
                  alt="Ayush Singh"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              </div>
            </div>
          </motion.div>

        </div>
        
        <motion.div 
          variants={fadeInUp}
          className="absolute bottom-8 right-6 hidden lg:flex items-center space-x-4"
        >
          <span className="text-xs font-mono text-gray-500 rotate-90 whitespace-nowrap origin-center">
            SCROLL
          </span>
          <div className="w-px h-12 bg-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;