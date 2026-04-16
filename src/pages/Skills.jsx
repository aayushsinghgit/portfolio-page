import React from 'react';
import { motion } from 'framer-motion';
import texts from '../text/en.json';
import { fadeInUp, staggerContainer } from '../utils/animations';

const Skills = () => {
  const skillCategories = [
    {
      key: 'ml_deep_learning',
      skills: [
        { name: 'PyTorch', icon: 'https://cdn.simpleicons.org/pytorch' },
        { name: 'Transformers', icon: 'https://cdn.simpleicons.org/huggingface' },
        { name: 'LoRA/PEFT', icon: 'https://cdn.simpleicons.org/pytorch' },
        { name: 'Zephyr-7B', icon: 'https://cdn.simpleicons.org/huggingface' },
        { name: 'Prompt Engineering', icon: 'https://cdn.simpleicons.org/probot' }
      ]
    },
    {
      key: 'llm_genai',
      skills: [
        { name: 'OpenAI GPT-4/3.5', icon: 'https://cdn.simpleicons.org/openai' },
        { name: 'Azure OpenAI', icon: 'https://cdn.simpleicons.org/microsoftazure' },
        { name: 'Azure AI Foundry', icon: 'https://cdn.simpleicons.org/microsoftazure' },
        { name: 'Semantic Kernel', icon: 'https://cdn.simpleicons.org/microsoft' }
      ]
    },
    {
      key: 'agentic_frameworks',
      skills: [
        { name: 'LangChain', icon: 'https://cdn.simpleicons.org/langchain' },
        { name: 'LangGraph', icon: 'https://cdn.simpleicons.org/langchain' },
        { name: 'CrewAI', icon: 'https://cdn.simpleicons.org/groupme' },
        { name: 'AutoGen', icon: 'https://cdn.simpleicons.org/microsoft' },
        { name: 'MCP Servers', icon: 'https://cdn.simpleicons.org/serverless' }
      ]
    },
    {
      key: 'rag_retrieval',
      skills: [
        { name: 'Azure AI Search', icon: 'https://cdn.simpleicons.org/microsoftazure' },
        { name: 'FAISS', icon: 'https://cdn.simpleicons.org/meta' },
        { name: 'Pinecone', icon: 'https://cdn.simpleicons.org/pinecone' },
        { name: 'pgvector', icon: 'https://cdn.simpleicons.org/postgresql' },
        { name: 'Hybrid Search', icon: 'https://cdn.simpleicons.org/google' }
      ]
    },
    {
      key: 'mlops_eval',
      skills: [
        { name: 'LangSmith', icon: 'https://cdn.simpleicons.org/langchain' },
        { name: 'DeepEval/Ragas', icon: 'https://cdn.simpleicons.org/testcafe' },
        { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker' },
        { name: 'Kubernetes', icon: 'https://cdn.simpleicons.org/kubernetes' }
      ]
    },
    {
      key: 'safety_governance',
      skills: [
        { name: 'Guardrails', icon: 'https://cdn.simpleicons.org/shield' },
        { name: 'Policy Enforcement', icon: 'https://cdn.simpleicons.org/policy' },
        { name: 'Red-Teaming', icon: 'https://cdn.simpleicons.org/bug' },
        { name: 'Hallucination Detection', icon: 'https://cdn.simpleicons.org/eye' }
      ]
    },
    {
      key: 'cloud_dev',
      skills: [
        { name: 'Azure/AWS/GCP', icon: 'https://cdn.simpleicons.org/microsoftazure' },
        { name: 'Python', icon: 'https://cdn.simpleicons.org/python' },
        { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs' },
        { name: 'React.js', icon: 'https://cdn.simpleicons.org/react' },
        { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb' },
        { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql' },
        { name: 'Git', icon: 'https://cdn.simpleicons.org/git' }
      ]
    }
  ];

  return (
    <section id="skills" className="py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-sm text-gray-500 mb-6 tracking-wider">
            {texts.skills.title}
          </p>
          <h2 className="text-5xl lg:text-7xl font-light text-white mb-8 leading-tight">
            {texts.skills.headline.line1}
            <br />
            <span className="text-gray-600">{texts.skills.headline.line2}</span>
          </h2>
          <div className="w-24 h-px bg-white/30 mx-auto mb-8" />
          <p className="text-lg text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
            {texts.skills.description}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.key}
              variants={fadeInUp}
              className="group"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-light text-white mb-2">
                  {texts.skills.categories[category.key]}
                </h3>
                <div className="w-12 h-px bg-gray-600 group-hover:w-16 group-hover:bg-white transition-all duration-300" />
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 10 }}
                    transition={{
                      delay: (categoryIndex * 0.1) + (index * 0.05),
                      duration: 0.3,
                      ease: [0.6, -0.05, 0.01, 0.99]
                    }}
                    viewport={{ once: true }}
                    className="group/skill flex items-center space-x-3 cursor-pointer"
                  >
                    <div className="w-5 h-5 opacity-80 group-hover/skill:opacity-100 transition-opacity duration-300">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-base text-gray-500 group-hover/skill:text-white transition-colors duration-300">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;