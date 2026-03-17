import React from 'react';
import texts from '../text/en.json';

const Navbar = () => {
  const navItems = [
    { key: 'home', href: '#hero' },
    { key: 'about', href: '#about' },
    { key: 'skills', href: '#skills' },
    { key: 'portfolio', href: '#portfolio' },
    { key: 'contact', href: '#contact' }
  ];

  return (
    <nav className="w-full z-50 py-6 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-light tracking-wider">
            <span className="text-white">AS</span>
            <span className="text-gray-500">.</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                aria-label={`Navigate to ${item.key}`}
                className="relative text-sm font-light text-gray-400 hover:text-white transition-all duration-300 group uppercase tracking-wider"
              >
                <span className="relative z-10">
                  {texts.nav[item.key]}
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;