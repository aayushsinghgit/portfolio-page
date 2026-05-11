import React from 'react';
import { motion } from 'framer-motion';
import texts from '../text/en.json';

const Footer = () => {
  return (
    <footer className="bg-transparent border-t border-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-2xl font-light tracking-wider">
              <span className="text-white">AS</span>
              <span className="text-gray-500">.</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-8">
            <p className="text-sm font-mono text-gray-500">
              {texts.footer.copyright}
            </p>
            
            <motion.div 
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-mono text-gray-500">AVAILABLE FOR WORK</span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;