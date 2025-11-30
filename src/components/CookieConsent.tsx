import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X, Settings, Check } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Delay showing banner for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
      } catch (e) {
        console.error('Error loading cookie preferences:', e);
      }
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
    setIsVisible(false);
    
    // Initialize analytics based on preferences
    if (prefs.analytics) {
      // Initialize Google Analytics or other analytics here
      console.log('Analytics enabled');
    }
    
    if (prefs.marketing) {
      // Initialize marketing cookies here
      console.log('Marketing cookies enabled');
    }
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allAccepted);
  };

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(necessaryOnly);
  };

  const saveCustom = () => {
    savePreferences(preferences);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-[100]"
      >
        <div className="relative bg-gradient-to-br from-purple-900/95 to-blue-900/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10" />

          {/* Close button */}
          <motion.button
            onClick={acceptNecessary}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white/60 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-4 h-4" />
          </motion.button>

          <div className="relative z-10 p-6">
            {!showSettings ? (
              // Main view
              <>
                <div className="flex items-start gap-3 mb-4">
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/40 to-blue-600/40 border border-white/20 flex items-center justify-center flex-shrink-0"
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Cookie className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-white mb-2" style={{ fontSize: '1.1rem' }}>
                      Używamy plików cookie
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Nasza strona wykorzystuje pliki cookie, aby zapewnić Ci najlepsze doświadczenie. 
                      Niektóre są niezbędne do działania strony, inne pomagają nam ją ulepszać.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    onClick={acceptAll}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white text-sm hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/25"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Akceptuj wszystkie
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setShowSettings(true)}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Settings className="w-4 h-4" />
                    Ustawienia
                  </motion.button>

                  <motion.button
                    onClick={acceptNecessary}
                    className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/70 hover:text-white text-sm transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Tylko niezbędne
                  </motion.button>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-white/50 text-xs">
                    Więcej informacji w naszej{' '}
                    <a href="#privacy" className="text-purple-300 hover:text-purple-200 underline">
                      Polityce Prywatności
                    </a>
                  </p>
                </div>
              </>
            ) : (
              // Settings view
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <motion.button
                    onClick={() => setShowSettings(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ←
                  </motion.button>
                  <h3 className="text-white" style={{ fontSize: '1.1rem' }}>
                    Ustawienia cookies
                  </h3>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Necessary cookies */}
                  <div className="flex items-start justify-between gap-4 p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white text-sm">Niezbędne</h4>
                        <span className="px-2 py-0.5 bg-purple-600/30 border border-purple-400/30 rounded text-purple-200 text-xs">
                          Wymagane
                        </span>
                      </div>
                      <p className="text-white/60 text-xs leading-relaxed">
                        Umożliwiają podstawowe funkcje strony, takie jak nawigacja i dostęp do bezpiecznych obszarów.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Check className="w-5 h-5 text-purple-300" />
                    </div>
                  </div>

                  {/* Analytics cookies */}
                  <div className="flex items-start justify-between gap-4 p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex-1">
                      <h4 className="text-white text-sm mb-1">Analityczne</h4>
                      <p className="text-white/60 text-xs leading-relaxed">
                        Pomagają zrozumieć, jak użytkownicy korzystają ze strony, aby ją ulepszać.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-blue-600"></div>
                    </label>
                  </div>

                  {/* Marketing cookies */}
                  <div className="flex items-start justify-between gap-4 p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex-1">
                      <h4 className="text-white text-sm mb-1">Marketingowe</h4>
                      <p className="text-white/60 text-xs leading-relaxed">
                        Używane do wyświetlania spersonalizowanych reklam i śledzenia ich skuteczności.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-blue-600"></div>
                    </label>
                  </div>
                </div>

                <motion.button
                  onClick={saveCustom}
                  className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white text-sm hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-500/25"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Zapisz preferencje
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* Floating particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: `${20 + i * 20}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 2 + i,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
