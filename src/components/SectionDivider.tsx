import { motion } from 'motion/react';

interface SectionDividerProps {
  variant?: 'wave' | 'energy' | 'geometric';
}

export function SectionDivider({ variant = 'wave' }: SectionDividerProps) {
  if (variant === 'wave') {
    return (
      <div className="relative w-full h-24 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{ height: '100%' }}
        >
          <motion.path
            d="M0,50 Q300,10 600,50 T1200,50 L1200,120 L0,120 Z"
            fill="url(#gradient-wave)"
            initial={{ d: "M0,50 Q300,10 600,50 T1200,50 L1200,120 L0,120 Z" }}
            animate={{ 
              d: [
                "M0,50 Q300,10 600,50 T1200,50 L1200,120 L0,120 Z",
                "M0,50 Q300,90 600,50 T1200,50 L1200,120 L0,120 Z",
                "M0,50 Q300,10 600,50 T1200,50 L1200,120 L0,120 Z"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="gradient-wave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)" />
              <stop offset="50%" stopColor="rgba(236, 72, 153, 0.3)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.3)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  if (variant === 'energy') {
    return (
      <div className="relative w-full h-24 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
              initial={{ opacity: 0.2, scaleX: 0.5 }}
              animate={{ 
                opacity: [0.2, 0.8, 0.2],
                scaleX: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.05,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        <motion.div
          className="relative w-3 h-3 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50"
          animate={{
            x: [-600, 600],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-24 flex items-center justify-center overflow-hidden">
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-purple-500 transform rotate-45"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}
