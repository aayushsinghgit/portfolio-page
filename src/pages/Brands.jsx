import React from 'react';
import { motion } from 'framer-motion';
import texts from '../text/en.json';
import { fadeInUp } from '../utils/animations';

const Brands = () => {
  const brands = [
    { name: 'Infosys Limited', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/infosys.svg' },
    { name: 'Appen', logo: '/media/companies/Appen.svg' },
    { name: 'Soulhq.io', logo: '/media/companies/soul.svg' },
    { name: 'Turing', logo: '/media/companies/turing.svg' },
    { name: 'Braintrust', logo: '/media/companies/braintrust.svg' }
  ];

  return (
    <section id="brands" className="py-20 bg-transparent border-y border-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-gray-500 mb-4 tracking-wider">
            {texts.brands.subtitle}
          </p>
        </motion.div>
        
        <div className="overflow-hidden">
          <motion.div 
            className="flex space-x-16 items-center"
            animate={{ x: [0, -1200] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <div key={index} className="flex-shrink-0 group">
                <div className="w-20 h-20 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                  <img 
                    src={brand.logo} 
                    alt={brand.name}
                    className="w-full h-full object-contain filter brightness-0 invert"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Brands;