import React from 'react';
import { motion } from 'framer-motion';
import texts from '../text/en.json';
import { fadeInUp, staggerContainer } from '../utils/animations';

const Skills = () => {


  const skillCategories = [
    {
      key: 'mern',
      skills: [
        { name: 'React', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg' },
        { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/nodedotjs.svg' },
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/mongodb.svg' },
        { name: 'Express', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/express.svg' }
      ]
    },
    {
      key: 'blockchain',
      skills: [
        { name: 'Ethereum', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/ethereum.svg' },
        { name: 'Solidity', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/solidity.svg' },
        { name: 'Web3.js', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/web3dotjs.svg' }
      ]
    },
    {
      key: 'ai',
      skills: [
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/python.svg' },
        { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tensorflow.svg' },
        { name: 'OpenAI', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/openai.svg' }
      ]
    },
    {
      key: 'automation',
      skills: [
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/docker.svg' },
        { name: 'Selenium', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/selenium.svg' },
        { name: 'Jenkins', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/jenkins.svg' },
        { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/kubernetes.svg' },
        { name: 'GitHub Actions', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/githubactions.svg' },
        { name: 'Terraform', icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/terraform.svg' }
      ]
    }
  ];

  return (
    <section id="skills" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <p className="text-sm font-mono text-gray-500 mb-6 tracking-wider">
              {texts.skills.title}
            </p>
            <h2 className="text-5xl lg:text-6xl font-light text-white mb-8 leading-tight">
              {texts.skills.headline.line1}
              <br />
              <span className="text-gray-600">{texts.skills.headline.line2}</span>
            </h2>
            <div className="w-24 h-px bg-white/30 mb-8" />
            <p className="text-lg text-gray-400 font-light leading-relaxed">
              {texts.skills.description}
            </p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-12"
          >
            {skillCategories.map((category, categoryIndex) => (
              <motion.div 
                key={category.key}
                variants={fadeInUp}
                className="group"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-light text-white">
                    {texts.skills.categories[category.key]}
                  </h3>
                  <div className="w-4 h-px bg-gray-600 group-hover:w-8 group-hover:bg-white transition-all duration-300" />
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.skills.map((skill, index) => (
                    <motion.div 
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: (categoryIndex * 0.1) + (index * 0.05) }}
                      className="group/skill flex items-center space-x-3 p-3 border border-gray-900 hover:border-gray-800 transition-colors duration-300"
                    >
                      <div className="w-6 h-6 opacity-60 group-hover/skill:opacity-100 transition-opacity duration-300">
                        <img 
                          src={skill.icon} 
                          alt={skill.name}
                          className="w-full h-full object-contain filter brightness-0 invert"
                        />
                      </div>
                      <span className="text-sm font-mono text-gray-400 group-hover/skill:text-white transition-colors duration-300">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;