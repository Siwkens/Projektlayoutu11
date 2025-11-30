/**
 * CHATBOT Z INTEGRACJĄ OPENAI API
 * 
 * Ten komponent jest wersją zaawansowaną chatbota z prawdziwą integracją AI.
 * Aby go użyć:
 * 
 * 1. Zamień import w App.tsx:
 *    import { ChatBotAI as ChatBot } from './components/ChatBotAI';
 * 
 * 2. Dodaj do backendu endpoint /make-server-139d10cf/chat w /supabase/functions/server/index.tsx:
 * 
 *    app.post('/make-server-139d10cf/chat', async (c) => {
 *      const { message, conversationHistory } = await c.req.json();
 *      
 *      const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
 *      if (!openaiApiKey) {
 *        return c.json({ error: 'OPENAI_API_KEY not configured' }, 500);
 *      }
 *      
 *      const systemPrompt = `Jesteś asystentem terapeutycznym dla Wojciecha Bożemskiego - terapeuty energetycznego.
 *      
 *      Informacje o terapii:
 *      - Specjalizacja: terapia energetyczna, praca z czakrami, harmonizacja energii
 *      - Ceny: Pierwsza sesja (90 min) - 350 zł, Sesja standardowa (60 min) - 250 zł, Pakiet 5 sesji - 1100 zł
 *      - Sesje dostępne stacjonarnie i zdalnie
 *      - Proces: wywiad, diagnoza energetyczna, praca energetyczna, integracja, feedback
 *      - Kontakt: kontakt@wojciechbozemski.pl
 *      
 *      Odpowiadaj ciepło, empatycznie i profesjonalnie. Używaj emoji ✨🌟💫🔮 dla lepszej komunikacji.
 *      Jeśli pytanie wykracza poza terapię energetyczną, grzecznie przekieruj do tematu.`;
 *      
 *      try {
 *        const response = await fetch('https://api.openai.com/v1/chat/completions', {
 *          method: 'POST',
 *          headers: {
 *            'Content-Type': 'application/json',
 *            'Authorization': `Bearer ${openaiApiKey}`,
 *          },
 *          body: JSON.stringify({
 *            model: 'gpt-4',
 *            messages: [
 *              { role: 'system', content: systemPrompt },
 *              ...conversationHistory,
 *              { role: 'user', content: message }
 *            ],
 *            temperature: 0.7,
 *            max_tokens: 500,
 *          }),
 *        });
 *        
 *        const data = await response.json();
 *        
 *        if (data.error) {
 *          console.error('OpenAI API error:', data.error);
 *          return c.json({ error: data.error.message }, 500);
 *        }
 *        
 *        return c.json({ 
 *          response: data.choices[0].message.content 
 *        });
 *      } catch (error) {
 *        console.error('Chat error:', error);
 *        return c.json({ error: 'Failed to get AI response' }, 500);
 *      }
 *    });
 * 
 * 3. Dodaj OPENAI_API_KEY do zmiennych środowiskowych Supabase
 * 
 * 4. W komponencie poniżej odkomentuj sekcję z wywołaniem API i zakomentuj findBestResponse
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Sparkles, Zap, AlertCircle } from 'lucide-react';
import { useMood } from './context/MoodContext';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const greetings = [
  '🌟 Witaj w przestrzeni terapii energetycznej! Jestem Twoim asystentem AI. Jak mogę Ci dzisiaj pomóc?',
  '✨ Namaste! Cieszę się, że tu jesteś. Możesz pytać mnie o wszystko związane z terapią energetyczną!',
  '💫 Witaj w kosmicznej podróży do równowagi. Jestem tutaj, aby odpowiedzieć na Twoje pytania!',
];

export function ChatBotAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { colors } = useMood();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = greetings[Math.floor(Math.random() * greetings.length)];
      setMessages([{
        id: '1',
        text: greeting,
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
      // Przygotuj historię konwersacji dla kontekstu
      const conversationHistory = messages
        .filter(m => m.sender !== 'bot' || m.id !== '1') // Usuń powitanie
        .map(m => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        }));

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-139d10cf/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            message: userMessage,
            conversationHistory
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await response.json();
      return data.response;

    } catch (error) {
      console.error('AI Chat error:', error);
      
      // Fallback do podstawowej wersji jeśli API nie działa
      setError('AI obecnie niedostępne. Używam trybu podstawowego.');
      
      return '🤔 Przepraszam, mam chwilowe problemy z połączeniem. Spróbuj zadać pytanie ponownie lub skorzystaj z przycisków z szybkimi pytaniami poniżej.';
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setError(null);

    try {
      const aiResponse = await getAIResponse(inputValue);

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Send error:', error);
      
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: '❌ Przepraszam, wystąpił problem. Spróbuj ponownie.',
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickQuestions = [
    'Czym jest terapia energetyczna?',
    'Ile kosztuje sesja?',
    'Jak umówić się na sesję?',
    'Jak przebiega sesja?'
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 rounded-full p-4 shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>

            {/* Pulsating ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                opacity: 0.4,
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Sparkle particles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                }}
                animate={{
                  x: [0, Math.cos(i * 120 * Math.PI / 180) * 30],
                  y: [0, Math.sin(i * 120 * Math.PI / 180) * 30],
                  opacity: [1, 0],
                  scale: [0, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
              >
                <Sparkles className="w-3 h-3" style={{ color: colors.accent }} />
              </motion.div>
            ))}

            {/* AI Badge */}
            <div className="absolute -top-1 -right-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
              AI
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] rounded-2xl shadow-2xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${colors.background}F2, ${colors.background}E6)`,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${colors.primary}40`,
            }}
          >
            {/* Header */}
            <div
              className="p-4 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
              }}
            >
              {/* Animated background particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.2, 0.8, 0.2],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <Zap className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-white">Asystent AI</h3>
                      <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">GPT-4</span>
                    </div>
                    <p className="text-xs text-white/80">Inteligentne odpowiedzi o terapii</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>

            {/* Error Banner */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-yellow-500/20 border-b border-yellow-500/30 flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 text-yellow-400" />
                <p className="text-xs text-yellow-200">{error}</p>
              </motion.div>
            )}

            {/* Messages Area */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'rounded-br-sm'
                        : 'rounded-bl-sm'
                    }`}
                    style={{
                      background: message.sender === 'user'
                        ? `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`
                        : `${colors.primary}20`,
                      color: message.sender === 'user' ? 'white' : colors.text,
                      border: message.sender === 'bot' ? `1px solid ${colors.primary}30` : 'none',
                    }}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <span className="text-xs opacity-60 mt-1 block">
                      {message.timestamp.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div
                    className="p-3 rounded-2xl rounded-bl-sm"
                    style={{
                      background: `${colors.primary}20`,
                      border: `1px solid ${colors.primary}30`,
                    }}
                  >
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: colors.primary }}
                          animate={{
                            y: [0, -10, 0],
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs mb-2 opacity-60">Popularne pytania:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setInputValue(question);
                        setTimeout(() => handleSend(), 100);
                      }}
                      className="text-xs px-3 py-1.5 rounded-full border transition-colors"
                      style={{
                        borderColor: `${colors.primary}40`,
                        color: colors.text,
                      }}
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div
              className="p-4 border-t"
              style={{
                borderColor: `${colors.primary}20`,
              }}
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSend()}
                  placeholder="Napisz wiadomość..."
                  disabled={isTyping}
                  className="flex-1 px-4 py-2 rounded-full outline-none transition-all disabled:opacity-50"
                  style={{
                    background: `${colors.primary}10`,
                    border: `1px solid ${colors.primary}30`,
                    color: colors.text,
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
                  }}
                >
                  <Send className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
