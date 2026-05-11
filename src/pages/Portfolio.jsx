// src/pages/Portfolio.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { fadeIn, staggerContainer } from '../utils/animations';

// ─── Screenshot component ────────────────────────────────────────────────────
const ProjectScreenshot = ({ url, title, image }) => {
  const [status, setStatus] = useState('loading');

  // Priority: local WebP → thum.io fallback
  const primarySrc = image || null;
  const thumSrc    = `https://image.thum.io/get/width/800/crop/450/noanimate/${url}`;

  const handlePrimaryError = () => {
    // If the local image fails, try thum.io
    if (primarySrc) {
      setStatus('thum-fallback');
    } else {
      setStatus('errored');
    }
  };

  return (
    <div className="relative w-full h-80 bg-gray-900 overflow-hidden rounded-lg">

      {/* Loading skeleton */}
      {status === 'loading' && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 animate-pulse">
          <div className="absolute bottom-6 left-6 space-y-2">
            <div className="w-32 h-3 bg-gray-700 rounded" />
            <div className="w-20 h-2 bg-gray-800 rounded" />
          </div>
        </div>
      )}

      {/* Styled error state — not just an icon */}
      {status === 'errored' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gray-900 border border-gray-800">
          <div className="flex flex-wrap gap-2 px-8 justify-center opacity-30">
            {['LangChain', 'RAG', 'Agents', 'LLM', 'FAISS'].map((t) => (
              <span
                key={t}
                className="text-xs font-mono text-gray-400 border border-gray-700 px-3 py-1 rounded"
              >
                {t}
              </span>
            ))}
          </div>
          <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">
            {title}
          </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-gray-500 hover:text-white transition-colors border border-gray-700 px-3 py-1 rounded"
          >
            VISIT SITE →
          </a>
        </div>
      )}

      {/* Primary image (local WebP) */}
      {primarySrc && status !== 'thum-fallback' && (
        <img
          src={primarySrc}
          alt={`Screenshot of ${title}`}
          className={`w-full h-full object-cover object-top transition-opacity duration-500 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setStatus('loaded')}
          onError={handlePrimaryError}
        />
      )}

      {/* Fallback image (thum.io) */}
      {(!primarySrc || status === 'thum-fallback') && (
        <img
          src={thumSrc}
          alt={`Screenshot of ${title}`}
          className={`w-full h-full object-cover object-top transition-opacity duration-500 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('errored')}
        />
      )}
    </div>
  );
};

// ─── Portfolio section ───────────────────────────────────────────────────────
const Portfolio = () => {
  const { texts } = useLanguage();

  return (
    <section
      id="portfolio"
      data-testid="portfolio-section"
      className="py-32 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          variants={fadeIn}
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

        {/* Projects */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-32"
        >
          {texts.portfolio.projects.map((project, index) => (
            <motion.div key={index} variants={fadeIn} className="group">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Screenshot */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <motion.div
                    className="relative overflow-hidden rounded-lg bg-gray-900"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
                  >
                    <ProjectScreenshot
                      url={project.link}
                      title={project.title}
                      image={project.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                </div>

                {/* Content */}
                <div
                  className={`space-y-6 ${
                    index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''
                  }`}
                >
                  {/* Title */}
                  <div>
                    <p className="text-sm font-mono text-gray-500 mb-2">
                      {texts.portfolio.projectLabel}
                    </p>
                    <h3 className="text-4xl lg:text-5xl font-display font-light text-white mb-6 tracking-tight text-balance">
                      {project.title}
                    </h3>
                    <div className="w-16 h-px bg-white/30 mb-6" />
                  </div>

                  {/* Description */}
                  <p className="text-xl text-gray-300 font-light leading-relaxed text-pretty">
                    {project.description}
                  </p>

                  {/* Impact metric */}
                  {project.metric && (
                    <p className="text-xs font-mono text-gray-500 border-l-2 border-gray-700 pl-4 py-1 leading-relaxed">
                      {project.metric}
                    </p>
                  )}

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.1, y: -2 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs font-mono text-gray-500 border border-gray-800 px-3 py-2 rounded hover:border-gray-700 hover:text-gray-400 transition-colors cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center space-x-8 pt-4">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View live demo of ${project.title}`}
                      className="group/link flex items-center space-x-3 text-white hover:text-gray-300 transition-colors duration-300"
                    >
                      <span className="text-sm font-mono">
                        {texts.portfolio.links.viewProject}
                      </span>
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