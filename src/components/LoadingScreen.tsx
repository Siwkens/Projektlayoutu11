import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import logoImg from 'figma:asset/be2780475736cb336b192d67a3191d5c5f571cbd.png';

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
      className="fixed inset-0 z-[100] bg-gradient-to-b from-[#0a0a1a] via-[#1a0a2a] to-[#0a0a1a] flex items-center justify-center"
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

      {/* Logo with 3D effect */}
      <div className="relative" style={{ perspective: '1000px' }}>
        <motion.div
          className="relative"
          animate={{
            rotateY: [0, 360],
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotateY: {
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Logo container with glow effect */}
          <motion.div
            className="w-48 h-48 rounded-3xl flex items-center justify-center overflow-hidden"
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
            <img 
              src={logoImg} 
              alt="Wojciech Bożemski Logo" 
              className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]"
            />
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
                x: 100 + i * 30,
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