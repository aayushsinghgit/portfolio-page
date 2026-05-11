// src/components/Experience.jsx
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const fadeIn = {
  initial:    { opacity: 0, y: 40 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
};
const itemFade = {
  initial:    { opacity: 0, x: -20 },
  animate:    { opacity: 1, x: 0 },
  transition: { duration: 0.4 },
};

const Experience = () => {
  const { texts } = useLanguage();
  const experience = texts.experience;

  return (
    <section id="experience" className="py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }} className="mb-20">
          <p className="text-sm font-mono text-gray-500 mb-6 tracking-wider uppercase">{experience.subtitle}</p>
          <h2 className="text-6xl lg:text-8xl font-display font-light text-gray-900 dark:text-white mb-10 leading-none tracking-tight">
            {experience.title}
          </h2>
          <div className="w-24 h-px bg-gray-200 dark:bg-white/30" />
        </motion.div>

        {/* Roles */}
        <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }} className="space-y-20">
          {experience.roles.map((role, i) => (
            <motion.div key={i} variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

              {/* Left — meta */}
              <div className="lg:col-span-3">
                <div className="lg:sticky lg:top-32">
                  <span className="text-xs font-mono text-green-600 dark:text-green-500 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/40 px-2 py-0.5 rounded mb-3 inline-block">
                    {role.badge}
                  </span>
                  <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-1">{role.company}</h3>
                  <p className="text-xs font-mono text-gray-500 dark:text-gray-600 uppercase tracking-widest mb-1">{role.period}</p>
                  <p className="text-sm text-gray-500">{role.location}</p>
                </div>
              </div>

              {/* Right — details */}
              <div className="lg:col-span-9">
                <p className="text-sm font-mono text-gray-600 dark:text-gray-400 mb-8 pb-4 border-b border-gray-100 dark:border-gray-900">{role.title}</p>

                <motion.ul variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }} className="space-y-5 mb-10">
                  {role.highlights.map((h, j) => (
                    <motion.li key={j} variants={itemFade} className="flex gap-4 leading-relaxed">
                      <span className="text-gray-400 dark:text-gray-700 mt-1.5 shrink-0 text-xs">◆</span>
                      <span className="text-gray-700 dark:text-gray-300 font-light">
                        <span className="text-gray-900 dark:text-gray-100 font-normal">{h.label} — </span>{h.text}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-gray-900">
                  {role.tech.map((t) => (
                    <motion.span key={t} whileHover={{ scale: 1.05, y: -1 }} transition={{ duration: 0.15 }}
                      className="text-xs font-mono text-gray-500 border border-gray-200 dark:border-gray-800 px-3 py-1.5 rounded hover:border-gray-400 dark:hover:border-gray-700 hover:text-gray-700 dark:hover:text-gray-400 transition-colors cursor-default">
                      {t}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
