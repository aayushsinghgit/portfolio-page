import React, { useState } from 'react';
import { motion } from 'framer-motion';
import texts from '../text/en.json';
import { fadeInUp, staggerContainer } from '../utils/animations';

const Contact = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com' },
    { name: 'Twitter', url: 'https://twitter.com' },
    { name: 'Email', url: 'mailto:singhaayu311@gmail.com' }
  ];

  return (
    <section id="contact" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-sm font-mono text-gray-500 mb-6 tracking-wider">
            {texts.contact.title}
          </p>
          <h2 className="text-6xl lg:text-8xl font-display font-light text-white mb-10 leading-none tracking-tight">
            <span className="block text-balance">{texts.contact.headline.line1}</span>
            <span className="block text-gray-500 text-balance">{texts.contact.headline.line2}</span>
          </h2>
          <div className="w-24 h-px bg-white/30" />
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-sm font-mono text-gray-500 mb-3">
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
                  <label className="block text-sm font-mono text-gray-500 mb-3">
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
                <label className="block text-sm font-mono text-gray-500 mb-3">
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
                className="group flex items-center space-x-3 text-white hover:text-gray-300 transition-colors duration-300 mt-12"
              >
                <span className="text-sm font-mono">{texts.contact.form.send.toUpperCase()}</span>
                <div className="w-12 h-px bg-white group-hover:w-16 transition-all duration-300" />
              </motion.button>
            </form>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-12"
          >
            <motion.div variants={fadeInUp}>
              <h3 className="text-3xl font-display font-light text-white mb-8 tracking-tight">{texts.contact.sections.getInTouch}</h3>
              <p className="text-lg text-gray-400 font-light leading-relaxed mb-10 text-pretty">
                {texts.contact.description}
              </p>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-mono text-gray-500 mb-1">EMAIL</p>
                  <p className="text-white">{texts.contact.info.email}</p>
                </div>
                <div>
                  <p className="text-sm font-mono text-gray-500 mb-1">LOCATION</p>
                  <p className="text-white">{texts.contact.info.location}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <h4 className="text-xl font-display font-light text-white mb-8 tracking-tight">{texts.contact.sections.followMe}</h4>
              <div className="space-y-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-2 border-b border-gray-900 hover:border-gray-800 transition-colors duration-300"
                  >
                    <span className="text-sm font-mono text-gray-400 group-hover:text-white transition-colors duration-300">
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