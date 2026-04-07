import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const RESUME_KEYWORDS = ['resume', 'cv', 'download', 'रिज्यूमे', 'सीवी', 'डाउनलोड'];
const EMAIL_KEYWORDS = ['send email', 'send message', 'contact email', 'mail', 'ईमेल भेजें', 'संदेश भेजें'];

const isResumeRequest = (text) => RESUME_KEYWORDS.some(k => text.toLowerCase().includes(k));
const isEmailRequest = (text) => EMAIL_KEYWORDS.some(k => text.toLowerCase().includes(k));

const fallbackLocalResponse = (userInput, isHindi) => {
  const q = userInput.toLowerCase();
  if (q.includes('skill') || q.includes('tech') || q.includes('कौशल')) {
    return isHindi
      ? 'AI सेवा उपलब्ध न होने पर भी: आयुष React, Node.js, Python, Generative AI, RAG और Cloud (AWS/Azure/GCP) पर काम करते हैं।'
      : 'Even while AI service is unavailable: Ayush works with React, Node.js, Python, Generative AI, RAG, and cloud (AWS/Azure/GCP).';
  }
  if (q.includes('project') || q.includes('प्रोजेक्ट') || q.includes('portfolio')) {
    return isHindi
      ? 'AI सेवा अस्थायी रूप से डाउन है। मुख्य प्रोजेक्ट्स: AI Agent Marketplace, Ethereum Crypto Wallet, और यह AI Portfolio।'
      : 'AI service is temporarily down. Key projects include an AI Agent Marketplace, an Ethereum Crypto Wallet, and this AI portfolio.';
  }
  if (q.includes('experience') || q.includes('infosys') || q.includes('अनुभव')) {
    return isHindi
      ? 'आयुष के पास Infosys में 3+ वर्षों का फुल-स्टैक और AI अनुभव है।'
      : 'Ayush has 3+ years of full-stack and AI experience at Infosys.';
  }
  return isHindi
    ? 'AI API अभी उपलब्ध नहीं है, लेकिन मैं बेसिक जानकारी दे सकता हूँ। कौशल, प्रोजेक्ट, अनुभव या संपर्क पूछें।'
    : 'The AI API is currently unavailable, but I can still help with basics. Ask about skills, projects, experience, or contact.';
};

// Check for Web Speech API support
const SpeechRecognition = typeof window !== 'undefined'
  ? window.SpeechRecognition || window.webkitSpeechRecognition
  : null;

