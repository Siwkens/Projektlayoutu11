import { motion, useScroll, useTransform } from 'motion/react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useRipple } from './RippleEffect';
import { TextScramble } from './effects/TextScramble';
import { Magnetic } from './effects/Magnetic';
import { useMood } from './context/MoodContext';
import logoImg from 'figma:asset/be2780475736cb336b192d67a3191d5c5f571cbd.png';
import atomImg from 'figma:asset/20bd66bcebd6cde094134f51d7369c09fc04dc0c.png';

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);
  
  const { createRipple, RippleContainer } = useRipple();
  const { colors } = useMood();
  const [isAtomHovered, setIsAtomHovered] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* NOTE: MorphingShapes and Background Image removed in favor of global 3D CosmicScene in App.tsx for better performance and depth */}
      
      {/* 3D Atom graphic - central position with dynamic mood colors */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-auto cursor-pointer"
        style={{ y }}
        onMouseEnter={() => setIsAtomHovered(true)}
        onMouseLeave={() => setIsAtomHovered(false)}
      >
        <motion.div
          className="relative w-[400px] h-[400px] md:w-[600px] md:h-[600px]"
          initial={{ opacity: 0, scale: 0.5, rotateY: 0 }}
          animate={{ 
            opacity: isAtomHovered ? 0.7 : 0.4,
            scale: isAtomHovered ? 1.1 : 1,
            rotateY: 360,
          }}
          transition={{
            opacity: { duration: 0.4 },
            scale: { duration: 0.4, type: "spring", stiffness: 200 },
            rotateY: { 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }
          }}
          style={{
            filter: `drop-shadow(0 0 60px ${colors.primary}80) drop-shadow(0 0 100px ${colors.accent}50)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Pulsing energy rings */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 opacity-30"
            style={{ borderColor: colors.primary }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 opacity-30"
            style={{ borderColor: colors.accent }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 3,
              delay: 1,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
          
          {/* Main atom image with pulsating glow */}
          <motion.img 
            src={atomImg}
            alt="Energy Atom"
            className="w-full h-full object-contain"
            style={{ 
              mixBlendMode: 'screen',
            }}
            animate={{
              filter: [
                `drop-shadow(0 0 20px ${colors.primary}60)`,
                `drop-shadow(0 0 40px ${colors.accent}80)`,
                `drop-shadow(0 0 20px ${colors.primary}60)`,
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
      
      {/* Content with parallax */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-4xl mx-auto pointer-events-auto"
        style={{ opacity }}
      >
        {/* Logo in Hero */}
        <motion.div 
          className="w-24 h-24 mx-auto mb-8 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
           <img 
            src={logoImg} 
            alt="Wojciech Bożemski Logo" 
            className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.6)]"
          />
        </motion.div>

        <div className="mb-4 h-16 flex items-center justify-center">
          <TextScramble 
            text="Wojciech Bożemski" 
            className="text-4xl md:text-6xl font-bold text-white block"
          />
        </div>
        
        <motion.p 
          className="text-white/90 uppercase tracking-[0.3em] mb-6" 
          style={{ fontSize: '0.875rem', fontWeight: '300', letterSpacing: '0.3em' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Gabinet Terapii Naturalnych i Rozwoju Świadomości
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mb-12"
        >
          <p 
            className="text-white/80 max-w-2xl mx-auto" 
            style={{ fontSize: '0.95rem', lineHeight: '1.8' }}
          >
            <TextScramble text="Przywracanie naturalnego przepływu energii życiowej." trigger={true} />
            <br />
            Harmonizacja ciała, umysłu i ducha poprzez terapię kwantową i świętą geometrię.
          </p>
        </motion.div>

        <motion.div 
          className="flex gap-6 justify-center flex-wrap items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Magnetic strength={0.3}>
            <motion.button
              className="relative px-8 py-4 bg-white/5 border border-white/30 text-white rounded-sm overflow-hidden group"
              whileTap={{ scale: 0.95 }}
              onClick={createRipple}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <RippleContainer />
              
              {/* Animated gradient border */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.5), transparent)',
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
              
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm" />
              
              <span className="relative z-10 tracking-widest font-light">UMÓW SESJĘ</span>
            </motion.button>
          </Magnetic>
          
          <Magnetic strength={0.3}>
            <motion.button
              className="relative px-8 py-4 bg-transparent text-white/80 hover:text-white rounded-sm overflow-hidden group"
              whileTap={{ scale: 0.95 }}
              onClick={createRipple}
            >
              <RippleContainer />
              <span className="relative z-10 tracking-widest text-sm border-b border-transparent group-hover:border-white/50 transition-colors pb-1">
                DOWIEDZ SIĘ WIĘCEJ
              </span>
            </motion.button>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 bg-white/70 rounded-full"
            animate={{
              y: [0, 12, 0],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}