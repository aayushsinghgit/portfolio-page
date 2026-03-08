import React from 'react';
import { motion } from 'framer-motion';
import texts from '../text/en.json';
import { fadeInUp, staggerContainer } from '../utils/animations';

const Certifications = () => {
  return (
    <section id="certifications" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <p className="text-sm font-mono text-gray-500 mb-6 tracking-wider">
              {texts.certifications.subtitle}
            </p>
            <h2 className="text-5xl lg:text-6xl font-light text-white mb-8 leading-tight">
              {texts.certifications.headline.line1}
              <br />
              <span className="text-gray-600">{texts.certifications.headline.line2}</span>
            </h2>
            <div className="w-24 h-px bg-white/30 mb-8" />
            <p className="text-lg text-gray-400 font-light leading-relaxed">
              {texts.certifications.description}
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {texts.certifications.items.map((cert, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }}
                className="group border-b border-gray-900 pb-8 last:border-b-0 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-light text-white group-hover:text-gray-300 transition-colors duration-300">
                      {cert.title}
                    </h3>
                  </div>
                  <div className="w-4 h-px bg-gray-600 group-hover:w-8 group-hover:bg-white transition-all duration-300" />
                </div>
                <p className="text-gray-400 font-mono text-sm">{cert.issuer}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;