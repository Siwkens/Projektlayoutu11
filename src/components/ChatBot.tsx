import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Sparkles, Zap } from 'lucide-react';
import { useMood } from './context/MoodContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface KnowledgeBase {
  keywords: string[];
  response: string;
  category: string;
}

// Baza wiedzy o terapii energetycznej Wojciecha Bożemskiego
const knowledgeBase: KnowledgeBase[] = [
  {
    keywords: ['czym', 'czego', 'terapia energetyczna', 'co to', 'na czym polega'],
    response: '🌟 Terapia energetyczna to holistyczne podejście do zdrowia, które pracuje z subtelnymi energiami ciała. Pomagam w przywróceniu równowagi energetycznej, usunięciu blokad i harmonizacji czakr. Każda sesja jest dostosowana indywidualnie do Twoich potrzeb.',
    category: 'basics'
  },
  {
    keywords: ['czakra', 'czakry', 'chakra', 'energia', 'energii'],
    response: '✨ Czakry to centra energetyczne w ciele. Pracuję z 7 głównymi czakrami: od korzeniowej (podstawowa) po koronową (duchową). Każda czakra odpowiada za inne aspekty życia - fizyczne, emocjonalne i duchowe. Podczas sesji diagnozuję i harmonizuję przepływ energii przez wszystkie czakry.',
    category: 'chakras'
  },
  {
    keywords: ['ile', 'koszt', 'cena', 'ceny', 'płatność', 'zapłacić'],
    response: '💎 Sesja terapeutyczna to inwestycja w Twoje zdrowie:\n\n• Pierwsza sesja (90 min): 350 zł\n• Sesja standardowa (60 min): 250 zł\n• Pakiet 5 sesji: 1100 zł\n\nPierwsza sesja jest dłuższa, ponieważ zawiera szczegółową diagnozę energetyczną.',
    category: 'pricing'
  },
  {
    keywords: ['jak', 'proces', 'przebiega', 'sesja', 'wygląda'],
    response: '🔮 Proces terapeutyczny:\n\n1. 📋 Wywiad - poznaję Twoją historię i potrzeby\n2. 🎯 Diagnoza energetyczna - skanowanie czakr i aury\n3. ⚡ Praca energetyczna - usuwanie blokad, harmonizacja\n4. 🧘 Integracja - medytacja i ugruntowanie zmian\n5. 💬 Feedback - omówienie sesji i zalecenia\n\nCała sesja trwa 60-90 minut.',
    category: 'process'
  },
  {
    keywords: ['rezerwacja', 'umówić', 'spotkanie', 'termin', 'zarezerwować', 'wizyta'],
    response: '📅 Aby umówić się na sesję, kliknij przycisk "Zarezerwuj sesję" w menu u góry strony. Możesz wybrać dogodny termin z kalendarza. Po zarezerwowaniu otrzymasz potwierdzenie na email.',
    category: 'booking'
  },
  {
    keywords: ['kim jesteś', 'kim jest', 'wojciech', 'terapeuta', 'doświadczenie'],
    response: '🙏 Jestem Wojciech Bożemski - terapeuta energetyczny z wieloletnim doświadczeniem. Łączę wiedzę o tradycyjnych systemach energetycznych z nowoczesnymi metodami terapeutycznymi. Moją pasją jest pomaganie ludziom w odkrywaniu ich wewnętrznego potencjału i przywracaniu harmonii.',
    category: 'about'
  },
  {
    keywords: ['pomoc', 'pomoże', 'leczy', 'skuteczność', 'efekty'],
    response: '🌈 Terapia energetyczna może pomóc w:\n\n• Redukcji stresu i napięcia\n• Problemach emocjonalnych (lęk, smutek)\n• Blokadach energetycznych\n• Bólach psychosomatycznych\n• Rozwoju duchowym\n• Poprawie jakości snu\n• Zwiększeniu witalności\n\nEfekty są indywidualne - niektórzy czują poprawę od razu, inni po kilku sesjach.',
    category: 'benefits'
  },
  {
    keywords: ['przygotować', 'przygotowanie', 'przed sesją', 'co zabrać'],
    response: '🧘‍♂️ Przygotowanie do sesji:\n\n• Przyjdź w wygodnym ubraniu\n• Zjedz lekki posiłek 1-2h wcześniej\n• Unikaj kofeiny przed sesją\n• Bądź otwarty na doświadczenie\n• Pomyśl o swoich intencjach\n\nNie musisz nic ze sobą zabierać - zapewniam wszystko, co potrzebne.',
    category: 'preparation'
  },
  {
    keywords: ['zdalne', 'online', 'zdalnie', 'przez internet', 'wirtualnie'],
    response: '🌐 Tak! Oferuję również sesje zdalne. Energia nie zna granic fizycznych - praca energetyczna jest równie skuteczna na odległość. Sesje online prowadzę przez wideorozmowę, gdzie możesz być w komfortowym dla siebie miejscu.',
    category: 'remote'
  },
  {
    keywords: ['ile sesji', 'jak często', 'częstotliwość', 'jak długo'],
    response: '⏰ Częstotliwość sesji jest indywidualna. Zazwyczaj:\n\n• Problemy ostre: 1 sesja na tydzień (3-5 sesji)\n• Praca rozwojowa: 1 sesja na 2-3 tygodnie\n• Utrzymanie równowagi: 1 sesja na miesiąc\n\nPo pierwszej sesji ustalimy optymalny plan terapeutyczny dla Ciebie.',
    category: 'frequency'
  },
  {
    keywords: ['kontakt', 'email', 'telefon', 'napisać', 'zadzwonić'],
    response: '📧 Skontaktuj się ze mną:\n\n• Email: kontakt@wojciechbozemski.pl\n• Telefon: +48 XXX XXX XXX\n• Najszybsza odpowiedź: przez formularz rezerwacji na stronie\n\nOdpowiadam zazwyczaj w ciągu 24 godzin.',
    category: 'contact'
  }
];

