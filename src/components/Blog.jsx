// src/components/Blog.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const fadeIn = {
  initial:    { opacity: 0, y: 40 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
};

const Blog = () => {
  const { texts } = useLanguage();
  const blog = texts.blog;

  return (
    <section id="blog" className="py-32 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div variants={fadeIn} initial="initial" whileInView="animate" viewport={{ once: true }} className="mb-20">
          <p className="text-sm font-mono text-gray-500 mb-6 tracking-wider uppercase">{blog.subtitle}</p>
          <h2 className="text-6xl lg:text-7xl font-display font-light text-gray-900 dark:text-white mb-10 leading-none tracking-tight">
            {blog.title}
          </h2>
          <div className="w-24 h-px bg-gray-200 dark:bg-white/30" />
        </motion.div>

        {/* Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {blog.items.map((post, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group block"
            >
              <Link to={`/blog/${i}`}>
                <article className="space-y-6">
                  <div className="flex items-center gap-4 text-[10px] font-mono text-gray-400 dark:text-gray-600 uppercase tracking-widest">
                    <span>{post.date}</span>
                    <span className="w-4 h-px bg-gray-200 dark:bg-gray-800" />
                    <span>Technical Article</span>
                  </div>
                  
                  <h3 className="text-3xl font-display font-light text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors duration-300 leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed text-pretty">
                    {post.description}
                  </p>
                  
                  <div className="pt-4 flex items-center gap-3 text-gray-900 dark:text-white">
                    <span className="text-xs font-mono group-hover:mr-2 transition-all duration-300">READ MORE</span>
                    <div className="w-8 h-px bg-gray-900 dark:bg-white group-hover:w-12 transition-all duration-300" />
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
