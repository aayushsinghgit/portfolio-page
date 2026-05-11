import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const BottomNav = () => {
  const { texts } = useLanguage();
  const location = useLocation();

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'about', href: '/#about' },
    { key: 'skills', href: '/#skills' },
    { key: 'portfolio', href: '/#portfolio' },
    { key: 'blog', href: '/blog' },
    { key: 'contact', href: '/#contact' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 md:hidden z-50">
      <div className="flex justify-around items-center py-4 px-2">
        {navItems.map((item) => (
          item.href.includes('#') ? (
            <a
              key={item.key}
              href={item.href}
              className="flex flex-col items-center py-2 px-3 text-gray-500 hover:text-white transition-colors duration-300 group"
            >
              <span className="text-[10px] font-mono">{texts.nav[item.key]}</span>
              <div className="w-0 h-px bg-white mt-1 group-hover:w-full transition-all duration-300" />
            </a>
          ) : (
            <Link
              key={item.key}
              to={item.href}
              className={`flex flex-col items-center py-2 px-3 transition-colors duration-300 group ${location.pathname === item.href ? 'text-white' : 'text-gray-500 hover:text-white'}`}
            >
              <span className="text-[10px] font-mono">{texts.nav[item.key]}</span>
              <div className={`h-px bg-white mt-1 transition-all duration-300 ${location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
          )
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;