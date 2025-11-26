import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#0a0a1a] flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated particles burst */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-500 rounded-full"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: [0, (Math.cos(i * 12) * 300)],
              y: [0, (Math.sin(i * 12) * 300)],
              opacity: [1, 0],
              scale: [1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.05,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* 3D Logo */}
      <div className="relative" style={{ perspective: '1000px' }}>
        <motion.div
          className="relative"
          animate={{
            rotateY: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front face */}
          <motion.div
            className="w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white shadow-2xl"
            animate={{
              boxShadow: [
                '0 0 40px rgba(167, 139, 250, 0.5)',
                '0 0 80px rgba(236, 72, 153, 0.5)',
                '0 0 40px rgba(167, 139, 250, 0.5)',
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <span style={{ fontSize: '3rem', fontWeight: '300' }}>WB</span>
          </motion.div>
        </motion.div>

        {/* Orbiting particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-purple-400 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              x: -6,
              y: -6,
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 2 + i,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <motion.div
              className="w-3 h-3 bg-purple-400 rounded-full"
              style={{
                x: 80 + i * 20,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64">
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white/60 text-center mt-4">
          Ładowanie... {progress}%
        </p>
      </div>
    </motion.div>
  );
}
