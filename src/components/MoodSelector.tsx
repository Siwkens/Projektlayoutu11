import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useMood, moodThemes } from './context/MoodContext';
import { Sparkles, Zap, Activity, X } from 'lucide-react';

export function MoodSelector() {
  const { mood, setMood } = useMood();
  const [isOpen, setIsOpen] = useState(false);

  const moods = [
    { id: 'calm', label: 'Harmonia', icon: Sparkles, color: moodThemes.calm.primary },
    { id: 'stress', label: 'Stres', icon: Activity, color: moodThemes.stress.primary },
    { id: 'fatigue', label: 'Zmęczenie', icon: Zap, color: moodThemes.fatigue.primary },
  ] as const;

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col-reverse items-end gap-4">
      {/* Toggle Button */}
      <motion.button
        className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg relative overflow-hidden group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={`absolute inset-0 opacity-20 bg-[${moodThemes[mood].primary}] transition-colors duration-500`} />
        {isOpen ? <X /> : <Sparkles className="animate-pulse" />}
      </motion.button>

      {/* Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="flex flex-col-reverse gap-3"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
          >
            {moods.map((item) => (
              <motion.button
                key={item.id}
                className={`relative flex items-center justify-end gap-3 group`}
                onClick={() => setMood(item.id as any)}
                whileHover={{ x: -5 }}
              >
                <span className="bg-black/80 text-white text-sm py-1 px-3 rounded-md backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity absolute right-14 whitespace-nowrap">
                  {item.label}
                </span>
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 shadow-lg transition-all duration-300 ${mood === item.id ? 'bg-white/20 ring-2 ring-white/50' : 'bg-black/40 hover:bg-black/60'}`}
                  style={{ color: item.color }}
                >
                  <item.icon size={18} />
                </div>
              </motion.button>
            ))}
            
            <div className="bg-black/60 text-white/70 text-xs p-2 rounded-lg backdrop-blur-md mb-2 text-center max-w-[150px]">
              Jak się teraz czujesz?
              <br/>
              <span className="text-[10px] opacity-70">Dostosuję energię strony</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}