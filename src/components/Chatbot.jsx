import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HfInference } from '@huggingface/inference';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! 👋 I\'m Ayush\'s AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const portfolioContext = `
You are an AI assistant for Ayush Singh's portfolio. Only answer questions about:

Name: Ayush Singh
Email: singhaayu311@gmail.com
Phone: +91 74618 79795
Location: Dwarka, South West Delhi – 110078
Title: System Engineer | Infrastructure Full Stack Developer
Experience: 3+ years

Skills:
- Languages: Python, JavaScript, Solidity, SQL
- Backend: Node.js, REST API Development
- Frontend: React.js, Tailwind CSS
- Blockchain: Ethereum, Smart Contracts
- AI: OpenAI API Integration, Generative AI Workflows
- Databases: MongoDB, SQL
- Tools: Apache Tomcat, Git & GitHub

Projects:
1. Crypto Wallet - Decentralized crypto wallet with Ethereum smart contracts
2. CoCo - AI Agent and SaaS Application Marketplace
3. Portfolio - Personal portfolio website

Certifications:
- OpenAI API Developer - Infosys
- Python Developer - Infosys
- Data Consultant - Infosys
- Generative AI Professional Developer - Infosys

Companies: Infosys Limited, Appen, Soulhq.io, Turing, Braintrust

About: Backend and data-focused engineer with 3+ years of experience at Infosys building backend services, AI workflows, and data-driven systems.

If asked anything outside this scope, respond with: "❌ Error #404: Not Found. I can only answer questions about Ayush Singh's professional profile."
`;

  const getBotResponse = async (userInput) => {
    try {
      const hf = new HfInference(import.meta.env.VITE_HF_TOKEN);
      
      const response = await hf.chatCompletion({
        model: 'meta-llama/Meta-Llama-3-70B-Instruct',
        messages: [
          { role: 'system', content: portfolioContext },
          { role: 'user', content: userInput }
        ],
        max_tokens: 300,
        temperature: 0.7
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Error:', error);
      return 'Sorry, I encountered an error. Please try again.';
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);
    
    const botResponse = await getBotResponse(currentInput);
    setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { icon: '💼', label: 'Skills', query: 'What are your skills?' },
    { icon: '🚀', label: 'Projects', query: 'Tell me about your projects' },
    { icon: '📧', label: 'Contact', query: 'How can I contact you?' }
  ];

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-28 right-6 z-50 w-[400px] h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl">
                  🤖
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-xs text-white/90">Online</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-white/80 mt-2">Ask me anything about Ayush!</p>
            </div>

            {/* Messages */}
            <div 
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
              onWheel={(e) => e.stopPropagation()}
            >
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.type === 'bot' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-sm mr-2 flex-shrink-0">
                      🤖
                    </div>
                  )}
                  <div className={`max-w-[75%] p-3 rounded-2xl shadow-sm ${
                    msg.type === 'user'
                      ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-sm mr-2">
                    🤖
                  </div>
                  <div className="bg-white p-4 rounded-2xl rounded-bl-md shadow-sm">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="px-4 py-3 bg-white border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
                <div className="flex gap-2">
                  {quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setInput(action.query);
                        handleSend();
                      }}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-xl p-2 transition-colors"
                    >
                      <div className="text-lg mb-1">{action.icon}</div>
                      <div className="text-xs text-gray-700 font-medium">{action.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex gap-2 items-end">
                <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-3 flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-500 focus:outline-none disabled:opacity-50"
                  />
                </div>
                <motion.button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
