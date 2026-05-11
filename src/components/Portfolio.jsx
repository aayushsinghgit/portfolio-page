// src/components/Portfolio.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const fadeIn = {
  initial:    { opacity: 0, y: 40 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
};

// Screenshot component — local WebP → thum.io → styled error
const ProjectScreenshot = ({ url, title, image }) => {
  const [status, setStatus] = useState('loading');
  const thumSrc = `https://image.thum.io/get/width/800/crop/450/noanimate/${url}`;

  return (
    <div className="relative w-full h-80 bg-gray-100 dark:bg-gray-900 overflow-hidden">

      {/* Skeleton */}
      {status === 'loading' && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 animate-pulse">
          <div className="absolute bottom-6 left-6 space-y-2">
            <div className="w-32 h-3 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="w-20 h-2 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
        </div>
      )}

      {/* Styled error state */}
      {status === 'errored' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap gap-2 px-8 justify-center opacity-30">
            {['LangChain', 'RAG', 'Agents', 'LLM', 'FAISS'].map((t) => (
              <span key={t} className="text-xs font-mono text-gray-500 border border-gray-300 dark:border-gray-700 px-3 py-1 rounded">{t}</span>
            ))}
          </div>
          <span className="text-xs font-mono text-gray-400 dark:text-gray-600 uppercase tracking-widest">{title}</span>
          <a href={url} target="_blank" rel="noopener noreferrer"
            className="text-xs font-mono text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors border border-gray-300 dark:border-gray-700 px-3 py-1 rounded">
            VISIT SITE →
          </a>
        </div>
      )}

      {/* Primary: local WebP */}
      {image && status !== 'thum-fallback' && (
        <img src={image} alt={`Screenshot of ${title}`}
          className={`w-full h-full object-cover object-top transition-opacity duration-500 ${status === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('thum-fallback')}
        />
      )}

      {/* Fallback: thum.io */}
      {(!image || status === 'thum-fallback') && (
        <img src={thumSrc} alt={`Screenshot of ${title}`}
          className={`w-full h-full object-cover object-top transition-opacity duration-500 ${status === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('errored')}
        />
      )}
    </div>
  );
};

const Portfolio = () => {
  const { texts } = useLanguage();
  const [expandedId, setExpandedId] = useState(null);

  const toggleCaseStudy = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="portfolio" data-testid="portfolio-section" className="py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }} className="mb-20">
          <p className="text-sm font-mono text-gray-500 mb-6 tracking-wider">{texts.portfolio.title}</p>
          <h2 className="text-6xl lg:text-8xl font-display font-light text-gray-900 dark:text-white mb-10 leading-none tracking-tight text-balance">
            {texts.portfolio.headline}
          </h2>
          <div className="w-24 h-px bg-gray-200 dark:bg-white/30" />
        </motion.div>

        {/* Projects */}
        <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }} className="space-y-32">
          {texts.portfolio.projects.map((project, index) => (
            <motion.div key={index} variants={fadeIn} className="group">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>

                {/* Screenshot */}
                <div className={index % 2 === 1 ? 'lg:col-start-2 lg:sticky lg:top-32' : 'lg:sticky lg:top-32'}>
                  <motion.div className="relative overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-900 shadow-2xl shadow-black/10 dark:shadow-black/50"
                    whileHover={{ scale: 1.02 }} transition={{ duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}>
                    <ProjectScreenshot url={project.link} title={project.title} image={project.image} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div>
                    <p className="text-sm font-mono text-gray-500 mb-2">{texts.portfolio.projectLabel}</p>
                    <h3 className="text-4xl lg:text-5xl font-display font-light text-gray-900 dark:text-white mb-6 tracking-tight text-balance">{project.title}</h3>
                    <div className="w-16 h-px bg-gray-200 dark:bg-white/30 mb-6" />
                  </div>

                  <p className="text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed text-pretty">{project.description}</p>

                  {/* Impact metric */}
                  {project.metric && (
                    <div className="bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg p-4">
                      <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Impact Metric</p>
                      <p className="text-sm font-mono text-gray-700 dark:text-gray-300 leading-relaxed">
                        {project.metric}
                      </p>
                    </div>
                  )}

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech, i) => (
                      <motion.span key={i} whileHover={{ scale: 1.05, y: -1 }} transition={{ duration: 0.2 }}
                        className="text-xs font-mono text-gray-500 border border-gray-200 dark:border-gray-800 px-3 py-2 rounded hover:border-gray-400 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-gray-400 transition-colors cursor-default">
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Case Study Toggle */}
                  {project.caseStudy && (
                    <div className="pt-4">
                      <button
                        onClick={() => toggleCaseStudy(index)}
                        className="text-xs font-mono text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2 group/case"
                      >
                        <span className="w-4 h-px bg-gray-300 dark:bg-gray-700 group-hover/case:w-8 transition-all duration-300" />
                        {expandedId === index ? 'HIDE CASE STUDY' : 'VIEW CASE STUDY'}
                      </button>

                      <AnimatePresence>
                        {expandedId === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
                            className="overflow-hidden"
                          >
                            <div className="pt-8 space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                                <div className="space-y-2">
                                  <p className="text-[10px] font-mono text-gray-400 dark:text-gray-600 uppercase tracking-widest">Problem</p>
                                  <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">{project.caseStudy.problem}</p>
                                </div>
                                <div className="space-y-2">
                                  <p className="text-[10px] font-mono text-gray-400 dark:text-gray-600 uppercase tracking-widest">Solution</p>
                                  <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">{project.caseStudy.solution}</p>
                                </div>
                                <div className="space-y-2">
                                  <p className="text-[10px] font-mono text-gray-400 dark:text-gray-600 uppercase tracking-widest">Outcome</p>
                                  <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">{project.caseStudy.outcome}</p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex items-center space-x-8 pt-8 border-t border-gray-100 dark:border-gray-900">
                    <a href={project.link} target="_blank" rel="noopener noreferrer"
                      aria-label={`View live demo of ${project.title}`}
                      className="group/link flex items-center space-x-3 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300">
                      <span className="text-sm font-mono">{texts.portfolio.links.viewProject}</span>
                      <div className="w-8 h-px bg-gray-900 dark:bg-white group-hover/link:w-12 transition-all duration-300" />
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      aria-label={`View source code of ${project.title} on GitHub`}
                      className="text-sm font-mono text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
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
