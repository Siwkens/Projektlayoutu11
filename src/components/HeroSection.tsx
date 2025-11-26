import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MorphingShapes } from './MorphingShapes';
import { useRipple } from './RippleEffect';

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);
  
  const { createRipple, RippleContainer } = useRipple();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Morphing background shapes */}
      <MorphingShapes />

      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y, scale }}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1557264322-b44d383a2906?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzZSUyMG5lYnVsYSUyMHB1cnBsZXxlbnwxfHx8fDE3NjQxODQ1NDN8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Cosmic background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a]/60 via-[#0a0a1a]/40 to-[#0a0a1a]" />
        <div className="absolute inset-0 bg-purple-900/10" />
      </motion.div>

      {/* Content with parallax */}
      <motion.div 
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ opacity }}
      >
        <motion.h1 
          className="text-white mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Wojcech Bożemski
        </motion.h1>
        
        <motion.p 
          className="text-white/90 uppercase tracking-[0.3em] mb-6" 
          style={{ fontSize: '0.875rem', fontWeight: '300', letterSpacing: '0.3em' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Przestrzeń Bioterapii i Terapii Kwantowej
        </motion.p>
        
        <motion.p 
          className="text-white/80 mb-12 max-w-2xl mx-auto" 
          style={{ fontSize: '0.95rem', lineHeight: '1.8' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Przywrócenie przepływu energii, równowagi i harmonii<br />
          w polu informacyjno-energetycznym
        </motion.p>

        <motion.div 
          className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.button
            className="relative px-8 py-3 bg-transparent border border-white/30 text-white rounded-sm overflow-hidden group"
            whileHover={{ scale: 1.05 }}
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
            
            {/* Magnetic hover effect backdrop */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm" />
            
            <span className="relative z-10">Umów sesję</span>
          </motion.button>
          
          <motion.button
            className="relative px-8 py-3 bg-transparent border border-white/30 text-white rounded-sm overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={createRipple}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <RippleContainer />
            
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.5), transparent)',
              }}
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
                delay: 0.3
              }}
            />
            
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm" />
            
            <span className="relative z-10">Dowiedź się więcej</span>
          </motion.button>
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