const Chatbot = () => {
  const { language, toggleLanguage } = useLanguage();
  const isHindi = language === 'hi';

  const getGreeting = () => isHindi
    ? 'नमस्ते! 👋 मैं आयुष का AI असिस्टेंट हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?'
    : "Hello! 👋 I'm Ayush's AI assistant. How can I help you today?";

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('chatbot_history');
      if (saved) return JSON.parse(saved);
    } catch(e) {}
    return [{ type: 'bot', text: getGreeting() }];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if (SpeechRecognition) {
      setVoiceSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript.trim()) {
          setInput(transcript);
          // Auto-send after a short delay so the user sees what was recognized
          setTimeout(() => {
            handleSendRef.current(transcript);
          }, 300);
        }
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (_) {}
      }
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('chatbot_history', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (messages.length === 1) setMessages([{ type: 'bot', text: getGreeting() }]);
  }, [language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const downloadResume = () => {
    const a = document.createElement('a');
    a.href = '/resume.pdf';
    a.download = 'Ayush_Singh_Resume.pdf';
    a.click();
  };

  const composeEmail = () => {
    window.location.href = 'mailto:singhaayu311@gmail.com?subject=Reaching out from Portfolio&body=Hi Ayush,';
  };

  const speakText = (text, isHindiProp) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text.replace(/\[.*?\]/g, ''));
      utterance.lang = isHindiProp ? 'hi-IN' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSend = useCallback(async (customText = null) => {
    const text = typeof customText === 'string' ? customText : input;
    if (!text.trim() || isLoading) return;

    const userMsg = { type: 'user', text };
    const currentHistory = [...messages, userMsg];
    setMessages(currentHistory);
    setInput('');
    setIsLoading(true);

    try {
      const historyMessages = currentHistory
        .filter(m => m.type === 'user' || m.type === 'bot')
        .slice(-8)
        .map(m => ({ role: m.type === 'user' ? 'user' : 'assistant', content: m.text }));

      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historyMessages,
          language: isHindi ? 'hi' : 'en',
        }),
      });

      if (!res.ok) throw new Error('API request failed');

      let botMessageText = '';
      setMessages(prev => [...prev, { type: 'bot', text: '' }]);
      setIsLoading(false); // remove simple loading icon

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          if (buffer.startsWith('data: ')) {
            try {
              const data = JSON.parse(buffer.slice(6));
              if (data.text) {
                botMessageText += data.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = botMessageText.replace(/\[.*?\]/g, '');
                    return newMessages;
                });
              }
            } catch(e) {}
          }
          break;
        }
        buffer += decoder.decode(value, { stream: true });
        
        const lines = buffer.split('\n\n');
        buffer = lines.pop(); // save incomplete chunk
        for (const line of lines) {
           if (line.startsWith('data: ')) {
               try {
                   const data = JSON.parse(line.slice(6));
                   if (data.text) {
                       botMessageText += data.text;
                       setMessages(prev => {
                           const newMessages = [...prev];
                           newMessages[newMessages.length - 1].text = botMessageText.replace(/\[.*?\]/g, ''); // hide tokens
                           return newMessages;
                       });
                   }
               } catch (e) {}
           }
        }
      }

      // Check actions
      const scrollMatch = botMessageText.match(/\[SCROLL_TO_(.*?)\]/);
      if (scrollMatch) {
         const targetId = scrollMatch[1].toLowerCase();
         const el = document.getElementById(targetId) || document.getElementById('portfolio');
         if (el) {
           if (window.lenis) {
             window.lenis.scrollTo(el);
           } else {
             el.scrollIntoView({ behavior: 'smooth' });
           }
         }
      }

      if (botMessageText.includes('[RESUME_DOWNLOAD]')) {
        setMessages(prev => { const n = [...prev]; n[n.length-1].action = 'resume'; return n; });
        setTimeout(downloadResume, 300);
      } else if (botMessageText.includes('[EMAIL_COMPOSE]')) {
        setMessages(prev => { const n = [...prev]; n[n.length-1].action = 'email'; return n; });
      }

    } catch (err) {
      console.error('Chatbot fetch error:', err);
      const fallback = fallbackLocalResponse(text, isHindi);
      setMessages(prev => [...prev, { type: 'bot', text: fallback }]);
      setIsLoading(false);
    }
  }, [input, isLoading, isHindi, messages]);

  // Ref to always have the latest handleSend in speech recognition callback
  const handleSendRef = useRef(handleSend);
  useEffect(() => {
    handleSendRef.current = handleSend;
  }, [handleSend]);

  // Voice command handler
  const toggleVoice = useCallback(() => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.abort();
      setIsListening(false);
      return;
    }

    // Set language for recognition
    recognitionRef.current.lang = isHindi ? 'hi-IN' : 'en-US';
    setIsListening(true);

    try {
      recognitionRef.current.start();
    } catch (err) {
      console.warn('Speech recognition start error:', err);
      setIsListening(false);
    }
  }, [isListening, isHindi]);

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const quickActions = isHindi
    ? [
        { icon: '💼', label: 'कौशल', query: 'आपके कौशल क्या हैं?' },
        { icon: '🚀', label: 'प्रोजेक्ट', query: 'अपने प्रोजेक्ट के बारे में बताएं' },
        { icon: '📄', label: 'रिज्यूमे', query: 'रिज्यूमे डाउनलोड करें' },
        { icon: '📧', label: 'संपर्क', query: 'ईमेल भेजें' }
      ]
    : [
        { icon: '💼', label: 'Skills', query: 'What are your skills?' },
        { icon: '🚀', label: 'Projects', query: 'Tell me about your projects' },
        { icon: '📄', label: 'Resume', query: 'Download resume' },
        { icon: '📧', label: 'Email', query: 'Send email to Ayush' }
      ];

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg key="chat" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className="fixed bottom-[80px] right-4 md:bottom-[100px] md:right-6 z-50 w-[calc(100vw-32px)] md:w-[400px] h-[calc(100vh-100px)] max-h-[600px] bg-white rounded-2xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-5 text-white">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-xl flex-shrink-0">🤖</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base">{isHindi ? 'AI असिस्टेंट' : 'AI Assistant'}</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-xs text-white/90">{isHindi ? 'ऑनलाइन' : 'Online'}</p>
                  </div>
                </div>
                {/* Clear chat */}
                <button
                  onClick={() => {
                      localStorage.removeItem('chatbot_history');
                      setMessages([{ type: 'bot', text: getGreeting() }]);
                  }}
                  className="bg-white/20 hover:bg-white/30 transition-colors rounded-full p-1.5"
                  title={isHindi ? 'चैट साफ़ करें' : 'Clear chat'}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                {/* Language toggle */}
                <button
                  onClick={toggleLanguage}
                  className="bg-white/20 hover:bg-white/30 transition-colors rounded-full px-3 py-1.5 text-xs font-bold tracking-wide"
                >
                  {isHindi ? 'EN' : 'हि'}
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 flex flex-col z-0 relative"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.type === 'bot' && (
                    <div className="w-7 h-7 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-1">🤖</div>
                  )}
                  <div className="max-w-[85%] md:max-w-[75%] group relative">
                    <div className={`p-3 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap break-words ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-br-md text-left'
                        : 'bg-white text-gray-800 rounded-bl-md'
                    }`}>
                      {msg.text}
                    </div>
                    {/* Action buttons for special messages */}
                    {msg.action === 'resume' && (
                      <button
                        onClick={downloadResume}
                        className="mt-1.5 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-semibold py-2 px-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        {isHindi ? 'रिज्यूमे डाउनलोड करें' : 'Download Resume'}
                      </button>
                    )}
                    {msg.action === 'email' && (
                      <button
                        onClick={composeEmail}
                        className="mt-1.5 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-semibold py-2 px-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {isHindi ? 'ईमेल खोलें' : 'Open Email'}
                      </button>
                    )}
                    {/* Copy button UI & TTS button */}
                    {msg.type === 'bot' && !msg.action && (
                      <div className="absolute -bottom-1 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <button
                            onClick={() => speakText(msg.text, isHindi)}
                            className="bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:bg-gray-100"
                            title="Read aloud"
                          >
                           <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M17.657 6.343a8 8 0 010 11.314M11 5L6 9H2v6h4l5 4V5z" /></svg>
                          </button>
                          <button
                            onClick={() => handleCopy(msg.text, idx)}
                            className="bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:bg-gray-100"
                            title="Copy text"
                          >
                            {copiedIdx === idx
                              ? <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                              : <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                            }
                          </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="w-7 h-7 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-1">🤖</div>
                  <div className="bg-white p-3 rounded-2xl rounded-bl-md shadow-sm">
                    <div className="flex gap-1.5 py-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions — shown only on first message */}
            {messages.length === 1 && (
              <div className="px-4 py-3 bg-white border-t border-gray-100 z-10 relative">
                <p className="text-xs text-gray-400 mb-2">{isHindi ? 'त्वरित क्रियाएं:' : 'Quick actions:'}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-1.5">
                  {quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(action.query)}
                      className="bg-gray-100 hover:bg-gray-200 rounded-xl p-2 transition-colors text-center"
                    >
                      <div className="text-base mb-0.5">{action.icon}</div>
                      <div className="text-[10px] text-gray-700 font-medium leading-tight">{action.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3 md:p-4 bg-white border-t border-gray-100 z-10 relative">
              <div className="flex gap-2 items-end md:items-center">
                <div className="flex-1 bg-gray-100 rounded-2xl px-3 py-2 md:px-4 md:py-2.5 flex items-center h-full min-h-[40px]">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                    placeholder={isListening ? (isHindi ? '🎙️ सुन रहा हूँ...' : '🎙️ Listening...') : (isHindi ? 'अपना संदेश लिखें...' : 'Type your message...')}
                    disabled={isLoading || isListening}
                    className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none disabled:opacity-50"
                  />
                </div>

                {/* Voice Input Button */}
                {voiceSupported && (
                  <motion.button
                    onClick={toggleVoice}
                    disabled={isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 transition-colors self-center ${
                      isListening
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    } disabled:opacity-40 disabled:cursor-not-allowed`}
                    title={isListening ? (isHindi ? 'सुनना बंद करें' : 'Stop listening') : (isHindi ? 'आवाज़ से बोलें' : 'Voice input')}
                  >
                    {isListening ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="6" y="6" width="12" height="12" rx="2" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-14 0m7 7v4m-4 0h8M12 1a3 3 0 00-3 3v7a3 3 0 006 0V4a3 3 0 00-3-3z" />
                      </svg>
                    )}
                  </motion.button>
                )}

                {/* Send Button */}
                <motion.button
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 md:w-10 md:h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-lg flex-shrink-0 self-center"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
