import React from 'react';
import { motion } from 'framer-motion';
import texts from '../text/en.json';
import { fadeInUp, staggerContainer } from '../utils/animations';

const Certifications = () => {
  return (
    <section id="certifications" className="py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-sm font-mono text-gray-500 mb-6 tracking-wider">
            {texts.certifications.subtitle}
          </p>
          <h2 className="text-5xl lg:text-7xl font-light text-white mb-8 leading-tight">
            {texts.certifications.headline.line1}
            <br />
            <span className="text-gray-600">{texts.certifications.headline.line2}</span>
          </h2>
          <div className="w-24 h-px bg-white/30 mb-8" />
          <p className="text-lg text-gray-400 font-light leading-relaxed max-w-2xl">
            {texts.certifications.description}
          </p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {texts.certifications.items.map((cert, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="group p-8 border border-gray-800 rounded-2xl hover:border-gray-600 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center p-2 group-hover:border-gray-600 transition-colors">
                    <img 
                      src={cert.logo} 
                      alt={cert.issuer}
                      className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-white group-hover:text-blue-400 transition-colors duration-300">
                      {cert.title}
                    </h3>
                    <p className="text-gray-500 text-sm font-mono mt-1">{cert.issuer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest bg-gray-900 px-2 py-1 rounded-md border border-gray-800">
                    {cert.date}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-gray-500">
                  <span>CREDENTIAL ID</span>
                  <span className="text-gray-400">{cert.id}</span>
                </div>
                
                <div className="pt-4 flex items-center justify-between border-t border-gray-900">
                  <a 
                    href={cert.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Verify my ${cert.title} certification`}
                    className="group/link flex items-center space-x-3 text-white hover:text-gray-300 transition-colors duration-300"
                  >
                    <span className="text-xs font-mono uppercase tracking-widest">Verify Credential</span>
                    <div className="w-6 h-px bg-white group-hover/link:w-10 transition-all duration-300" />
                  </a>
                  
                  <svg 
                    className="w-4 h-4 text-gray-700 group-hover:text-blue-500 transition-colors duration-300 transform group-hover:rotate-45" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;