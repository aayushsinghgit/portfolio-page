// src/pages/BlogPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const fadeIn = {
  initial:    { opacity: 0, y: 40 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
};

const BlogPage = () => {
  const { texts } = useLanguage();
  const blog = texts.blog;

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div variants={fadeIn} initial="initial" animate="animate" className="mb-20">
          <p className="text-sm font-mono text-gray-500 mb-6 tracking-wider uppercase">{blog.subtitle}</p>
          <h1 className="text-6xl lg:text-8xl font-display font-light text-gray-900 dark:text-white mb-10 leading-none tracking-tight">
            {blog.title}
          </h1>
          <div className="w-24 h-px bg-gray-200 dark:bg-white/30" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {blog.items.map((post, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              initial="initial"
              animate="animate"
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Link to={`/blog/${i}`} className="block">
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
                    <span className="text-xs font-mono group-hover:mr-2 transition-all duration-300">READ ARTICLE</span>
                    <div className="w-8 h-px bg-gray-900 dark:bg-white group-hover:w-12 transition-all duration-300" />
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
