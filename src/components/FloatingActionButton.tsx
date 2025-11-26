import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Phone, Mail, X } from 'lucide-react';

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: Phone, label: 'Zadzwoń', color: 'from-green-500 to-emerald-600' },
    { icon: Mail, label: 'Email', color: 'from-blue-500 to-indigo-600' },
    { icon: MessageCircle, label: 'Czat', color: 'from-purple-500 to-pink-600' },
  ];

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bottom-20 left-0 flex flex-col gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {actions.map((action, index) => (
              <motion.button
                key={action.label}
                className={`group relative flex items-center gap-3 px-4 py-3 bg-gradient-to-r ${action.color} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300`}
                initial={{ opacity: 0, x: -20, rotateY: -90 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  rotateY: 0,
                  transition: { delay: index * 0.1 }
                }}
                exit={{ opacity: 0, x: -20, rotateY: -90 }}
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <action.icon className="w-5 h-5" />
                <span className="whitespace-nowrap">{action.label}</span>
                
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity blur-md" />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        className="relative w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-full shadow-lg flex items-center justify-center overflow-hidden"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        animate={{ 
          rotate: isOpen ? 45 : 0,
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Pulsing rings */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-purple-400"
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.5, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-pink-400"
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.5, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: 1
          }}
        />

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/50 to-pink-400/50 blur-xl" />
      </motion.button>
    </div>
  );
}
