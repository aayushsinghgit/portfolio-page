// src/pages/BlogPost.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft } from 'lucide-react';

const fadeIn = {
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
};

const BlogPost = () => {
  const { id } = useParams();
  const { texts } = useLanguage();
  const post = texts.blog.items[id];

  if (!post) {
    return (
      <div className="pt-40 text-center text-white">
        <h2 className="text-4xl mb-8">Article not found</h2>
        <Link to="/blog" className="text-blue-500 underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12">
          <Link to="/blog" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-mono uppercase tracking-widest">Back to all articles</span>
          </Link>
        </motion.div>

        <motion.header variants={fadeIn} initial="initial" animate="animate" className="mb-16">
          <div className="flex items-center gap-4 text-xs font-mono text-gray-500 uppercase tracking-widest mb-6">
            <span>{post.date}</span>
            <span className="w-8 h-px bg-gray-800" />
            <span>{post.author || 'Ayush Singh'}</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-display font-light text-gray-900 dark:text-white mb-8 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 font-light leading-relaxed italic">
            {post.description}
          </p>
        </motion.header>

        <motion.div 
          variants={fadeIn} 
          initial="initial" 
          animate="animate" 
          transition={{ delay: 0.2 }}
          className="prose prose-invert max-w-none dark:text-gray-300 text-gray-700 font-light leading-loose space-y-8 text-lg"
        >
          {post.content ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <div className="space-y-6">
              <p>
                In the rapidly evolving landscape of Artificial Intelligence, building reliable systems is more critical than ever. 
                Retrieval-Augmented Generation (RAG) has emerged as a powerhouse for grounding Large Language Models in proprietary data.
              </p>
              <h2 className="text-3xl text-white font-display font-light mt-12 mb-6">Why Architecture Matters</h2>
              <p>
                A standard RAG pipeline often fails in production due to noise in retrieval or hallucinations in synthesis. 
                Architecting for reliability means implementing hybrid search, cross-encoder re-ranking, and robust evaluation harnesses.
              </p>
              <div className="p-8 bg-gray-900/50 border border-gray-800 rounded-2xl my-12">
                <p className="italic text-gray-400">
                  "The goal isn't just to find information, but to find the *right* information and present it in a way that the model can use effectively."
                </p>
              </div>
              <p>
                As we move towards agentic workflows, the role of RAG becomes even more central. Agents need high-fidelity context to make informed decisions 
                and execute tools accurately.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPost;
