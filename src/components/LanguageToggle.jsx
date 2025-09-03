import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="group flex items-center space-x-2 px-4 py-2 border border-gray-300 hover:border-gray-600 transition-colors duration-300"
    >
      <span className="text-sm font-mono text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
        {language === 'en' ? 'EN' : 'हि'}
      </span>
      <div className="w-2 h-2 border border-gray-400 group-hover:border-gray-900 transition-colors duration-300" />
    </button>
  );
};

export default LanguageToggle;