const greetings = [
  '🌟 Witaj w przestrzeni terapii energetycznej! Jestem Twoim przewodnikiem. Jak mogę Ci dzisiaj pomóc?',
  '✨ Namaste! Cieszę się, że tu jesteś. O czym chciałbyś porozmawiać?',
  '💫 Witaj w kosmicznej podróży do równowagi. Zadaj mi pytanie o terapię energetyczną!',
];

const fallbackResponses = [
  '🤔 To ciekawe pytanie! Powiedz mi więcej, a postaram się pomóc. Możesz też zapytać o: terapię energetyczną, czakry, ceny, rezerwację lub proces sesji.',
  '💭 Hmm, nie jestem pewien czy dobrze zrozumiałem. Spróbuj zapytać o konkretny temat: jak wygląda sesja? ile kosztuje? czym są czakry?',
  '🔮 Ciekawe pytanie! W czym konkretnie mogę pomóc? Pytaj śmiało o terapię, cennik, rezerwacje lub moje doświadczenie.',
];

interface ChatBotProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function ChatBot({ isOpen: externalIsOpen, onClose: externalOnClose }: ChatBotProps = {}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { colors } = useMood();

  // Use external state if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = (value: boolean) => {
    if (externalOnClose && !value) {
      externalOnClose();
    } else if (externalIsOpen === undefined) {
      setInternalIsOpen(value);
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Powitanie po otwarciu
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

  const findBestResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Szukaj najlepszego dopasowania
    let bestMatch: KnowledgeBase | null = null;
    let maxMatches = 0;

    for (const entry of knowledgeBase) {
      const matches = entry.keywords.filter(keyword => 
        lowerMessage.includes(keyword)
      ).length;

      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = entry;
      }
    }

    if (bestMatch && maxMatches > 0) {
      return bestMatch.response;
    }

    // Fallback response
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };

  const handleSend = () => {
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

    // Symulacja "myślenia" bota
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: findBestResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const quickQuestions = [
    'Czym jest terapia energetyczna?',
    'Ile kosztuje sesja?',
    'Jak umówić się na sesję?',
    'Jak przebiega sesja?'
  ];

  return (
    <>
      {/* Floating Chat Button - only show if not controlled externally */}
      {externalIsOpen === undefined && (
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
            </motion.button>
          )}
        </AnimatePresence>
      )}

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
                    <h3 className="text-white">Asystent Terapeutyczny</h3>
                    <p className="text-xs text-white/80">Odpowiadam na pytania o terapię</p>
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
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Napisz wiadomość..."
                  className="flex-1 px-4 py-2 rounded-full outline-none transition-all"
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
                  disabled={!inputValue.trim()}
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