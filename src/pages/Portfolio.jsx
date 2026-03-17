import React from 'react';
import { motion } from 'framer-motion';
import texts from '../text/en.json';
import { fadeInUp, staggerContainer } from '../utils/animations';

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-sm font-mono text-gray-500 mb-6 tracking-wider">
            {texts.portfolio.title}
          </p>
          <h2 className="text-6xl lg:text-8xl font-display font-light text-white mb-10 leading-none tracking-tight text-balance">
            {texts.portfolio.headline}
          </h2>
          <div className="w-24 h-px bg-white/30" />
        </motion.div>
        
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-32"
        >
          {texts.portfolio.projects.map((project, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              className="group"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <motion.div 
                    className="relative overflow-hidden rounded-lg bg-gray-900"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
                  >
                    <img 
                      src={project.image}
                      alt={`Screenshot of ${project.title} project`}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                </div>
                
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div>
                    <p className="text-sm font-mono text-gray-500 mb-2">
                      {texts.portfolio.projectLabel}
                    </p>
                    <h3 className="text-4xl lg:text-5xl font-display font-light text-white mb-6 tracking-tight text-balance">
                      {project.title}
                    </h3>
                    <div className="w-16 h-px bg-white/30 mb-6" />
                  </div>
                  
                  <p className="text-xl text-gray-300 font-light leading-relaxed text-pretty">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech, techIndex) => (
                      <motion.span 
                        key={techIndex}
                        whileHover={{ scale: 1.1, y: -2 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs font-mono text-gray-500 border border-gray-800 px-3 py-2 rounded hover:border-gray-700 hover:text-gray-400 transition-colors cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-8 pt-4">
                    <a 
                      href={project.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View live demo of ${project.title}`}
                      className="group/link flex items-center space-x-3 text-white hover:text-gray-300 transition-colors duration-300"
                    >
                      <span className="text-sm font-mono">{texts.portfolio.links.viewProject}</span>
                      <div className="w-8 h-px bg-white group-hover/link:w-12 transition-all duration-300" />
                    </a>
                    
                    <a 
                      href={project.github} 
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View source code of ${project.title} on GitHub`}
                      className="text-sm font-mono text-gray-500 hover:text-white transition-colors duration-300"
                    >
                      {texts.portfolio.links.github}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;