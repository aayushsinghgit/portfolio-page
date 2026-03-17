import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import texts from '../text/en.json';
import { fadeInUp, staggerContainer } from '../utils/animations';

const Contact = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com' },
    { name: 'Twitter', url: 'https://twitter.com' },
    { name: 'Email', url: 'mailto:singhaayu311@gmail.com' }
  ];

  return (
    <section id="contact" ref={ref} className="py-32 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          style={{ y }}
          className="mb-20"
        >
          <p className="text-sm font-mono text-gray-500 mb-6 tracking-wider uppercase">
            {texts.contact.title}
          </p>
          <h2 className="text-6xl lg:text-8xl font-display font-light text-white mb-10 leading-none tracking-tight">
            <span className="block text-balance">{texts.contact.headline.line1}</span>
            <span className="block text-gray-500 text-balance">{texts.contact.headline.line2}</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-white/30 to-transparent" />
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="p-8 space-y-8 rounded-lg">
              <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-sm font-mono text-gray-500 mb-3 uppercase tracking-wider">
                    {texts.contact.form.name}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-gray-800 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300"
                    required
                  />
                </div>
                
                <div className="group">
                  <label className="block text-sm font-mono text-gray-500 mb-3 uppercase tracking-wider">
                    {texts.contact.form.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-gray-800 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300"
                    required
                  />
                </div>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="group">
                <label className="block text-sm font-mono text-gray-500 mb-3 uppercase tracking-wider">
                  {texts.contact.form.message}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full bg-transparent border-b border-gray-800 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors duration-300 resize-none"
                  required
                />
              </motion.div>
              
              <motion.button 
                variants={fadeInUp}
                type="submit"
                disabled={isSubmitting}
                className="group flex items-center space-x-3 text-white hover:text-gray-300 transition-colors duration-300 mt-12 disabled:opacity-50 magnetic-button"
              >
                <span className="text-sm font-mono uppercase tracking-wider">
                  {isSubmitting ? 'SENDING...' : texts.contact.form.send.toUpperCase()}
                </span>
                <div className="w-12 h-px bg-white group-hover:w-16 transition-all duration-300" />
              </motion.button>
              
              {submitStatus === 'success' && (
                <p className="text-green-400 text-sm font-mono mt-4 uppercase">Message sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 text-sm font-mono mt-4 uppercase">Failed to send message. Please try again.</p>
              )}
            </form>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-12"
          >
            <motion.div variants={fadeInUp} className="p-6 rounded-lg">
              <h3 className="text-3xl font-display font-light text-white mb-8 tracking-tight uppercase">{texts.contact.sections.getInTouch}</h3>
              <p className="text-lg text-gray-400 font-light leading-relaxed mb-10 text-pretty">
                {texts.contact.description}
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-mono text-gray-500 mb-1 uppercase tracking-wider">EMAIL</p>
                  <p className="text-white">{texts.contact.info.email}</p>
                </div>
                <div>
                  <p className="text-sm font-mono text-gray-500 mb-1 uppercase tracking-wider">LOCATION</p>
                  <p className="text-white">{texts.contact.info.location}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="p-6 rounded-lg">
              <h4 className="text-xl font-display font-light text-white mb-8 tracking-tight uppercase">{texts.contact.sections.followMe}</h4>
              <div className="space-y-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-2 border-b border-gray-900 hover:border-gray-800 transition-colors duration-300"
                  >
                    <span className="text-sm font-mono text-gray-400 group-hover:text-white transition-colors duration-300 uppercase tracking-wider">
                      {link.name}
                    </span>
                    <div className="w-4 h-px bg-gray-600 group-hover:w-8 group-hover:bg-white transition-all duration-300" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;