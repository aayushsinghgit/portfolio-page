// src/components/About.jsx
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const fadeIn = {
  initial:    { opacity: 0, y: 40 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
};

const About = () => {
  const { texts } = useLanguage();

  return (
    <section id="about" className="py-32 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — headline */}
          <motion.div variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }}>
            <p className="text-sm font-mono text-gray-500 mb-6 tracking-wider">{texts.about.title}</p>
            <h2 className="text-6xl lg:text-8xl font-display font-light mb-10 leading-none tracking-tight">
              <span className="block text-gray-900 dark:text-white text-balance">{texts.about.headline.line1}</span>
              <span className="block text-gray-400 text-balance">{texts.about.headline.line2}</span>
              <span className="block text-gray-900 dark:text-white text-balance">{texts.about.headline.line3}</span>
            </h2>
            <div className="w-24 h-px bg-gray-200 dark:bg-white/30 mb-8" />
          </motion.div>

          {/* Right — content */}
          <motion.div variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }} className="space-y-6">
            <p className="text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed text-pretty max-w-2xl">
              {texts.about.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <h3 className="text-4xl font-display font-light text-gray-900 dark:text-white mb-3 tracking-tight">
                  {texts.about.stats.experience.number}
                </h3>
                <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">
                  {texts.about.stats.experience.label}
                </p>
              </div>
              <div>
                <h3 className="text-4xl font-display font-light text-gray-900 dark:text-white mb-3 tracking-tight">
                  {texts.about.stats.deployments.number}
                </h3>
                <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">
                  {texts.about.stats.deployments.label}
                </p>
              </div>
            </div>

            {/* Impact callout */}
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-5">
              <p className="text-xs font-mono text-gray-400 dark:text-gray-600 mb-2 uppercase tracking-widest">Key outcome</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                ~30% hallucination reduction across 5+ production LLM deployments at Infosys —
                serving financial and enterprise clients on Azure &amp; AWS.
              </p>
            </div>

            {/* CTA */}
            <div className="pt-8">
              <a href="#contact" aria-label="Get in touch" className="group inline-flex items-center space-x-3 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300">
                <span className="text-sm font-mono">{texts.about.cta}</span>
                <div className="w-8 h-px bg-gray-900 dark:bg-white group-hover:w-12 transition-all duration-300" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
