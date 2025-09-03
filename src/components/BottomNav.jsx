import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const BottomNav = () => {
  const { texts } = useLanguage();

  const navItems = [
    { key: 'home', href: '#hero' },
    { key: 'about', href: '#about' },
    { key: 'skills', href: '#skills' },
    { key: 'portfolio', href: '#portfolio' },
    { key: 'contact', href: '#contact' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 md:hidden z-50">
      <div className="flex justify-around items-center py-4">
        {navItems.map((item, index) => (
          <a
            key={item.key}
            href={item.href}
            className="flex flex-col items-center py-2 px-3 text-gray-500 hover:text-white transition-colors duration-300 group"
          >

            <span className="text-xs font-mono">{texts.nav[item.key]}</span>
            <div className="w-0 h-px bg-white mt-1 group-hover:w-full transition-all duration-300" />
          </a>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;