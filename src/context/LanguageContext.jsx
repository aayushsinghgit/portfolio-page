import React, { createContext, useContext, useState } from 'react';
import enTexts from '../text/en.json';
import hiTexts from '../text/hi.json';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  
  const texts = language === 'en' ? enTexts : hiTexts;
  
  const toggleLanguage = () => {
    console.log('Toggling language from:', language);
    setLanguage(prev => {
      const newLang = prev === 'en' ? 'hi' : 'en';
      console.log('New language:', newLang);
      return newLang;
    });
  };

  return (
    <LanguageContext.Provider value={{ language, texts, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};