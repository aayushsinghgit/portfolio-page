import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { texts } = useLanguage();
  const location = useLocation();

  const navItems = [
    { key: 'home', href: '/', isInternal: true },
    { key: 'about', href: '/#about' },
    { key: 'experience', href: '/#experience' },
    { key: 'skills', href: '/#skills' },
    { key: 'portfolio', href: '/#portfolio' },
    { key: 'blog', href: '/blog', isInternal: true },
    { key: 'contact', href: '/#contact' }
  ];

  const handleScroll = (e, href) => {
    if (href.startsWith('/#')) {
      if (location.pathname === '/') {
        e.preventDefault();
        const id = href.replace('/#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <nav className="fixed w-full z-50 py-6 bg-white/10 dark:bg-black/10 backdrop-blur-md border-b border-gray-200/20 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-display font-medium tracking-tight">
            <span className="text-gray-900 dark:text-white">AS</span>
            <span className="text-gray-400 dark:text-gray-500">.</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.isInternal && !item.href.includes('#') ? (
                <Link
                  key={item.key}
                  to={item.href}
                  className="relative text-xs font-mono text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 group uppercase tracking-widest"
                >
                  <span className="relative z-10">
                    {texts.nav[item.key]}
                  </span>
                  <div className={`absolute -bottom-1 left-0 h-px bg-gray-900 dark:bg-white transition-all duration-300 ${location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              ) : (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="relative text-xs font-mono text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 group uppercase tracking-widest"
                >
                  <span className="relative z-10">
                    {texts.nav[item.key]}
                  </span>
                  <div className="absolute -bottom-1 left-0 w-0 h-px bg-gray-900 dark:bg-white group-hover:w-full transition-all duration-300" />
                </a>
              )
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;