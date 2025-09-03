import React from 'react';
import { motion } from 'framer-motion';
import texts from '../text/en.json';
import { fadeInUp } from '../utils/animations';

const About = () => {


  return (
    <section id="about" className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <p className="text-sm font-mono text-gray-500 mb-6 tracking-wider">
              {texts.about.title}
            </p>
            
            <h2 className="text-6xl lg:text-8xl font-display font-light mb-10 leading-none tracking-tight">
              <span className="block text-white text-balance">{texts.about.headline.line1}</span>
              <span className="block text-gray-500 text-balance">{texts.about.headline.line2}</span>
              <span className="block text-white text-balance">{texts.about.headline.line3}</span>
            </h2>
            
            <div className="w-24 h-px bg-white/30 mb-8" />
          </motion.div>
          
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-xl text-gray-300 font-light leading-relaxed text-pretty max-w-2xl">
              {texts.about.description}
            </p>
            
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <h3 className="text-4xl font-display font-light text-white mb-3 tracking-tight">{texts.about.stats.experience.number}</h3>
                <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">{texts.about.stats.experience.label}</p>
              </div>
              <div>
                <h3 className="text-4xl font-display font-light text-white mb-3 tracking-tight">{texts.about.stats.projects.number}</h3>
                <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">{texts.about.stats.projects.label}</p>
              </div>
            </div>
            
            <div className="pt-8">
              <a 
                href="#contact" 
                className="group inline-flex items-center space-x-3 text-white hover:text-gray-300 transition-colors duration-300"
              >
                <span className="text-sm font-mono">{texts.about.cta}</span>
                <div className="w-8 h-px bg-white group-hover:w-12 transition-all duration-300" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;