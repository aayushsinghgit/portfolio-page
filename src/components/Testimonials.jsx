// src/components/Testimonials.jsx
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const fadeIn = {
  initial:    { opacity: 0, y: 40 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
};

const Testimonials = () => {
  const { texts } = useLanguage();
  const testimonials = texts.testimonials;

  return (
    <section id="testimonials" className="py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }} className="mb-20 text-center">
          <p className="text-sm font-mono text-gray-500 mb-6 tracking-wider uppercase">{testimonials.subtitle}</p>
          <h2 className="text-6xl lg:text-7xl font-display font-light text-gray-900 dark:text-white mb-10 leading-none tracking-tight">
            {testimonials.title}
          </h2>
          <div className="w-24 h-px bg-gray-200 dark:bg-white/30 mx-auto" />
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.items.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 border border-gray-100 dark:border-gray-900 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-sm relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-500">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H12.017V21H14.017ZM6.017 21L6.017 18C6.017 16.8954 6.91243 16 8.017 16H11.017C11.5693 16 12.017 15.5523 12.017 15V9C12.017 8.44772 11.5693 8 11.017 8H8.017C7.46472 8 7.017 8.44772 7.017 9V12C7.017 12.5523 6.56929 13 6.017 13H4.017V21H6.017Z" />
                </svg>
              </div>
              
              <blockquote className="relative">
                <p className="text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed mb-8 italic">
                  "{item.quote}"
                </p>
                <footer className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-gray-200 dark:border-gray-800">
                    <span className="text-xs font-mono text-gray-400">{item.author[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.author}</p>
                    <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">{item.company}</p>
                  </div>
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="ml-auto text-gray-400 hover:text-blue-500 transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                  )}
                </footer>
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
