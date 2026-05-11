import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="group flex items-center space-x-2 px-3 py-2 border border-gray-200 dark:border-gray-800 hover:border-gray-900 dark:hover:border-white transition-all duration-300 rounded-md"
      aria-label="Toggle Language"
    >
      <span className="text-xs font-mono text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 uppercase tracking-widest">
        {language === 'en' ? 'EN' : 'हि'}
      </span>
    </button>
  );
};

export default LanguageToggle;