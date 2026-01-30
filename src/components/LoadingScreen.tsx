import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import logoImg from "figma:asset/be2780475736cb336b192d67a3191d5c5f571cbd.png";

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
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 1.5;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  // 7 czakr - kolory
  const chakraColors = [
    { color: '#E53E3E', name: 'Muladhara' },    // Red - Root
    { color: '#ED8936', name: 'Svadhisthana' }, // Orange - Sacral
    { color: '#ECC94B', name: 'Manipura' },     // Yellow - Solar Plexus
    { color: '#48BB78', name: 'Anahata' },      // Green - Heart
    { color: '#4299E1', name: 'Vishuddha' },    // Blue - Throat
    { color: '#667EEA', name: 'Ajna' },         // Indigo - Third Eye
    { color: '#9F7AEA', name: 'Sahasrara' },    // Violet - Crown
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 50%, #1a0a2e 0%, #0a0515 100%)'
      }}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        filter: 'blur(20px)'
      }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      {/* Animated gradient orbs background */}
      <div className="absolute inset-0">
        {chakraColors.map((chakra, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
              background: `radial-gradient(circle, ${chakra.color} 0%, transparent 70%)`,
              width: '40%',
              height: '40%',
            }}
            animate={{
              x: [
                `${20 + i * 10}%`,
                `${60 - i * 5}%`,
                `${20 + i * 10}%`
              ],
              y: [
                `${10 + i * 8}%`,
                `${50 - i * 6}%`,
                `${10 + i * 8}%`
              ],
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}
      </div>

      {/* Spinning chakra rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {chakraColors.map((chakra, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${200 + i * 60}px`,
              height: `${200 + i * 60}px`,
              border: `2px solid ${chakra.color}`,
              opacity: 0.15,
            }}
            animate={{
              rotate: i % 2 === 0 ? 360 : -360,
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: {
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        ))}
      </div>

      {/* Floating energy particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => {
          const chakra = chakraColors[i % chakraColors.length];
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${startX}%`,
                top: `${startY}%`,
                width: `${4 + Math.random() * 6}px`,
                height: `${4 + Math.random() * 6}px`,
                background: chakra.color,
                boxShadow: `0 0 20px ${chakra.color}`,
              }}
              animate={{
                y: [0, -100 - Math.random() * 200, -400],
                x: [0, (Math.random() - 0.5) * 100],
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeOut"
              }}
            />
          );
        })}
      </div>

      {/* Central logo with glassmorphism */}
      <div className="relative z-10" style={{ perspective: '1200px' }}>
        {/* Pulsating glow behind logo */}
        <motion.div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(167,139,250,0.6) 0%, rgba(236,72,153,0.4) 50%, rgba(59,130,246,0.3) 100%)',
            transform: 'translateZ(-50px)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Logo container with glassmorphism */}
        <motion.div
          className="relative backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10"
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: '0 25px 50px -12px rgba(167, 139, 250, 0.25)',
          }}
          animate={{
            rotateY: [0, 5, 0, -5, 0],
            rotateX: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Inner glow ring */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: 'conic-gradient(from 0deg, #9F7AEA, #EC4899, #3B82F6, #10B981, #F59E0B, #EF4444, #9F7AEA)',
              padding: '2px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          <motion.div
            className="relative w-40 h-40 flex items-center justify-center"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img 
              src={logoImg} 
              alt="Wojciech Bożemski" 
              className="w-full h-full object-contain"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(168,85,247,0.6))',
              }}
            />
          </motion.div>
        </motion.div>

        {/* Orbiting chakra symbols */}
        {chakraColors.map((chakra, i) => {
          const angle = (i / chakraColors.length) * 360;
          const radius = 140;
          
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                x: -8,
                y: -8,
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.15
              }}
            >
              <motion.div
                className="rounded-full"
                style={{
                  width: '16px',
                  height: '16px',
                  background: chakra.color,
                  boxShadow: `0 0 20px ${chakra.color}`,
                  x: Math.cos((angle * Math.PI) / 180) * radius,
                  y: Math.sin((angle * Math.PI) / 180) * radius,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Progress section with glassmorphism */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-full max-w-md px-6 z-10">
        {/* Progress bar container */}
        <div className="relative backdrop-blur-md bg-white/5 rounded-full p-1 border border-white/10">
          <div className="relative h-2 bg-black/20 rounded-full overflow-hidden">
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
              }}
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Progress fill */}
            <motion.div
              className="relative h-full rounded-full"
              style={{ 
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #9F7AEA 0%, #EC4899 50%, #3B82F6 100%)',
                boxShadow: '0 0 20px rgba(167, 139, 250, 0.5)',
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Shimmer effect on progress bar */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                }}
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Loading text */}
        <motion.div
          className="text-center mt-4 space-y-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.p 
            className="text-white/80 text-sm font-light tracking-wider"
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Przygotowuję przestrzeń energetyczną...
          </motion.p>
          
          <p className="text-white/40 text-xs font-mono">
            {Math.round(progress)}%
          </p>
        </motion.div>
      </div>

      {/* Subtle vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.6) 100%)',
        }}
      />
    </motion.div>
  );
}
